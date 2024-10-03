'use client'

// import Education from '@/pages/buildcv/components/CVform/Education'
// import WorkHistory from '@/pages/buildcv/components/CVform/WorkHistory'
import { DragEndEvent } from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'
import { useState } from 'react'

export const initialValuesCv = {
  name: `DANIEL
  OLOGUNLEKO`,
  summary:
    'Experienced web developer proficient in frontend and backend development, with expertise in HTML, CSS, JavaScript, and various frameworks/libraries. Skilled in version control (Git), deployment, and debugging.',
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
      degree: 'BACHELORS, Education',
      year: 'feb, 2019 - apr, 2023',
      school: 'University of London - London',
    },
  ],
  location: 'wisdom street, Ganye, Gombi, Adamawa State',
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

export const useOrder = () => {
  const [init, setInit] = useState(initialValuesCv)
  const [dataSource, setDataSource] = useState([
    {
      key: '1',
      name: <h1>History</h1>,
      // section: <WorkHistory />,
    },
    {
      key: '2',
      name: <h2>Education</h2>,
      // section: <Education />,
    },
  ])

  const onDragEnd = ({ active, over }: DragEndEvent) => {
    if (active.id !== over?.id) {
      setDataSource((previous) => {
        const activeIndex = previous.findIndex((i) => i.key === active.id)
        const overIndex = previous.findIndex((i) => i.key === over?.id)
        return arrayMove(previous, activeIndex, overIndex)
      })
    }
  }

  return {
    dataSource,
    setDataSource,
    onDragEnd,
    setInit,
    init,
  }
}
