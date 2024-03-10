import { useGlobalContext } from '@/Context/store'
import React, { useState } from 'react'

export const initialValuesCv = {
  name: `DANIEL
    OLOGUNLEKO`,
  summary:
    'Experienced web developer proficient in frontend and backend development, with expertise in HTML, CSS, JavaScript, and various frameworks/libraries. Skilled in version control (Git), deployment, and debugging. Dedicated to creating responsive, efficient, and visually appealing websites and web applications. Strong problem-solving abilities and a passion for staying updated with the latest web technologies.',
  history: [
    {
      id: 'history',
      title: 'Primary School Teacher',
      date: 'feb, 2019 - apr, 2023',
      location: 'Wordhouse Green Primary School, London',
      roles: [
        {
          keys: 'r1',
          role: 'Designing and delivering engaging lessons aligned with curriculum standards.',
        },
        {
          keys: 'r2',
          role: "Developing lesson plans, instructional materials, and activities tailored to students' learning needs.",
        },
        {
          keys: 'jker78',
          role: 'Incorporating diverse teaching methodologies and resources to enhance student understanding.',
        },
      ],
    },
  ],
  education: [
    {
      id: 'education',
      degree: 'Bachelor of Arts, Education',
      year: '2016',
      school: 'University of London - London',
    },
  ],
  location: '195 Crown Street, London W12 4WEB',
  number: '+23485674321',
  email: 'davidologunleko@gmail.com.uk',
  skills: [
    'Activity Skills',
    'Organisational skills',
    'Parent rappoort buildng',
  ],
}

export const workData = {
  title: 'Primary School Teacher',
  date: 'feb, 2019 - apr, 2023',
  location: 'Wordhouse Green Primary School, London',
  roles: [
    {
      keys: '7878',
      role: 'Designing and delivering engaging lessons aligned with curriculum standards.',
    },
    {
      keys: 'ddd89',
      role: "Developing lesson plans, instructional materials, and activities tailored to students' learning needs.",
    },
    {
      keys: '328728',
      role: 'Incorporating diverse teaching methodologies and resources to enhance student understanding.',
    },
  ],
}

export const eduData = {
  degree: 'Bachelor of Arts, Education',
  year: 'feb, 2019 - apr, 2023',
  school: 'University of London - London',
}

const useCv = () => {
  const [education, setEducation] = useState(initialValuesCv.education)
  const { colorList } = useGlobalContext()
  return { colorList, education, setEducation }
}

export default useCv
