import { useGlobalContext } from '@/Context/store'
import { Images } from '@/assets'
import { boldFont } from '@/assets/fonts/fonts'
import Button from '@/components/Button/Button'
import CardComponent from '@/components/CardComponent/CardComponent'
import { Footer } from '@/components/Footer'
import Wrapper from '@/components/Wrapper/Wrapper'
import HomeLayout from '@/components/layouts/HomeLayout'
import React from 'react'

const PostLandingPage = () => {
  const { setUI } = useGlobalContext()
  const handleOpen = () => {
    setUI((prev) => {
      return {
        ...prev,
        postLandingModal: {
          ...prev.postLandingModal,
          visibility: true,
        },
      }
    })
  }
  return (
    <div className="bg-ash_200 pt-[50px] h-[90vh] overflow-y-scroll no-s">
      <Wrapper>
        <div className="grid md:grid-cols-12 grid-cols-6">
          <div className="col-span-6 md:order-none order-6 flex flex-col justify-center md:pl-5 md:mb-0 mb-8">
            <h1
              className={`lg:font-[800] text-[25px] md:text-[38px] lg:text-[42px] xl:text-[40px] md:text-left  lg:text-left text-center sm:text-[38px] mb-2 ${boldFont.className}`}
            >
              Find the perfect <span className="text-orange">hire</span>
            </h1>
            <p
              className={`text-[16px] md:text-left text-ash_400 lg:text-left lg:text-[18px] xl:text-[18px] text-center mb-5 sm:max-w-[400px] sm:mx-auto md:mx-0 md:max-w-[500px]`}
            >
              Have a vacancy at your school ? Tayture can help you find
              qualified candidates
            </p>
            <div className="md:text-left text-center">
              <Button
                onClick={handleOpen}
                text={'Post a Job'}
                render="light"
                bold={false}
              />
            </div>
          </div>

          <div className="col-span-6">
            <div className="md:my-16 flex items-center justify-center sm:scale-[0.8] md:scale-100 md:pl-20">
              <CardComponent
                src={Images.Empower_Max_Image}
                alt="tayture empower"
                right
              />
            </div>
          </div>
        </div>
      </Wrapper>
      <Footer />
    </div>
  )
}

PostLandingPage.getLayout = function getLayout(page: React.ReactNode) {
  return <HomeLayout>{page}</HomeLayout>
}

export default PostLandingPage
