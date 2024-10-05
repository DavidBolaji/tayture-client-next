import { v4 } from 'uuid'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
import moment from 'moment'
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { IJobSchDb } from '@/pages/api/job/types'
import * as momentT from 'moment-timezone'
import {
  Education,
  Profile,
  SchoolAdmin,
  Skills,
  Summary,
  User,
  WorkHistory,
} from '@prisma/client'
import { ChangeEvent, Dispatch, SetStateAction } from 'react'
import Cloudinary from '@/request/cloudinary'
import { AxiosResponse } from 'axios'
import { getUser } from '@/lib/api/user'
import { NextRouter } from 'next/router'
import { QueryClient } from '@tanstack/react-query'
import {
  cvSchemafive,
  cvSchemaFour,
  cvSchemaOne,
  cvSchemaSeven,
  cvSchemaSix,
  cvSchemaThree,
  cvSchemaTwo,
} from '@/components/cv/valodationSchema'
import {
  cvValuesfive,
  cvValuesFour,
  cvValuesOne,
  cvValuesSeven,
  cvValuesSix,
  cvValuesThree,
  cvValuesTwo,
} from '@/components/cv/data'
import dayjs from 'dayjs'
import { getMonthNumber } from './data'

TimeAgo.addLocale(en)
const timeAgo = new TimeAgo('en-US')

export const AMOUNT_PER_HIRE =
  process.env.NEXT_PUBLIC_ENV === 'dev' ? 10000 : 10000

const matchQualHash: { [key: string]: number } = {
  SSCE: 1,
  OND: 2,
  NCE: 3,
  HND: 4,
  BACHELORS: 5,
  MASTERS: 6,
  DOCTORATE: 7,
}
const matchExpHash: { [key: string]: number } = {
  'less than 1': 0,
  '1': 1,
  '2': 2,
  '3': 3,
  '4': 4,
  '5+': 5,
}

/**
 * merges styles
 * @param inputs
 * @returns
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Checks if input is not a number
 * @param input string
 * @returns boolean
 */
export function isNotNumber(input: string) {
  return input === '' || !/^\d+$/.test(input)
}

/**
 * checks if input is not an alphabet
 * @param input string
 * @returns boolean
 */
export function isNotText(input: string) {
  return input === '' || !/^\D+$/.test(input)
}

/**
 * Checks that email is valid
 * @param email string
 * @returns boolean
 */
export const isValidEmail = (email: string) => {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
  return emailRegex.test(email)
}

/**
 * Converts date string to day and month
 * @param date string
 * @returns date
 */
export const closingDate = (date: string) => {
  const formattedDate = date ? moment(date).format('Do MMM') : ''
  return formattedDate
}

/**
 * Converts date string to day and month
 * @param date string
 * @returns date
 */
export const closingDate2 = (date: string) => {
  const formattedDate = date ? moment(date).format('Do MMM') : ''
  return formattedDate
}

export const formatXAxisLabel = (dateString: string) => {
  const date = new Date(dateString)
  const day = date.getDate()
  const month = date.toLocaleString('default', { month: 'short' })
  const formattedDate = `${day}${
    day === 1 || day === 21 || day === 31
      ? 'st'
      : day === 2 || day === 22
      ? 'nd'
      : day === 3 || day === 23
      ? 'rd'
      : 'th'
  } ${month}`
  return formattedDate
}

export function handleFormat(dataList: any) {
  for (const entry of dataList) {
    const learningPath = Object.keys(entry).find((key) => key !== 'total')

    if (learningPath) {
      const questions = entry[learningPath]
      const firstName = questions[0].answer
      const email = questions[questions.length - 1].answer

      return {
        firstName,
        email,
      }
    }

    break
  }
}

export const scheduledDate = (date: string) => {
  const formattedDate = date ? moment(date).format('Do MMM YYYY') : ''
  return formattedDate
}

export function handlePath(path: any, taken: number, data: string[]) {
  const result = JSON.parse(path)
  result.push({ [taken]: JSON.stringify(data) })
  return JSON.stringify(result)
}
export function handleResult(path: any, taken: number, data: any) {
  const result = JSON.parse(path)
  result.push({ [taken]: JSON.stringify(data) })
  return JSON.stringify(result)
}

