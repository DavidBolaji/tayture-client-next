require("dotenv").config();
const ejs = require('ejs')
const path = require('path')
const fs = require('fs')
const promises = fs.promises

const { PDFDocument } = require('pdf-lib')

let chrome
let puppeteer

const headers = {
  'Content-Type': 'application/pdf',
  "Access-Control-Allow-Origin": "*"
}

const isProd =
  process.env.AWS_LAMBDA_FUNCTION_VERSION ||
  process.env.NEXT_PUBLIC_ENV === 'prod' ||
  process.env.NODE_ENV === 'production'

console.log('[IS_PROD]', isProd)
function loadPuppeteer() {
  if (isProd) {
    const chromeModule = require('@sparticuz/chromium')
    const puppeteerModule = require('puppeteer-core')
    puppeteer = puppeteerModule
    chrome = chromeModule
  } else {
  
  }
}

async function generatePDFPages(page, templatePath, data, colorList, pdfPaths) {
  let totalPages = 0
  try {
    const html = await ejs.renderFile(templatePath, {
      data,
      colorList,
      page: 1,
    })

    await page.setDefaultNavigationTimeout(0)
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

    for (let i = 0; i < totalPages; i++) {
      const pageHtml = await ejs.renderFile(templatePath, {
        data,
        colorList,
        page: i + 1,
      })

      await page.setContent(pageHtml, {
        waitUntil: 'networkidle0',
      })
      await page.setDefaultNavigationTimeout(0)

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
          footerTemplate: `
          <div style="font-size:10px;width:100%;text-align:right;margin-right:32px;">
            <span class="pageNumber"></span>/<span class="totalPages"></span>
          </div>`,
          headerTemplate: '<div></div>',
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

async function mergePDFs(pdfPaths, baseName) {
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

const scrapeLogic = async (arg) => {
  let browser
  let options = {}
  console.log('[GOT_HERE_1]')

  try {
    await loadPuppeteer()

    const { data, colorList, email } = arg

    if (!puppeteer || !puppeteer?.launch) {
      throw new Error('Puppeteer is not initialized properly')
    }

    console.log('[GOT_HERE_2]')

    if (isProd) {
      options = {
        defaultViewport: chrome.defaultViewport,
        headless: chrome.headless,
      }
    }

    browser = await puppeteer.launch({
      args: [...(isProd ? await chrome.args : [])],
      executablePath: isProd
        ? process.env.NEXT_PUBLIC_PUPPETEER_EXECUTABLE_PATH ||
          (await chrome.executablePath)
        : puppeteer.executablePath(),
      ...options,
    })

    console.log('[GOT_HERE_3]')

    const page = await browser.newPage()

    let pdfPaths = []
    const templatePath = path.join(process.cwd(), 'views', 'templateFour.ejs')
    console.log('[TEMPLATE_PATH]', templatePath)
    await generatePDFPages(page, templatePath, data, colorList, pdfPaths)
    console.log('[GENERATION_COMPLETED]')

    await browser.close()
    browser = null

    const name = `html_full`
    const mergedPdfPath = await mergePDFs(pdfPaths, name)

    // Send the PDF as a response to the client
    // Read the PDF file as a buffer
    const pdfBuffer = await promises.readFile(mergedPdfPath)

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: `Pdf generated`,
        buffer: pdfBuffer,
      }),
      headers
    }
  } catch (error) {
    console.error('Error in scrapeLogic:', error)
    throw error;
  } finally {
    if (browser) {
      await browser.close()
    }
  }
}

exports.handler = async (event, context) => {
  console.log('[BODY]', event.body)
  try {
    const response = await scrapeLogic(event.body)
    return {
      headers,
      body: JSON.stringify(event.body)
    }
  } catch (error) {
    return {
      statusCode: 422,
      body: JSON.stringify({
        message: error.message,
      }),
    }
  }
}


