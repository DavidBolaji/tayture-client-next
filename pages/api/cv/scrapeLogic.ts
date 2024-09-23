import ejs from 'ejs'
import path from 'path'
import fs from 'fs'
import { PDFDocument } from 'pdf-lib'
import { Puppeteer } from 'puppeteer'
import { Puppeteer as CPuppeteer } from 'puppeteer-core'
import sendCvMail from '@/mail/sendCvMail'

let chrome: any = {}
let puppeteer: any

const isProd =
  process.env.AWS_LAMBDA_FUNCTION_VERSION ||
  process.env.NEXT_PUBLIC_ENV === 'prod' ||
  true

async function loadPuppeteer() {
  if (isProd) {
    // Dynamically import chrome-aws-lambda and puppeteer-core for AWS Lambda
    // const chromeModule = await import('@sparticuz/chromium')
    const chromeModule = await import('chrome-aws-lambda')
    const puppeteerCore = (await import(
      'puppeteer-core'
    )) as unknown as CPuppeteer
    chrome = chromeModule
    puppeteer = puppeteerCore
    // chrome.setHeadlessMode = true
    // chrome.setGraphicsMode = false
  } else {
    // Import puppeteer for local development
    console.log('[LOCAL]')
    const puppeteerModule = (await import('puppeteer')) as unknown as Puppeteer
    puppeteer = puppeteerModule
  }
}

interface Data {
  name: string
  [key: string]: any
}

interface Arg {
  data: Data
  colorList: string[]
  email: string
}

async function generatePDFPages(
  page: any,
  templatePath: string,
  data: Data,
  colorList: string[],
  pdfPaths: string[],
): Promise<number> {
  let totalPages = 0
  try {
    const html = await ejs.renderFile(templatePath, {
      data,
      colorList,
      page: 1,
    })

    await page.setDefaultNavigationTimeout(0) // Disable timeout
    await page.setContent(html, {
      waitUntil: 'networkidle0',
    })

    const height = await page.evaluate(() => {
      const body = document.body
      const html = document.documentElement

      const height = Math.max(
        body.scrollHeight,
        body.offsetHeight,
        html.clientHeight,
        html.scrollHeight,
        html.offsetHeight,
      )
      return height
    })

    const a4PageHeight = 842
    totalPages = Math.ceil(height / a4PageHeight)

    for (let i = 0; i < totalPages - 1; i++) {
      const pageHtml = await ejs.renderFile(templatePath, {
        data,
        colorList,
        page: i + 1,
      })

      await page.setContent(pageHtml, {
        waitUntil: 'networkidle0',
        // Increase timeout to 60 seconds
      })
      await page.setDefaultNavigationTimeout(0) // Disable timeout

      const pdfPath = path.join(process.cwd(), `html2pdf_${i + 1}.pdf`)
      pdfPaths.push(pdfPath)

      try {
        await page.pdf({
          path: pdfPath,
          format: 'A4',
          printBackground: true,
          displayHeaderFooter: true,
          margin:
            i + 1 === 1
              ? { top: 0, right: 0, bottom: 40, left: 0 }
              : { top: 10, right: 0, bottom: 40, left: 0 },
          preferCSSPageSize: true,
          pageRanges: `${i + 1}`,
        })
      } catch (error) {
        console.error(`Error generating PDF for page ${i + 1}:`, error)
        pdfPaths.pop()
      }
    }
  } catch (error) {
    console.error('Error in generatePDFPages:', error)
    throw error
  }

  return totalPages
}

async function mergePDFs(
  pdfPaths: string[],
  baseName: string,
): Promise<string> {
  try {
    const mergedPdf = await PDFDocument.create()

    for (const pdfPath of pdfPaths) {
      const pdfBytes = fs.readFileSync(pdfPath)
      const pdfDoc = await PDFDocument.load(pdfBytes)
      const copiedPages = await mergedPdf.copyPages(
        pdfDoc,
        pdfDoc.getPageIndices(),
      )

      for (const page of copiedPages) {
        mergedPdf.addPage(page)
      }
    }

    const mergedPdfBytes = await mergedPdf.save()
    const mergedPdfPath = path.join(process.cwd(), `${baseName}.pdf`)
    fs.writeFileSync(mergedPdfPath, mergedPdfBytes)

    console.log('PDFs merged successfully.')
    return mergedPdfPath
  } catch (error) {
    console.error('Error merging PDFs:', error)
    throw error
  }
}

export const scrapeLogic = async (res: any, arg: Arg): Promise<void> => {
  let browser
  let options: any = {}

  try {
    // Load Puppeteer before using it
    await loadPuppeteer()

    const { data, colorList, email } = arg

    // Ensure Puppeteer is ready
    if (!puppeteer || !puppeteer.launch) {
      throw new Error('Puppeteer is not initialized properly')
    }

    console.log(chrome)

    if (isProd) {
      options = {
        defaultViewport: chrome.defaultViewport,
        headless: chrome.headless,
        // ignoreHTTPSErrors: true,
      }
    }

    browser = await puppeteer.launch({
      args: [
        // '--disable-setuid-sandbox',
        // '--no-sandbox',
        // '--no-zygote',
        ...(isProd ? chrome.args : []),
      ],
      executablePath:
        //@ts-ignore
        isProd
          ? process.env.NEXT_PUBLIC_PUPPETEER_EXECUTABLE_PATH ||
            (await chrome.executablePath)
          : puppeteer.executablePath(),
      ...options,
    })

    const page = await browser.newPage()

    let pdfPaths: string[] = []
    const templatePath = path.join(process.cwd(), 'views', 'templateFour.ejs')
    await generatePDFPages(page, templatePath, data, colorList, pdfPaths)
    console.log('[GENERATION_COMPLETED]')

    await browser.close()
    browser = null

    const name = `html_full`
    const mergedPdfPath = await mergePDFs(pdfPaths, name)

    // Sending email with the merged PDF
    await sendCvMail({
      firstName: data.name.split(' \n')[0],
      email: email,
      filename: `${name}.pdf`,
      path: mergedPdfPath,
    })

    // Clean up individual PDF files
    pdfPaths.forEach((pdfPath) => fs.unlinkSync(pdfPath))
    // fs.unlinkSync(mergedPdfPath)

    res.send({ message: 'Resume sent to email' })
  } catch (error) {
    console.error('Error in scrapeLogic:', error)
    res
      .status(500)
      .send(
        `Something went wrong while generating the PDF: ${
          (error as Error).message
        }`,
      )
  } finally {
    if (browser) {
      await browser.close()
    }
  }
}
