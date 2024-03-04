import React from 'react'
import { SwipeableHandlers } from 'react-swipeable'

function CardCarousel({
  card,
  handlers,
  numCards,
  handleIndex,
  cIdx,
  bottom,
  height,
}: {
  card: React.ReactNode
  handlers: SwipeableHandlers
  numCards: number
  handleIndex: (value: number) => void
  cIdx: number
  bottom?: boolean
  height?: string
}) {
  return (
    // million-ignore
    <div {...handlers}>
      <div
        className="flex overflow-x-scroll scroll-snap-x-mandatory no-s"
        style={{ scrollSnapType: 'x mandatory' }}
      >
        {card}
      </div>

      <div
        className={`absolute left-[50%] translate-x-[-50%] transform ${
          !bottom ? 'bottom-7' : 'top-[405px] sm:top-[380px]'
        } ${height && height}`}
      >
        <div className="flex space-x-2 sticky">
          {Array.from({ length: numCards }).map((_, index) => (
            <div
              key={index}
              className={`w-[0.5rem] h-[0.5rem] rounded-full ${
                index === cIdx ? 'bg-orange' : 'bg-ash_600'
              }`}
              onClick={() => handleIndex(index)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default CardCarousel
