import { NextApiRequest, NextApiResponse } from 'next'
import puppeteer from 'puppeteer'
import ejs from 'ejs'
import path from 'path'
import fs, { writeFileSync, readFileSync } from 'fs'
import { PDFDocument } from 'pdf-lib'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    const { data, colorList } = req.body
    const templatePath = path.join(process.cwd(), 'views', 'templateOne.ejs')

    const browser = await puppeteer.launch()
    const page = await browser.newPage()

    let pdfPaths: string[] = []
    await generatePDFPages(
      page,
      templatePath,
      data,
      colorList,
      browser,
      pdfPaths,
    )
    const name = `html_full`
    const pdfPathz = path.join(process.cwd(), `${name}.pdf`)
    await mergePDFs2(pdfPaths, name)

    // Delete generated PDFs
    for (const pdfPath of pdfPaths) {
      fs.unlink(pdfPath, (err) => {
        if (err) {
          console.error('Error deleting PDF file:', err)
        } else {
          console.log('PDF file deleted successfully')
        }
      })
    }

    await browser.close()

    fs.readFile(pdfPathz, (err, data) => {
      if (err) {
        console.error('Error reading PDF file:', err)
        return res.status(500).send('Error reading PDF file')
      }

      res.setHeader('Content-Type', 'application/pdf')
      res.setHeader(
        'Content-Disposition',
        'attachment; filename=generated_pdf.pdf',
      )
      res.status(200).send(data)

      // Delete the file after sending its data
      fs.unlink(pdfPathz, (err) => {
        if (err) {
          console.error('Error deleting PDF file:', err)
        } else {
          console.log('PDF file deleted successfully')
        }
      })
    })
  } catch (error) {
    console.error('Error generating PDF:', error)
    res.status(500).send('Error generating PDF')
  }
}

async function generatePDFPages(
  page: any,
  templatePath: string,
  data: any,
  colorList: any,
  browser: any,
  pdfPaths: string[],
) {
  const html = await ejs.renderFile(templatePath, {
    data,
    colorList,
    page: 1,
  })

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
  let totalPages = Math.ceil(height / a4PageHeight)

  console.log(totalPages)

  for (let i = 0; i < totalPages; i++) {
    const pageHtml = await ejs.renderFile(templatePath, {
      data,
      colorList,
      page: i + 1,
    })

    await page.setContent(pageHtml, {
      waitUntil: 'networkidle0',
    })

    const pdfPath = path.join(process.cwd(), `html2pdf_${i + 1}.pdf`)
    pdfPaths.push(pdfPath)

    try {
      await page.pdf({
        path: pdfPath,
        format: 'a4',
        printBackground: true,
        displayHeaderFooter: true,
        margin:
          i + 1 === 1
            ? { top: 0, right: 0, bottom: 40, left: 0 }
            : { top: 10, right: 0, bottom: 40, left: 0 },
        preferCSSPageSize: true,
        pageRanges: `${i + 1}`,
      })
    } catch (_: any) {
      console.log(_.message)
      pdfPaths.pop()
      return (totalPages = totalPages - 1)
    }
  }

  return totalPages
}

async function mergePDFs2(pdfPaths: string[], baseName: string) {
  try {
    const mergedPdf = await PDFDocument.create()

    for (const pdfPath of pdfPaths) {
      const pdfBytes = readFileSync(pdfPath)
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
    writeFileSync(mergedPdfPath, mergedPdfBytes)

    console.log('PDFs merged successfully.')
  } catch (error) {
    console.error('Error merging PDFs:', error)
  }
}

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
