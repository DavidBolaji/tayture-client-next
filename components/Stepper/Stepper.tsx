'use client'
import { useAnimate } from 'framer-motion'
import React, { FC, ReactNode, useEffect, useRef, useState } from 'react'
import styled from '@emotion/styled'
import { cn } from '@/utils/helpers'

const StyledStepper = styled.div`
  position: relative;
  display: flex;
  flex-wrap: nowrap;
  overflow-x: hidden;
  & > * {
    flex: 1 0 100%;
  }
  & > *:not(:first-of-type) {
    display: none;
  }
`

export interface StepperChildProps {
  current: number
  next: () => void
  prev: () => void
  totalSteps: number
}

interface StepperProps {
  children: ReactNode
  className?: string
  init: ({ current, next, prev, totalSteps }: StepperChildProps) => void
}

const Stepper: FC<StepperProps> = ({ children, className, init }) => {
  const [scope, animate] = useAnimate()
  const [cur, setCur] = useState(0)
  const total = React.Children.count(children)
  const nextBtn = useRef<HTMLButtonElement>(null)
  const prevBtn = useRef<HTMLButtonElement>(null)
  const [mount, setMount] = useState(false)
  const [count, setCount] = useState(0)

  const moveForward = () => {
    nextBtn.current?.click()
  }
  const moveBack = () => {
    prevBtn.current?.click()
  }

  const handleNext = async () => {
    const nextVal = `-${(cur + 1) * 100}%`
    const curVal = `-${(cur + 1 + 1) * 100}%`

    if (cur < total - 1) {
      await animate(
        scope.current.childNodes[cur + 1],
        { x: curVal, display: 'none' },
        { duration: 0 },
      )
      animate(
        scope.current.childNodes[cur],
        { x: '100%', opacity: 0 },
        { duration: 2 },
      )
      await animate(
        scope.current.childNodes[cur + 1],
        { x: nextVal, opacity: 1, display: 'block' },
        { duration: 1.5 },
      )

      setCur((prev) => prev + 1)
      init({
        current: cur + 1,
        next: moveForward,
        prev: moveBack,
        totalSteps: total,
      })
    }
  }

  const handlePrev = async () => {
    const nextVal = `-${(cur - 1) * 100}%`
    const sCur = `-${(cur + 1) * 100}%`
    const fCur = `-${cur * 100}%`

    if (cur > 0) {
      // await animate(
      //   scope.current.childNodes[cur - 1],
      //   { x: nextVal, opacity: 0, display: "none" },
      //   { duration: 0 }
      // );
      animate(
        scope.current.childNodes[cur],
        { x: sCur, opacity: 1, display: 'block' },
        { duration: 1 },
      )
      animate(
        scope.current.childNodes[cur - 1],
        { x: nextVal, opacity: 1, display: 'block' },
        { duration: 2 },
      )
      // await animate(
      //   scope.current.childNodes[cur],
      //   { x: fCur, display: "none" },
      //   { duration: 1.5 }
      // );
      // await animate(
      //   scope.current.childNodes[cur],
      //   { x: sCur, opacity: 1, display: "block" },
      //   { duration: 1 }
      // );
      // await animate(
      //   scope.current.childNodes[cur - 1],
      //   { x: nextVal, opacity: 1, display: "block" },
      //   { duration: 1 }
      // );

      setCur((prev) => prev - 1)
      init({
        current: cur - 1,
        next: moveForward,
        prev: moveBack,
        totalSteps: total,
      })
    }
  }

  useEffect(() => {
    init({
      current: cur,
      next: moveForward,
      prev: moveBack,
      totalSteps: total,
    })
  }, [])

  useEffect(() => {
    setMount(true)
  }, [])

  if (!mount) {
    return null
  }

  return (
    <>
      <StyledStepper
        ref={scope}
        className={cn('no-s bg-transparent', className)}
      >
        {children}
      </StyledStepper>
      {/* <StyledStepper ref={scope} className={cn("no-s", className)}>
        {React.Children.map(children, (child, index) =>
          React.cloneElement(child as React.ReactElement, {
            style: { display: index === cur && "block" },
          })
        )}
      </StyledStepper> */}

      <button
        type="button"
        onClick={handlePrev}
        ref={prevBtn}
        className="hidden"
      >
        Back
      </button>
      <button
        type="button"
        ref={nextBtn}
        className="hidden"
        onClick={handleNext}
      >
        Next
      </button>
    </>
  )
}

export default Stepper