export function generateNumberCode() {
  const uuid = v4()
  const random4DigitNumber = parseInt(
    uuid.replace(/-/g, '').substring(0, 5),
    16,
  )
  return random4DigitNumber.toString().padStart(5, '0')
}

export const formatNumber = (
  num: number,
  locale: string | undefined,
  options: any,
) => {
  try {
    return new Intl.NumberFormat(locale || undefined, options || {}).format(num)
  } catch (error) {
    return num
  }
}

export const datePosted = (created_at: string) =>
  created_at ? timeAgo.format(new Date(created_at)) : null

export const salaryOutput = (job_min_sal: string, job_max_sal: string) => {
  if (job_min_sal === job_max_sal) {
    return formatNumber(+job_max_sal, 'en-Us', {})
  }
  return `${formatNumber(+job_min_sal, 'en-Us', {})} - 
    ${formatNumber(+job_max_sal, 'en-Us', {})}`
}

export const checkFileExtension = (filename: string) => {
  const parts = filename?.split('.')
  const extension = parts && parts[parts.length - 1].toLowerCase()

  if (extension === 'doc') {
    return 'doc'
  }
  if (extension === 'docx') {
    return 'docx'
  }
  if (extension === 'jpg') {
    return 'jpg'
  }
  if (extension === 'pdf') {
    return 'pdf'
  }
  return ''
}

export const getExt = (file: any, fileType: string) => {
  if (fileType === 'application/pdf' || fileType === 'pdf') {
    return 'pdf'
  }
  if (
    fileType === 'doc' ||
    fileType === 'docx' ||
    fileType === 'application/msword' ||
    fileType ===
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ) {
    return 'doc'
  }
  return file.type
}

export const checkIsExpMatch = ({
  exp,
  job,
}: {
  exp: string
  job: string
}): boolean => {
  return matchExpHash[exp] >= matchExpHash[job]
}
export const checkIsQualMatch = ({
  qual,
  job,
}: {
  qual: string
  job: string
}): boolean => {
  return matchQualHash[qual] >= matchQualHash[job]
}

export const checkIsMatch = ({
  application,
  job,
}: {
  application: { exp: string; qual: string }
  job: IJobSchDb
}): Boolean => {
  return (
    matchExpHash[application.exp] >= +job.job_exp &&
    matchQualHash[application.qual] >= matchQualHash[job.job_qual]
  )
}

export const checkIsLocMatch = ({
  userLoc,
  jobLoc,
}: {
  userLoc: { country: string; state: string; lga: string; city: string }
  jobLoc: {
    country: string
    sch_state: string
    sch_city: string
    sch_lga: string
  }
}): boolean => {
  return userLoc?.country === jobLoc?.country
}

export const formatTo12HourTime = (dateString: string): any => {
  if (dateString) {
    const time = momentT.tz(dateString, 'Africa/Lagos').subtract('minutes', 60)
    return time.format('hh:mm A')
  }
  return ''
}

export const calculateProgress = (data: {
  work: WorkHistory[]
  profile: Profile
  skills: Skills[]
  education: Education[]
  summary: Summary
}) => {
  let score = 0
  if (data) {
    if (data.education.length > 0) {
      score += 10
      console.log('education')
    }
    if (data.skills.length > 0) {
      score += 10
      console.log('skills')
    }
    if (data.work.length > 0) {
      score += 10
      console.log('work length')
    }
    if (data.profile.address) {
      score += 10
      console.log('address')
    }
    if (data.profile.cv) {
      score += 10
      console.log('cv')
    }
    if (data.profile.cover) {
      score += 10
      console.log('cover')
    }
    if (data.profile.available) {
      score += 10
      console.log('available')
    }
    if (data.profile.address) {
      score += 10
      console.log('address')
    }
    if (data.profile.workplace) {
      score += 5
      console.log('workplace')
    }
    if (data.profile.picture) {
      score += 5
      console.log('pictire')
    }
    if (data.summary.text) {
      score += 10
      console.log('summary')
    }
  }
  return score
}

