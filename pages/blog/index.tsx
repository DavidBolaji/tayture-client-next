import React from 'react'
import Wrapper from '@/components/Wrapper/Wrapper'
import LikesCom from './components/LikesCom'
import BackNext from './components/BackNext'
import HomeLayout from '@/components/layouts/HomeLayout'
import { BlogTagStyle } from './components/BlogTagStyle.styles'
import { Footer } from '@/components/Footer'
import SectionCont from './components/helpers/SectionCont'
import HeadingDesc from './components/HeadingDesc'
import SmallArticleCard from './components/SmallArticleCard'
import WidgetHeading from './components/WidgetHeading'
import WidgetTags from './components/WidgetTags'
import PopularPostCard from './components/PopularPostCard'
import TrendingTopic from './components/TrendingTopic'
import Pagination from './components/Pagination'
import ImgNameDate from './components/ImgNameDate'
import TrendingTopics from './components/TrendingTopics'
import MustRead from './components/MustRead'
import K12Section from './components/K12Section'
import LatestArcticlesSection from './components/LatestArcticlesSection'
import SingleBlogTemplate from './pages/SingleBlogTemplate'

const Blog = () => {
  return (
    <>
      <div className="bg-blog_bg overflow-auto h-[99vh]">
        <div className="bg-blog_bg">
          <Wrapper>
            {/* Hero */}
            <div className="relative pt-10 md:py-12 lg:pb-10 lg:pt-20">
              {/* Heading(Head and Paragraph) */}
              <HeadingDesc
                heading="Editor's Pick"
                description="Discover outstanding articles, Insights and Inspiration"
              />

              {/* Hero Blog*/}
              <div className="imgWrapper flex m:pt-0 items-start sm:mb-5 relative  flex-col md:flex-row justify-end ">
                {/* Image */}
                <div
                  className="bg-black w-full md:w-4/5 lg:w-2/3  bg-center bg-no-repeat bg-cover"
                  style={{
                    height: '450px',
                    borderRadius: '20px',
                    background:
                      'url(https://images.unsplash.com/photo-1440778303588-435521a205bc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80)',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
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
                        Effective classroom management strategies for new
                        teachers
                      </a>
                    </h2>

                    <ImgNameDate
                      authName="Boluwatife Adewole"
                      // altImage="tayture"
                      // image
                      date="April 10, 2024"
                      enableDash={false}
                      isColumn={true}
                      bg_color="black"
                      authImgCont_wi_hei="2.5rem"
                      is_image={false}
                    />

                    <LikesCom
                      likes_num="20"
                      comments_num="30"
                      bg_color="rgba(249,250,251)"
                    />
                  </div>

                  {/* Back and Next Btn Cont */}
                  <div className="p-4 sm:pt-8 sm:px-10">
                    <BackNext />
                  </div>
                </div>
              </div>
            </div>
            {/* Section 2 */}
            <TrendingTopics />

            {/* Section 3  K12_centered*/}
            <K12Section />

            {/* Section 4 */}
            <MustRead />

            {/* Section 5 Latest Articels*/}
            <LatestArcticlesSection />


          </Wrapper>

          <Footer />
        </div>
      </div>
    </>
  )
}

Blog.getLayout = function getLayout(page: React.ReactNode) {
  return <HomeLayout>{page}</HomeLayout>
}

export default Blog
