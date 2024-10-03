"use client"

import React, { useState } from 'react'
import Button from '../Button/Button'
import { useRouter } from 'next/router'
import { Images } from '@/assets'
import Slider from 'react-slick'
import Image from 'next/image'

const cvTemplates = [
  { path: 'one', image: Images.CV },
  { path: 'three', image: Images.CV3 },
  { path: 'four', image: Images.CV4 },
]

const CVList = () => {
  const [selected, setSelected] = useState('')
  const router = useRouter()

  // Settings for react-slick slider (responsive carousel)
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3, // Show 3 slides on desktop
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 768, // When screen width is less than 768px (mobile)
        settings: {
          slidesToShow: 1, // Show 1 slide on mobile
        },
      },
    ],
  }

  return (
    <div>
      <Slider {...settings}>
        {cvTemplates.map((el) => (
          <div key={el.path} className="px-2">
            <label
              className={`radio-image w-[250px] border ${
                selected === el.path ? 'border-blue-500' : ''
              }`}
              onClick={() => setSelected(el.path)}
            >
              <input
                type="radio"
                name="template"
                value={el.path}
                className="hidden-radio"
              />
              <div className="w-[250px] h-[300px] overflow-hidden cont">
                <Image
                  className="object-fit "
                  src={el.image}
                  alt={`Template ${el.path}`}
                  width={300}
                  height={225}
                />
              </div>
            </label>
          </div>
        ))}
      </Slider>

      <div className="flex justify-end mt-5">
        <Button
          onClick={() => router.push(`/dashboard/cv/${selected}`)}
          disabled={!selected.trim().length}
          text="Next"
          render="light"
          bold={false}
        />
      </div>
    </div>
  )
}

export default CVList
