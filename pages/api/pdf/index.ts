import { NextApiRequest, NextApiResponse } from 'next'
import puppeteer from 'puppeteer'
import ejs from 'ejs'
import path from 'path'
import fs, { writeFileSync, readFileSync } from 'fs'
import { PDFDocument } from 'pdf-lib'
import { NextResponse } from 'next/server'
import sendCvMail from '@/mail/sendCvMail'
import { Axios } from '@/request/request'
import verifyToken from '@/middleware/verifyToken'
import PCR from 'puppeteer-chromium-resolver'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
}

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders })
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    const { data, colorList } = req.body
    const templatePath = path.join(process.cwd(), 'views', 'templateOne.ejs')

    const updateSummary = Axios.put('/users/summary', {
      summary: data.summary,
      userId: req.authUser?.id,
    })
    const updateWork = Axios.put('/users/work', {
      work: data.history,
      userId: req.authUser?.id,
    })
    const updateEdu = Axios.put('/users/education', {
      education: data.education,
      userId: req.authUser?.id,
    })
    const updateSkills = Axios.put('/users/skills', {
      skill: data.skills,
      userId: req.authUser?.id,
    })

    // Generate PDF, merge, and send mail concurrently
    await Promise.all([
      updateSummary,
      updateWork,
      updateEdu,
      updateSkills,
      generateAndSendPDF(data, colorList, templatePath),
    ])

    res.status(200).send({
      message: 'File generated successfully, check mail to download file',
    })
  } catch (error) {
    console.error('Error generating PDF:', error)
    res.status(500).send('Error generating PDF')
  }
}

async function generateAndSendPDF(
  data: any,
  colorList: any,
  templatePath: string,
) {
  const options = {}
  const stats = await PCR(options)

  const browser = await puppeteer.launch({
    headless: true,
    // executablePath: path.join(process.cwd(), '.cache', 'chrome.exe'),
    args: ['--no-sandbox'],
    executablePath: stats.executablePath,
  })
  const page = await browser.newPage()

  let pdfPaths: string[] = []
  await generatePDFPages(page, templatePath, data, colorList, browser, pdfPaths)
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
  await sendCvMail({
    firstName: data.name.split(' \n')[0],
    email: data.email,
    filename: `${name}.pdf`,
    path: pdfPathz,
  })

  fs.unlink(pdfPathz, (err) => {
    if (err) {
      console.error('Error deleting PDF file:', err)
    } else {
      console.log('PDF file deleted successfully')
    }
  })
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

export default verifyToken(handler)
