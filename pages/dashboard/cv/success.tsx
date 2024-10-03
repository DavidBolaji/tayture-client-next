import { Icons } from '@/assets'

import { easeOut, motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useWindowSize } from 'react-use'
import Confetti from 'react-confetti'
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from 'react-share'
import { Space } from 'antd'
import { FaFacebook, FaLinkedin, FaTwitter, FaWhatsapp } from 'react-icons/fa'
import DashboardLayout from '@/components/layouts/DashboardLayout'
import Button from '@/components/Button/Button'

const Success = () => {
  const router = useRouter()
  const { width, height } = useWindowSize()
  let shareUrl = 'https://tayture.com/dashboard/cv'
  let message = "Create Prfessional CV's with Tayture. I just created mine."
  return (
    <>
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
            duration: 0.75,
            ease: easeOut,
        }}
      >
        <Confetti width={width} height={height} />
        <div className="flex mt-20  px-2 md:px-0 flex-col items-center justify-center w-full h-full relative ">
          <div className="my-5 ml-10 md:ml-10">
            <Icons.SuccessIcon width="250" height="120" />
          </div>
          <h2 className="text-center md:text-[32px] text-[24px] mb-1">
            Congratulations
          </h2>

          <p className="max-w-[700px] mx-auto text-center mb-[1.4rem] text-ash_400 -mt-7" />
          <div className="sharethis-inline-share-buttons" />
          <Space.Compact className="gap-3">
            <FacebookShareButton
              url={shareUrl}
              quote={message}
              hashtag="#education#tayture"
            >
              <div className="border cursor-pointer rounded-md px-5 bg-[#4267b2] py-2 flex items-center justify-center ">
                <FaFacebook color="#fff" />
              </div>
            </FacebookShareButton>

            <LinkedinShareButton url={shareUrl} title={message}>
              <div className="border cursor-pointer rounded-md px-5 py-2 flex items-center justify-center bg-[#0077b5]">
                <FaLinkedin color="#fff" />
              </div>
            </LinkedinShareButton>

            <TwitterShareButton url={shareUrl} title={message}>
              <div className="border cursor-pointer rounded-md px-5 py-2 flex items-center justify-center bg-black">
                <FaTwitter color="#fff" />
              </div>
            </TwitterShareButton>

            <WhatsappShareButton url={shareUrl} title={message}>
              <div className="border cursor-pointer rounded-md px-5 py-2 flex items-center justify-center bg-[#0d963e]">
                <FaWhatsapp color="#fff" />
              </div>
            </WhatsappShareButton>
          </Space.Compact>
          <div className='mt-4' />
          <Button render='light' bold={false} text="Go to Dashboard" onClick={() => router.push('/dashboard')} />
        </div>
      </motion.main>
    </>
  )
}

Success.getLayout = function getLayout(page: React.ReactNode) {
  return <DashboardLayout>{page}</DashboardLayout>
}

export default Success
