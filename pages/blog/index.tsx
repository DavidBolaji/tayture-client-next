import React from 'react'
import Wrapper from '@/components/Wrapper/Wrapper'
import LikesCom from './components/LikesCom'
import BackNext from './components/BackNext'
import HomeLayout from '@/components/layouts/HomeLayout'
import { BlogTagStyle } from './components/BlogTagStyle.styles'
import { Footer } from '@/components/Footer'
import ImgNameDate from './components/ImgNameDate'
import SectionCont from './components/helpers/SectionCont'
import ArticlesCatCard from './components/ArticlesCatCard'
import HeadingDesc from './components/HeadingDesc'
import NavItem from './components/NavItem'
import { HiOutlineArrowRight } from "react-icons/hi";

const Blog = () => {
  return (
    <>
      <div className="bg-blog_bg overflow-auto h-[99vh]">
        <div className='bg-blog_bg'>

        <Wrapper>
          {/* Hero */}
          <div className="relative pt-10 md:py-12 lg:pb-10 lg:pt-20">
            {/* Heading(Head and Paragraph) */}
            <HeadingDesc heading='Editor&apos;s Pick' description='Discover outstanding articles, Insights and Inspiration'/>

            {/* Hero Blog*/}
            <div className="imgWrapper flex  pt-10 sm:pt-0 items-start sm:mb-5 relative  flex-col md:flex-row justify-end ">
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
                    bg_color="black"
                    authImgCont_wi_hei='2.5rem'
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
          <SectionCont bg_color="bg-[rgb(242,242,242)]" class_name="my-12">
            {/* Header Section 2 */}
            <HeadingDesc
              heading="Top trending topics"
              description="Discover 233 topics"
            />

            {/* Articles Category Card  */}
            <div className="artcilesCatCard">
              <div className="-mx-2 xl:-mx-4 relative whitespace-nowrap -mx-2 xl:-mx-4 overflow-hidden">
                <ArticlesCatCard
                  category="Admin"
                  totalCatArticles="20 Articles"
                  categoryColor="#EAB308"
                  rank="#1"
                  bg_color_rank="#FEF9C3"
                  text_color_rank="#EAB308"
                  bg_image_url="url(https://img.freepik.com/free-photo/entrepreneurs-meeting-office_23-2148898688.jpg?t=st=1712831917~exp=1712835517~hmac=d3e6c62789e340457130f14c892e245e2ef8c4512b82811c35b14a24a7067daf&w=996)"
                  authImgCont_wi_hei = '2.5rem'
                />
                <ArticlesCatCard
                  category="Teachers"
                  totalCatArticles="10 Articles"
                  categoryColor="#EF4444"
                  rank="#2"
                  bg_color_rank="#FEE2E2"
                  text_color_rank="#EF4444"
                  bg_image_url="url(https://img.freepik.com/free-photo/medium-shot-smiley-woman-with-white-board_23-2149272221.jpg?t=st=1712842359~exp=1712845959~hmac=84e9b41ce746cc752babc2926fce09ad0cbbcbc874c4f2d5d43eea19bf34aee6&w=996)"
                  authImgCont_wi_hei = '2.5rem'
                />
                <ArticlesCatCard
                  category="Pupils"
                  totalCatArticles="10 Articles"
                  categoryColor="rgb(99,102,241)"
                  rank="#3"
                  bg_color_rank="rgb(224 231 255)"
                  text_color_rank="rgb(55 48 163)"
                  bg_image_url="url(https://img.freepik.com/free-photo/front-view-kid-doing-homework_23-2149610742.jpg?t=st=1712843045~exp=1712846645~hmac=255d35bf764718bb1864a29615708666ff743c47584a097c64569468025cde32&w=996)"
                  authImgCont_wi_hei = '2.5rem'
                />
                <ArticlesCatCard
                  category="Parents"
                  totalCatArticles="15 Articles"
                  categoryColor="#EC4899"
                  bg_image_url="url(https://img.freepik.com/free-photo/medium-shot-happy-parents-girl_23-2148960586.jpg?t=st=1712843236~exp=1712846836~hmac=07be2995070489fcd7c2bfd1fd7478b5f955c7e6b3a1dbeb692eb84c18d2a136&w=996)"
                  authImgCont_wi_hei = '2.5rem'
                />
                <ArticlesCatCard
                  category="Events"
                  totalCatArticles="10 Articles"
                  categoryColor="#EF4444"
                  bg_image_url="url(https://img.freepik.com/free-photo/portrait-elegant-professional-businessman-speaking-conference_23-2150917212.jpg?t=st=1712843534~exp=1712847134~hmac=32fdc9959a700b0f44530679b47b24c93de6fc7bec1224bdd6c7c580a00de2ea&w=740)"
                  authImgCont_wi_hei = '2.5rem'
                />
                <ArticlesCatCard
                  category="Events"
                  totalCatArticles="10 Articles"
                  categoryColor="#EF4444"
                  bg_image_url="url(https://img.freepik.com/free-photo/portrait-elegant-professional-businessman-speaking-conference_23-2150917212.jpg?t=st=1712843534~exp=1712847134~hmac=32fdc9959a700b0f44530679b47b24c93de6fc7bec1224bdd6c7c580a00de2ea&w=740)"
                  authImgCont_wi_hei = '2.5rem'
                />
              </div>
            </div>
          </SectionCont>

          {/* Section 3 */}

          <SectionCont bg_color="none">
            {/* Heading and Buttons for Categories */}
            <div className="flex flex-col mb-8 relative">
              {/* Heading */}
              <HeadingDesc
                heading="Latest Articles"
                description="Discover the most outstanding articles in all topics targetted at better K-12 Education"
              />

              {/* Buttons for Categories */}
              <div className="flex justify-between">
                <nav className="relative flex w-full overflow-x-auto text-sm md:text-base">
                  <NavItem />
                </nav>
                <button className="flex-shrink-0 relative h-auto inline-flex items-center justify-center rounded-full transition-colors border-transparent bg-white text-neutral-900 text-sm sm:text-base font-medium px-6 hidden md:!flex ">
                  <span>View all</span>
                  <HiOutlineArrowRight className='w-6 h-5 ml-3'/>
                </button>
              </div>
            </div>
          </SectionCont>
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
