import React, { useState } from 'react'
import FetchBlogs from '../data/FetchBlogs'

import { BlogTagStyle } from './BlogTagStyle.styles'
import ImgNameDate from './imgNameDate'
import LikesCom from './LikesCom'

import Link from 'next/link'
import HeadingDescSB from './singleBlogComponents/HeadingDescSB'
import { useQuery } from '@tanstack/react-query'
import { Axios } from '@/request/request'
import { Blog, Categories, Like } from '@prisma/client'
import moment from 'moment'


function HeroSection() {
  const {data: currentBlog} = useQuery({
    queryKey: ['editorPick'],
    queryFn: async () => {
      const req = await Axios.get('/blog/editor')
      return req.data.blog as Blog & {categories: Partial<Categories>, likes: Like[], comment: Comment[]}
    }
  })

  console.log(currentBlog)
  if(!currentBlog) return null


  return (
    <div className="relative pt-10 md:py-12 lg:pb-10">
      {/* Heading(Head and Paragraph) */}
      <HeadingDescSB
        heading="Editor's Pick"
        description="Discover outstanding articles, Insights and Inspiration"
      />

      <div className="imgWrapper flex m:pt-0 items-start sm:mb-5 relative  flex-col md:flex-row justify-end ">
        {/* Image */}
        <div
          className="bg-black w-full md:w-4/5 lg:w-2/3  bg-center bg-no-repeat bg-cover"
          style={{
            height: '450px',
            borderRadius: '20px',
            background: `url(${currentBlog?.banner})`,
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
              text={currentBlog.categories.title!}
              tag_link="#"
              hover_text_color="white"
            />

            <h2 className="text-base sm:text-xl lg:text-2xl font-semibold ">
              <Link href={`blog/${currentBlog.id}`} className="z-2 ">
                {currentBlog.title}
              </Link>
            </h2>

            <ImgNameDate
              authName={'Tayture'}
              date={moment(currentBlog.createdAt).format('MMMM DD, YYYY')}
              enableDash={false}
              isColumn={true}
              bg_color="black"
              authImgCont_wi_hei="2.5rem"
              is_image={false}
            />

            <LikesCom
              likes_num={`${currentBlog.likes.length}`}
              comments_num={`${currentBlog.comment.length}`}
              bg_color="rgba(249,250,251)"
            />
          </div>

          {/* Back and Next Btn Cont */}
          {/* <div className="p-4 sm:pt-8 sm:px-10 z-20">
            <div className="NextPrev relative flex items-center text-slate-500">
              <button
                className={`${
                  activate ? 'border-2' : ''
                } w-11 h-11 text-xl mr-2 border-orange rounded-full flex items-center justify-center text-neutral-500 transition-all`}
                onMouseOver={() => updateActivate(true)}
                onClick={prevBlog}
              >
                <HiArrowLongLeft className="w-5 h-5" />
              </button>
              <button
                className={`${
                  activate ? '' : 'border-2'
                } w-11 h-11 text-xl  border-orange rounded-full flex items-center justify-center text-neutral-500 transition-all`}
                onMouseOver={() => updateActivate(false)}
                onClick={nextBlog}
              >
                <HiArrowLongRight className="w-5 h-5" />
              </button>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  )
}

export default HeroSection