export const formatNumberToK = (value: string) => {
  const numList = value.split('-')
  const nNumList = numList.map((n) => {
    const num = Number(n.trim().replace(',', ''))

    if (isNaN(num)) {
      return null // Return null if value is not a valid number
    }

    if (num < 1000) {
      return num.toString() // Return the number as is if it's less than 1000
    }

    const suffixes = ['', 'k', 'M', 'B', 'T'] // Add more suffixes if needed
    const suffixIndex = Math.floor(Math.log10(num) / 3)
    const shortValue = (num / Math.pow(1000, suffixIndex)).toFixed(0)
    return shortValue + suffixes[suffixIndex]
  })

  if (nNumList.length > 1) {
    return `${nNumList[0]} - ${nNumList[1]}/month`
  } else {
    return `${nNumList[0]}/month`
  }
}

export const canManageSchool = (
  schAdmin: SchoolAdmin[],
  email: string,
  isCreator: boolean,
) => {
  const isAdmin = schAdmin?.find(
    (admin: SchoolAdmin) => admin.sch_admin_email === email,
  )
  if (!isAdmin?.sch_admin_email) {
    return true
  }
  return isCreator ? true : isAdmin?.sch_admin_active
}

export function userFilterChart(users: User[]) {
  const countByDate: { [key: string]: number } = {}

  users?.forEach((item) => {
    const createdAt = new Date(item.createdAt!).toDateString()

    if (countByDate[createdAt]) {
      countByDate[createdAt]++
    } else {
      countByDate[createdAt] = 1
    }
  })
  const data = Object.values(countByDate)
  const labels = Object.keys(countByDate)
  return {
    data,
    labels,
  }
}

export const getRandomColor = () => {
  const colors = [
    '#FF5733',
    '#33FF57',
    '#5733FF',
    '#FF33E9',
    '#33E9FF',
    '#E9FF33',
    '#333333',
    '#000000',
  ] // Add your list of colors here
  const randomIndex = Math.floor(Math.random() * colors.length)
  return colors[randomIndex]
}

export const getRandomColor2 = (colors: string[]) => {
  const randomIndex = Math.floor(Math.random() * colors.length)
  return colors[randomIndex]
}

export const isAllowedFileType = (fileType: string) =>
  [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  ].includes(fileType)

export const handleUpload = async (
  e: ChangeEvent<HTMLInputElement>,
  fn: (name: string, val: any) => void,
  cb: (msg: string) => void,
  load: (val: boolean) => void,
) => {
  const inputElement = e.target
  const files = inputElement.files

  if (files && files.length > 0) {
    const selectedFile = files[0]

    if (!isAllowedFileType(files[0].type))
      return cb('Invalid file type. Please upload a PDF, DOC, or DOCX file.')

    const isLt2M = files[0].size / 1024 / 1024 < 2
    if (!isLt2M) return cb('Image must be smaller than 2MB!')
    load(true)

    const formData = new FormData()
    formData.append('file', selectedFile)
    formData.append(
      'upload_preset',
      `${process.env.NEXT_PUBLIC_CLOUDINARY_PRESET}`,
    )

    try {
      const response = await Cloudinary.post('/auto/upload', formData)
      const { secure_url } = response.data
      fn('cv', secure_url)
    } catch (error: any) {
      cb(`Error uploading banner: ${error.message}`)
    } finally {
      load(false)
    }
  }
}

export const appliedSucces = async (
  res: AxiosResponse,
  path: string,
  uiCb: Dispatch<SetStateAction<any>>,
  msgCb: Dispatch<SetStateAction<string>>,
  router: NextRouter,
  queryClient: QueryClient,
  SW: any,
) => {
  // const applied = res.data.applied
  if (path === '/jobs') {
    uiCb((prev: any) => {
      return {
        ...prev,
        applyLandingModal: {
          ...prev.applyLandingModal,
          visibility: false,
        },
      }
    })
    msgCb(res.data.message)
    await sleep(3000)
    router.push('/dashboard')
  } else {
    uiCb((prev: any) => {
      return {
        ...prev,
        applyModal: {
          ...prev.applyModal,
          visibility: false,
        },
      }
    })
    await sleep(2000)
    msgCb(res.data.message)
    SW.prev()

    const req = await getUser()
    queryClient.setQueryData(['user'], () => req.data.user)
    queryClient.invalidateQueries({
      queryKey: ['user', 'jobs', 'school'],
    })

    if (router.query.job === '1') {
      return router.replace('/dashboard/jobs')
    }
    router.push(router.asPath)
  }
}

