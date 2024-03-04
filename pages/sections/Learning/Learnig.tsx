'use client'
import { Row, Grid } from 'antd'
import LearningCardDesktop from './LearningCardDesktop'
import LearningCardMoble from './LearningCardMoble'

import CardCarousel from '@/components/CardCarousel'
import useCarousel from '@/hooks/useCarousel'

const { useBreakpoint } = Grid

function Learnig() {
  const screen = useBreakpoint()
  const { containerRef, handlers, numCards, handleIndex, currentIndex } =
    useCarousel({
      dashboard: false,
    })

  return (
    <div className="relative">
      {screen.lg ? (
        <div className="bg-[#FAF9F9] md:px-[6rem] px-[1.5rem] pt-[2.5rem] pb-[2.56rem]">
          <Row
            gutter={16}
            className="bg-white px-[2.75rem] py-[2rem]
            rounded-[1.875rem] hover:shadow-lg flex jus justify-evenly"
          >
            <LearningCardDesktop />
          </Row>
        </div>
      ) : (
        <div
          ref={containerRef}
          style={{
            width: '100%',
            overflowX: 'scroll',
            display: 'flex',
          }}
          className="md:px-[4rem] bg-[#FAF9F9]
          md:mt-0 px-[1.5rem] pb-20 no-s"
        >
          <CardCarousel
            card={<LearningCardMoble />}
            cIdx={currentIndex}
            handlers={handlers}
            numCards={numCards}
            handleIndex={handleIndex}
          />
        </div>
      )}
    </div>
  )
}

export default Learnig
