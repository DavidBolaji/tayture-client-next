import React from 'react'
import Wrapper from '@/components/Wrapper/Wrapper'
import LikesCom from './components/LikesCom'
import BackNext from './components/BackNext'
import HomeLayout from '@/components/layouts/HomeLayout'
import { BlogTagStyle } from './components/BlogTagStyle.styles'
import { Footer } from '@/components/Footer'
import ImgNameDate from './components/ImgNameDate'
import SectionCont from './components/helpers/SectionCont'

const Blog = () => {
  return (
    <>
      <div className="bg-blog_bg overflow-auto">
        <Wrapper>
          {/* Hero */}
          <div className="relative pt-10 pb-16 md:py-16 lg:pb-10 lg:pt-20">
            {/* Heading(Head and Paragraph) */}
            <div
              className="headingWrap relative flex flex-col sm:flex-col sm:items-start justify-between md:mb-12 text-neutral-900 dark:text-neutral-50"
              style={{ maxWidth: '42rem' }}
            >
              <h1
                className="text-2xl md:text-3xl lg:text-4xl"
                style={{ fontWeight: '900' }}
              >
                Editor&apos;s Pick
              </h1>
              <p className="tracking-normal mt-2 md:mt-3 font-normal block text-base sm:text-xl text-neutral-500 dark:text-neutral-400">
                Discover outstanding articles, Insights and Inspiration
              </p>
            </div>

            {/* Hero Blog*/}
            <div className="imgWrapper flex  py-10 items-start mb-5 relative  flex-col md:flex-row justify-end ">
              {/* Image */}
              <div
                className="bg-black w-full md:w-4/5 lg:w-2/3"
                style={{
                  height: '450px',
                  borderRadius: '20px',
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center center',
                  background:
                    'url(https://images.unsplash.com/photo-1440778303588-435521a205bc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80)',
                }}
              ></div>

              {/* Article Card  */}
              <div className="md:absolute z-10 md:left-0 md:top-1/2 md:-translate-y-1/2 w-full -mt-8 md:mt-0 px-3 sm:px-6 md:px-0 md:w-3/5 lg:w-1/2 xl:w-2/5">
                <div
                  className="bg-blog_bg  p-4 sm:p-8 xl:py-14 md:px-10 dark:bg-neutral-900/40 backdrop-blur-lg shadow-lg dark:shadow-2xl rounded-3xl space-y-3 sm:space-y-5 "
                  style={{
                    backgroundColor: '#fff6',
                    backdropFilter: ' blur(16px)',
                  }}
                >
                  <BlogTagStyle
                    text="Administrative"
                    tag_link="#"
                    bg_color="rgb(254 249 195)"
                    text_color="rgb(133 77 14)"
                    hover_bg_color="rgb(133 77 14)"
                    hover_text_color="white"
                  />

                  <h2 className="text-base sm:text-xl lg:text-2xl font-semibold ">
                    <a href="#">
                      Effective classroom management strategies for new teachers
                    </a>
                  </h2>

                  <ImgNameDate
                    authName="Boluwatife Adewole"
                    // altImage="tayture"
                    // image
                    date="April 10, 2024"
                    enableDash={false}
                    isColumn={true}
                  />

                  <LikesCom />
                </div>

                {/* Back and Next Btn Cont */}
                <div className="p-4 sm:pt-8 sm:px-10">
                  <BackNext />
                </div>
              </div>
            </div>
          </div>

          {/* Section 2 */}
          <SectionCont bg_color='bg-neutral-100'>

            {/* Header Section 2 */}
            <div className="relative flex flex-col sm:flex-row sm:items-end justify-between mb-10 md:mb-12 text-neutral-900 dark:text-neutral-50">
              <div className="max-w-2xl">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold">
                  Top trending topics
                </h2>
                <span className="mt-2 md:mt-3 font-normal block text-base sm:text-xl text-neutral-500 dark:text-neutral-400">
                  {/* the number of topics will be length of articles array + 1 */}
                  Discover 233 topics
                </span>
              </div>
            </div>

            {/* Articles Category Card  */}
            <div className='artcilesCatCard'>
              <ul className='-mx-2 xl:-mx-4'>
                <li className='relative inline-block px-2 xl:px-4'>A</li>
                <li className='relative inline-block px-2 xl:px-4'>B</li>
                <li className='relative inline-block px-2 xl:px-4'>C</li>
              </ul>
            </div>
          </SectionCont>
        </Wrapper>

        <Footer />
      </div>
    </>
  )
}

Blog.getLayout = function getLayout(page: React.ReactNode) {
  return <HomeLayout>{page}</HomeLayout>
}

export default Blog
