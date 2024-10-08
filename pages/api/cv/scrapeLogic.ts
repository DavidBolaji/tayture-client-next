import ejs from 'ejs';
import path from 'path';
import fs, {promises} from 'fs';

import { PDFDocument } from 'pdf-lib';


let chrome: any;
let puppeteer: any;
// let executablePath: any

const isProd = process.env.AWS_LAMBDA_FUNCTION_VERSION || process.env.NEXT_PUBLIC_ENV === 'prod';
async function loadPuppeteer() {
  if (isProd) {
    const chromeModule = await import('chrome-aws-lambda');
    // const puppeteerCore = await import('puppeteer-core');
    chrome = chromeModule.default;
    puppeteer = chrome.puppeteer;
  } else {
    const puppeteerModule = await import('puppeteer');
    puppeteer = puppeteerModule;
  }
}

interface Data {
  name: string;
  [key: string]: any;
}

interface Arg {
  data: Data;
  colorList: string[];
  email: string;
}

async function generatePDFPages(
  page: any,
  templatePath: string,
  data: Data,
  colorList: string[],
  pdfPaths: string[]
): Promise<number> {
  let totalPages = 0;
  try {
    const html = await ejs.renderFile(templatePath, {
      data,
      colorList,
      page: 1,
    });

    await page.setDefaultNavigationTimeout(0);
    await page.setContent(html, {
      waitUntil: 'networkidle0',
    });

    const height = await page.evaluate(() => {
      const body = document.body;
      const html = document.documentElement;

      const height = Math.max(
        body.scrollHeight,
        body.offsetHeight,
        html.clientHeight,
        html.scrollHeight,
        html.offsetHeight
      );
      return height;
    });

    const a4PageHeight = 842;
    totalPages = Math.ceil(height / a4PageHeight);

    for (let i = 0; i < totalPages; i++) {
      const pageHtml = await ejs.renderFile(templatePath, {
        data,
        colorList,
        page: i + 1,
      });

      await page.setContent(pageHtml, {
        waitUntil: 'networkidle0',
      });
      await page.setDefaultNavigationTimeout(0);

      const pdfPath = path.join(process.cwd(), `html2pdf_${i + 1}.pdf`);
      pdfPaths.push(pdfPath);

      try {
        await page.pdf({
          path: pdfPath,
          format: 'A4',
          printBackground: true,
          displayHeaderFooter: true,
          margin: i + 1 === 1
            ? { top: 0, right: 0, bottom: 40, left: 0 }
            : { top: 10, right: 0, bottom: 40, left: 0 },
          preferCSSPageSize: true,
          pageRanges: `${i + 1}`,
          footerTemplate: `
          <div style="font-size:10px;width:100%;text-align:right;margin-right:32px;">
            <span class="pageNumber"></span>/<span class="totalPages"></span>
          </div>`,
        headerTemplate: '<div></div>', 
        });
      } catch (error) {
        console.error(`Error generating PDF for page ${i + 1}:`, error);
        pdfPaths.pop();
      }
    }
  } catch (error) {
    console.error('Error in generatePDFPages:', error);
    throw error;
  }

  return totalPages;
}

async function mergePDFs(
  pdfPaths: string[],
  baseName: string
): Promise<string> {
  try {
    const mergedPdf = await PDFDocument.create();

    for (const pdfPath of pdfPaths) {
      const pdfBytes = fs.readFileSync(pdfPath);
      const pdfDoc = await PDFDocument.load(pdfBytes);
      const copiedPages = await mergedPdf.copyPages(pdfDoc, pdfDoc.getPageIndices());

      for (const page of copiedPages) {
        mergedPdf.addPage(page);
      }
    }

    const mergedPdfBytes = await mergedPdf.save();
    const mergedPdfPath = path.join(process.cwd(), `${baseName}.pdf`);
    fs.writeFileSync(mergedPdfPath, mergedPdfBytes);

    console.log('PDFs merged successfully.');
    return mergedPdfPath;
  } catch (error) {
    console.error('Error merging PDFs:', error);
    throw error;
  }
}

export const scrapeLogic = async (res: any, arg: Arg): Promise<void> => {
  let browser: any;
  let options: any = {};

  try {
    await loadPuppeteer();

    const { data, colorList, email } = arg;

    if (!puppeteer || !puppeteer?.launch) {
      throw new Error('Puppeteer is not initialized properly');
    }

    if (isProd) {
      options = {
        defaultViewport: chrome.defaultViewport,
        headless: chrome.headless,
      };
    }

    browser = await puppeteer.launch({
      args: [
        ...(isProd ? await chrome.args : []),
      ],
      executablePath: isProd
        ? process.env.NEXT_PUBLIC_PUPPETEER_EXECUTABLE_PATH || (await chrome.executablePath)
        : puppeteer.executablePath(),
      ...options,
    });

    const page = await browser.newPage();

    let pdfPaths: string[] = [];
    const templatePath = path.join(process.cwd(), 'views', 'templateFour.ejs');
    await generatePDFPages(page, templatePath, data, colorList, pdfPaths);
    console.log('[GENERATION_COMPLETED]');

    await browser.close();
    browser = null;

    const name = `html_full`;
    const mergedPdfPath = await mergePDFs(pdfPaths, name);

     // Send the PDF as a response to the client
    // Read the PDF file as a buffer
    const pdfBuffer = await promises.readFile(mergedPdfPath);

    // Set response headers to download the file
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${name}.pdf"`);
    res.setHeader('Content-Length', pdfBuffer.length);

    // Send the PDF buffer
    res.end(pdfBuffer);

    // Clean up the temporary files
    // pdfPaths.forEach((pdfPath) => promises.unlink(pdfPath));
    // await promises.unlink(mergedPdfPath); // Remove the merged PDF after 

    // await sendCvMail({
    //   firstName: data.name.split(' \n')[0],
    //   email: email,
    //   filename: `${name}.pdf`,
    //   path: mergedPdfPath,
    // });

    // pdfPaths.forEach((pdfPath) => fs.unlinkSync(pdfPath));

    res.send({ message: 'Resume sent to email' });
  } catch (error) {
    console.error('Error in scrapeLogic:', error);
    res.status(500).send(`Something went wrong while generating the PDF: ${(error as Error).message}`);
  } finally {
    if (browser) {
      await browser.close();
    }
  }
};
