'use client'
import { useAnimate } from 'framer-motion'
import React, { FC, ReactNode,  useEffect, useRef, useState } from 'react'
import styled from '@emotion/styled'
import { cn } from '@/utils/helpers'

const StyledStepper = styled.div<{height: number}>`
  position: relative;
  display: flex;
  flex-wrap: nowrap;
  overflow-x: hidden;
  height: ${(prop) => prop.height};
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
  totalSteps: number,
  setStep?: (step: number) => void
}

interface StepperProps {
  children: ReactNode
  className?: string
  init: ({ current, next, prev, totalSteps, setStep }: StepperChildProps) => void
}

const Stepper: FC<StepperProps> = ({ children, className, init,  }) => {
  const [scope, animate] = useAnimate()
  const [activeChildHeight, setActiveChildHeight] = useState(0);
  const [cur, setCur] = useState(0)
  const total = React.Children.count(children)
  const nextBtn = useRef<HTMLButtonElement>(null)
  const prevBtn = useRef<HTMLButtonElement>(null)
  const [mount, setMount] = useState(false)
  

  const moveForward = () => {
    nextBtn.current?.click()
  }
  const moveBack = () => {
    prevBtn.current?.click()
  }
  const setStart = (step: number) => {
    setCur(step)
    init({
      current: step,
      next: moveForward,
      prev: moveBack,
      totalSteps: total,
      setStep: (step) => setStart.bind(null, step)
    })
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
        { x: '100%', opacity: 0, height: "0px" },
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
        setStep: (step) => setStart.bind(null, step)
      })
    }
  }

  const handlePrev = async () => {
    const nextVal = `-${(cur - 1) * 100}%`
    const sCur = `-${(cur + 1) * 100}%`
    const fCur = `-${cur * 100}%`

    if (cur > 0) {
      animate(
        scope.current.childNodes[cur],
        { x: sCur, opacity: 1, display: 'block' },
        { duration: 1 },
      )
      animate(
        scope.current.childNodes[cur - 1],
        { x: nextVal, opacity: 1, display: 'block', height: "auto" },
        { duration: 2 },
      )
      setCur((prev) => prev - 1)
      init({
        current: cur - 1,
        next: moveForward,
        prev: moveBack,
        totalSteps: total,
        setStep: (step) => setStart.bind(null, step)
      })
    }
  }

  useEffect(() => {
    init({
      current: cur,
      next: moveForward,
      prev: moveBack,
      totalSteps: total,
      setStep: (step) => setStart.bind(null, step)
    })
  }, [])


  useEffect(() => {
    setMount(true)
  }, [])

  useEffect(() => {
    if(!mount) return
   
    setActiveChildHeight(scope.current.childNodes[cur]?.scrollHeight);
  }, [cur, mount])

  if (!mount) {
    return null
  }


  return (
    <>
      <StyledStepper
        height={activeChildHeight}
        ref={scope}
        className={cn('no-s bg-transparent', className)}
      >
        {children}
      </StyledStepper>
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
