import { v4 } from 'uuid'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
import moment from 'moment'
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { IJobSchDb } from '@/pages/api/job/types'
import * as momentT from 'moment-timezone'
import { Education, Profile, School, SchoolAdmin, Skills, Summary, User, WorkHistory } from '@prisma/client'

TimeAgo.addLocale(en)
const timeAgo = new TimeAgo('en-US')

export const AMOUNT_PER_HIRE = process.env.NEXT_PUBLIC_ENV === 'dev' ? 100 : 10000

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

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function isNotNumber(input: string) {
  return input === '' || !/^\d+$/.test(input)
}

export function isNotText(input: string) {
  return input === '' || !/^\D+$/.test(input)
}

export const isValidEmail = (email: string) => {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
  return emailRegex.test(email)
}

export const closingDate = (date: string) => {
  const formattedDate = date ? moment(date).format('Do MMM') : ''
  return formattedDate
}
export const closingDate2 = (date: string) => {
  const formattedDate = date ? moment(date).format('Do MMM') : ''
  return formattedDate
}

export const formatXAxisLabel = (dateString: string) => {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.toLocaleString('default', { month: 'short' });
  const formattedDate = `${day}${day === 1 || day === 21 || day === 31 ? 'st' : day === 2 || day === 22 ? 'nd' : day === 3 || day === 23 ? 'rd' : 'th'} ${month}`;
  return formattedDate;
};

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
    if (data.education.length > 0){ score += 10; console.log('education');}
    if (data.skills.length > 0){ score += 10; console.log('skills');}
    if (data.work.length > 0){ score += 10; console.log('work length');}
    if (data.profile.address){ score += 10; console.log('address');}
    if (data.profile.cv){ score += 10; console.log('cv');}
    if (data.profile.cover){ score += 10; console.log('cover');}
    if (data.profile.available){ score += 10; console.log('available');}
    if (data.profile.address){ score += 10; console.log('address');}
    if (data.profile.workplace) {score += 5; console.log('workplace');}
    if (data.profile.picture) {score += 5; console.log('pictire');}
    if (data.summary.text) {score += 10; console.log('summary');}
  }
  return score
}

export const formatNumberToK = (value: string) => {
  const numList = value.split('-')
  const nNumList = numList.map(n =>  {
    const num = Number(n.trim().replace(',',''))

    if (isNaN(num)) {
      return null; // Return null if value is not a valid number
    }

    if (num < 1000) {
      return num.toString(); // Return the number as is if it's less than 1000
  }
  
  const suffixes = ['', 'k', 'M', 'B', 'T']; // Add more suffixes if needed
  const suffixIndex = Math.floor(Math.log10(num) / 3);
  const shortValue = (num / Math.pow(1000, suffixIndex)).toFixed(0);
  return shortValue + suffixes[suffixIndex]
  })
  
  if (nNumList.length > 1) {
   return `${nNumList[0]} - ${nNumList[1]}/month`
  } else {
    return `${nNumList[0]}/month`
  }
}

export const canManageSchool = (schAdmin: SchoolAdmin[], email: string, isCreator: boolean) => {
    const isAdmin = schAdmin?.find((admin: SchoolAdmin) => admin.sch_admin_email === email)
    if (!isAdmin?.sch_admin_email) {
      return true
    }
    return isCreator ? true : isAdmin?.sch_admin_active
}

export function userFilterChart(users: User[]) {
  const countByDate: { [key: string]: number } = {};

  users?.forEach((item) => {
    const createdAt = new Date(item.createdAt!).toDateString();

    if (countByDate[createdAt]) {
      countByDate[createdAt]++;
    } else {
      countByDate[createdAt] = 1;
    }
  });
  const data = Object.values(countByDate);
  const labels = Object.keys(countByDate);
  return {
    data,
    labels,
  };
}

export const getRandomColor = () => {
  const colors = ['#FF5733', '#33FF57', '#5733FF', '#FF33E9', '#33E9FF', '#E9FF33', '#333333', '#000000']; // Add your list of colors here
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
};

export const getRandomColor2 = (colors: string[]) => {
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
}