/**
 * Pauses execution for a specified amount of time.
 * @param ms - The number of milliseconds to sleep.
 * @returns A promise that resolves after the specified time.
 */
export async function sleep(ms: number): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, ms))
}

export const validationHash = {
  personal: cvSchemaOne,
  skills: cvSchemaTwo,
  education: cvSchemaThree,
  employment: cvSchemaFour,
  languages: cvSchemafive,
  certificates: cvSchemaSix,
  hobbies: cvSchemaSeven,
}

export const initialHash = {
  personal: cvValuesOne,
  skills: cvValuesTwo,
  education: cvValuesThree,
  employment: cvValuesFour,
  languages: cvValuesfive,
  certificates: cvValuesSix,
  hobbies: cvValuesSeven,
}

export const validation = (
  step: number,
  stage: { id: string; title: string }[],
) => {
  return validationHash[stage[step].id as keyof typeof validationHash]
}

export const handleInitial = (
  step: number,
  stage: { id: string; title: string }[],
) => {
  return initialHash[stage[step].id as keyof typeof initialHash]
}

export const convertData = (originalData: any) => {
  // List of sections to check for dynamic ordering
  const sectionsOrder = ['education', 'employment', 'certificates']

  // Create an object to store the ordered sections
  const orderedSections: any = {}

  // Loop through the keys in originalData and handle education, employment, and certificates in the order they appear
  Object.keys(originalData).forEach((key) => {
    if (sectionsOrder.includes(key)) {
      if (key === 'education') {
        orderedSections.education = originalData.education.map((edu: any) => ({
          degree: edu.degree,
          year: `${edu.startYear} – ${edu.endYear}`,
          startYear: edu.startYear,
          endYear: edu.endYear,
          school: edu.school,
          more: edu.more || '',
        }))
      }
      if (key === 'employment') {
        orderedSections.employment = originalData.employment.map(
          (emp: any) => ({
            title: emp.title,
            date: `${getMonthNumber[emp.startMonth as keyof typeof getMonthNumber]}/${emp.startYear} – ${
              emp.endMonth === '' ? 'Present' : `${getMonthNumber[emp.endMonth as keyof typeof getMonthNumber]}/${emp.endYear}`
            }`,
            startMonth: emp.startMonth.toString(),
            endMonth: emp.endMonth.toString(),
            startYear: emp.startYear.toString(),
            endYear: emp.endYear.toString(),
            location: emp.location,
            currentDate: emp.currentDate,
            roles: emp.roles.map((role: any) => [role]),
          }),
        )
      }
      if (key === 'certificates') {
        orderedSections.certificates = originalData.certificates.map(
          (cert: any) => ({
            name: cert.name,
            date: 'Present', // Assuming "Present" for now
            link: cert.link || '',
            issuer: cert.issuer,
          }),
        )
      }
    }
  })

  // Build the final return object
  return {
    data: {
      profilePicture:
        'https://media.licdn.com/dms/image/D4D03AQFnUQECnGBQyQ/profile-displayphoto-shrink_800_800/0/1708900917541?e=1724889600&v=beta&t=9lg-vJWno6DVqLlB3c5cGDVmV97fJ-zY0iim5pSLGUQ',
      name: originalData.name,
      title: originalData.title ?? '',
      email: originalData.email,
      phone: originalData.phone,
      summary: originalData.summary,
      location: `${originalData.country}, ${originalData.state}, ${originalData.city}, ${originalData.lga} `,
      linkedIn: originalData.linkedIn,
      languages: originalData.languages.map((lang: any) => ({
        name: lang.name,
        scale: parseInt(lang.scale) || 100,
      })),
      hobbies: originalData.hobbies.map((hobby: any) => hobby.name),
      skills: originalData.skills.map(
        (skill: { name: string; scale: any }) => ({
          name: skill.name,
          scale: parseInt(skill.scale) || 100,
        }),
      ),
      ...orderedSections, // Dynamically inject the ordered sections based on the original data order
    },
    colorList: {
      foreground: '#2563eb',
      colorParagraph: '#000',
      background: '#fff',
      textOne: '#fff',
    },
    email: originalData.email,
  }
}

