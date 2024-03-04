'use client'
import { Grid } from 'antd'
import { useEffect, useRef, useState } from 'react'
import { useSwipeable, SwipeableHandlers } from 'react-swipeable'

const { useBreakpoint } = Grid

const useCarousel = ({ dashboard }: { dashboard?: boolean }) => {
  const screen = useBreakpoint()
  const containerRef = useRef<HTMLDivElement>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const cardWidth = !screen.md ? 300 : 500
  const [numCards, setNumCards] = useState(0)

  useEffect(() => {
    const container = containerRef.current
    if (container) {
      if (dashboard) {
        setNumCards(
          container?.childNodes[0].childNodes[0].childNodes[0].childNodes
            .length,
        )
      } else {
        setNumCards(container.childNodes[0].childNodes[0].childNodes.length)
      }
    }
  }, [dashboard])

  const handleNext = () => {
    const container = containerRef.current

    if (container) {
      if (currentIndex < numCards - 1) {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % numCards)
        container.scrollTo({
          left: cardWidth * (currentIndex + 1),
          behavior: 'smooth',
        })
      }
    }
  }

  const handlePrev = () => {
    const container = containerRef.current

    if (container) {
      if (currentIndex > 0) {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + numCards) % numCards)
        container.scrollTo({
          left: cardWidth * (currentIndex - 1),
          behavior: 'smooth',
        })
      }
    }
  }

  const handleIndex = (ind: number) => {
    if (ind > currentIndex) {
      handleNext()
    }
    if (ind < currentIndex) {
      handlePrev()
    }
  }

  const handlers: SwipeableHandlers = useSwipeable({
    onSwipedLeft: handleNext,
    onSwipedRight: handlePrev,
  })
  return {
    containerRef,
    handlers,
    numCards,
    handleIndex,
    currentIndex,
  }
}

export default useCarousel
