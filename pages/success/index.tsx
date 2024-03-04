import { Icons } from '@/assets'
import Button from '@/components/Button/Button'
import HomeLayout from '@/components/layouts/HomeLayout'
import { AnimatePresence, easeOut, motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useWindowSize } from 'react-use'
import Confetti from 'react-confetti'

const Success = () => {
  const router = useRouter()
  const { width, height } = useWindowSize()
  const handleSubmit = () => {
    router.replace('/')
  }
  return (
    <>
      <Confetti width={width} height={height} />
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 0.75,
          ease: easeOut,
        }}
      >
        <div className="flex mt-20  px-2 md:px-0 flex-col items-center justify-center w-full h-full xl:h-[87vh] relative ">
          <div className="my-5 ml-10 md:ml-10">
            <Icons.SuccessIcon width="250" height="120" />
          </div>
          <h2 className="text-center md:text-[32px] text-[24px] mb-1">
            Congratulations
          </h2>
          <p className="max-w-[570px] text-ash_400 text-center mx-auto mb-[1.9rem]">
            You&apos;ve taken a significant step towards unlocking your full
            potential. Please check your email for the outcome of the
            satisfaction calculator.
          </p>
          <p className="max-w-[700px] mx-auto text-center mb-[1.4rem] text-ash_400 -mt-7" />
          <div>
            <Button
              render="light"
              hover
              bold={false}
              text="Go to home"
              onClick={() => handleSubmit()}
              style={{
                position: 'relative',
                zIndex: 40,
              }}
            />
          </div>
        </div>
      </motion.main>
    </>
  )
}

Success.getLayout = function getLayout(page: React.ReactNode) {
  return <HomeLayout>{page}</HomeLayout>
}

export default Success