export const cvDataTemplate = {
  data: {
    profilePicture:
      'https://res.cloudinary.com/dpi44zxlw/image/upload/v1718182805/89129DF2-9C9A-47C4-B7B4-E123DBC58A1E_ybtlxj.jpg',
    name: 'David Ologunleko',
    // title: "Full Stack Developer",
    email: 'odavidbolaji4@gmail.com',
    phone: '08107483900',
    summary:
      // "I am a seasoned Full Stack Developer with half a decade of experience. My strong foundation in both front-end and back-end technologies enables me to consistently deliver robust and scalable solutions I am dedicated to continuous learning and hold certifications in JavaScript, React, Frontend Development, and Artificial Intelligence."
      'hello',
    location: 'Nigeria, Oyo, Ibadan, Ibadan Central',
    // github: "https://github.com/davidbolaji",
    linkedIn: 'www.linkedin.com/in/david-ologunleko-14616b227',
    // web: "https://profile-eug.pages.dev",
    skills: [
      { name: 'React', scale: 100 },
      { name: 'Next', scale: 90 },
      { name: 'MySQL', scale: 70 },
    ],
    languages: [
      { name: 'English', scale: 90 },
      { name: 'Yoruba', scale: 60 },
    ],
    hobbies: ['Singing', 'Playing the keyboard', 'Seeing a movie'],
    education: [
      {
        degree: 'Bachelors Degree',
        year: '12/2010 – 06/2014',
        school: 'University of Ilorin, Ilorin',
      },
    ],
    employment: [
      {
        title: 'Chief Technology Officer',
        date: '03/2023 – Present',
        location: 'Taytute, Ibadan',
        roles: [
          [
            'Project Management:',
            "I lead a team of amazing engineers to build a hiring management system which integrated with different third party API's such as Paystack, Zoho, to mention but a few.",
          ],
          [
            'Web development:',
            "I handled the refactoring of code from React to Next to help improve website's SEO ratings. Also l made use of the trending technology stacks, such as Next, Prisma, Socket, Tailwind in the process of converting figma designs into a working product",
          ],
          // [
          //   "Database Management:",
          //   "Orchestrated server-side logic and database operations to guarantee efficient functionality and data integrity. Implemented scalable and optimized solutions for robust performance under high traffic.",
          // ],
          // [
          //   "Documentation:",
          //   "Maintained comprehensive and organized documentation, facilitating knowledge transfer and easing on-boarding processes for team members.",
          // ],
          // [
          //   "Troubleshooting and Optimization:",
          //   "Identified and resolved complex technical issues, employing analytical skills to optimize application performance. Implemented improvements and updates to enhance overall system efficiency.",
          // ],
          // [
          //   "Testing:",
          //   "Furthermore i handled the deployment of code, creating a deployment pipeline and code versioning with Git, also wrote negative and positive test cases for code coverage as well as unit test for components",
          // ],
        ],
      },
      // {
      //   title: "Lead Software Engineer",
      //   date: "05/2022 – 01/2023",
      //   location: "Fitted, Lagos",
      //   roles: [
      //     [
      //       "Order Management System Development:",
      //       "Led the development of a comprehensive Order Management System (OMS) that streamlined the entire order lifecycle from purchase to delivery, ensuring efficiency and accuracy.",
      //     ],
      //     [
      //       "Design Implementation:",
      //       "Transformed Figma designs into responsive and high-quality code, enhancing the user experience with pixel-perfect accuracy.",
      //     ],
      //     [
      //       "Order Management System Enhancement:",
      //       "Enhanced the OMS by implementing key functionalities such as payment processing, dispatch management, embroidery integration, VoIP calls, messaging, and extensive code refactoring to improve performance and scalability.",
      //     ],
      //     [
      //       "Bug Fixing and Troubleshooting:",
      //       "Proactively identified and resolved code issues, ensuring a seamless and bug-free application performance through meticulous troubleshooting and debugging.",
      //     ],
      //   ],
      // },
      // {
      //   title: "Principal Engineer",
      //   date: "09/2018 – 12/2021",
      //   location: "OIRS (Osun Internal Revenue State), Osogbo",
      //   roles: [
      //     [
      //       "Receipt Generation System Development:",
      //       "Developed a sophisticated receipt generation system for a state tax organization, ensuring precise accuracy and adherence to tax regulations.",
      //     ],
      //     [
      //       "System Enhancement and Maintenance:",
      //       "Engineered additional functionalities and conducted comprehensive system refactoring to significantly enhance efficiency and usability.",
      //     ],
      //     [
      //       "Bug Fixing and Troubleshooting:",
      //       "Diagnosed and resolved intricate technical issues, ensuring the system's unwavering stability and reliability.",
      //     ],
      //     [
      //       "Data Integrity and Security:",
      //       "Safeguarded data integrity and security by implementing advanced encryption and rigorous validation protocols.",
      //     ],
      //     [
      //       "Documentation:",
      //       "Curated comprehensive and well-organized documentation, streamlining knowledge transfer and simplifying onboarding processes for team members.",
      //     ],
      //   ],
      // },
    ],
    certificates: [
      // {
      //   "name": "Javascript",
      //   "date": "Present",
      //   "link": "https://www.hackerrank.com/certificates/45d30364b41c",
      //   "issuer": "HackerRank"
      // },
      // {
      //   "name": "React",
      //   "date": "Present",
      //   "link": "https://www.hackerrank.com/certificates/11fe36bbc438",
      //   "issuer": "HackerRank"
      // },
      // {
      //   "name": "Frontend Developer",
      //   "date": "Present",
      //   "link": "https://www.hackerrank.com/certificates/fb6b3856cc8d",
      //   "issuer": "HackerRank"
      // },
      // {
      //   "name": "Rest API",
      //   "date": "Present",
      //   "link": "https://www.hackerrank.com/certificates/5b3317b77895",
      //   "issuer": "HackerRank"
      // },
      // {
      //   "name": "Artificial Intelligence",
      //   "date": "Present",
      //   "link": "https://drive.google.com/file/d/1m1Tr1rb2UwL-5pISgj2vjOxQT_8VN3uj/view?usp=sharing",
      //   "issuer": "British Computer Society"
      // }
    ],
  },
  colorList: {},
  email: 'odavidbolaji14@gmail.com',
}

