'use client'
import React from 'react'
import DashboardCard from '../DashboardCard'
import useCarousel from '@/hooks/useCarousel'
import CardCarousel from './CardCarousel'
import { dataCarousel } from '@/utils/data'

const CardCarouselCont = () => {
  const { containerRef, handlers, numCards, handleIndex, currentIndex } =
    useCarousel({
      dashboard: true,
    })
  return (
    <div
      className="overflow-x-auto whitespace-no-wrap no-s md:hidden block"
      ref={containerRef}
    >
      <div className="flex space-x-4 mb-5">
        <CardCarousel
          card={dataCarousel.map((d) => (
            <div key={d.id} className="md:w-[500px] w-[300px]  pr-[1.3125rem]">
              <DashboardCard
                title={d.title}
                text={d.text}
                max
                img={d.img}
                icon={d.icon}
                link={d.link}
              />
            </div>
          ))}
          bottom
          cIdx={currentIndex}
          handlers={handlers}
          numCards={numCards}
          handleIndex={handleIndex}
        />
      </div>
    </div>
  )
}

export default CardCarouselCont