export const prepareCvDate = (data: any) => {

  return {
    name: `${data?.fname} ${data?.lname}`,
    email: data?.email,
    phone: data?.phone,
    summary: !data?.summary ?  '' : data?.summary?.text,
    country: data?.profile?.country?.trim() ?? '',
    state: data?.profile?.state?.trim() ?? '',
    city: data?.profile?.city?.trim() ?? '',
    lga: data?.profile?.lga?.trim() ?? '',
    skills:
      data?.skills.map((skill: any) => ({
        name: skill.skill,
        scale: undefined,
      })) ?? [],
    education:
      data?.education.map((edu: any) => {
        return {
          degree: edu.degree,
          startYear: edu.startYear,
          endYear: edu.endYear,
          school: edu.school,
          more: undefined,
        }
      }) ?? [],
    employment:
      data?.work.map((wrk: any) => ({
        title: wrk.title,
        startMonth: wrk.startMonth,
        startYear: wrk.startYear,
        endMonth: wrk.endMonth,
        endYear: wrk.endYear,
        currentDate:
          wrk.endYear === wrk.startYear && wrk.endMonth === wrk.startMonth,
        location: wrk.location,
        roles: wrk.roles.map((role: any) => role.role),
      })) ?? [],
    languages: [],
    hobbies: [],
    certificates: [],
  }
}
