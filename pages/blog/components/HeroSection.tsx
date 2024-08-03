import React from 'react'

import ImgNameDate from './ImgNameDate'
import LikesCom from './LikesCom'
import Link from 'next/link'
import HeadingDescSB from './singleBlogComponents/HeadingDescSB'
import { Blog, Categories, Like } from '@prisma/client'
import moment from 'moment'

import styled from '@emotion/styled'
import BlogTag from './BlogTag'


type Props = {
  bg_color?: string
  text_color?: string
  hover_bg_color?: string
  hover_text_color?: string
}

export const BlogTagStyle = styled(BlogTag)<Props>`
  & {
    background-color: ${({bg_color}) => '#000' };
    color: ${({ text_color }) => '#FFF'};
    z-index: 11;
    border-radius: 10px;
    font-size: 0.75rem;
    font-weight: 500;
    line-height: 1rem;
    padding-block: 0.25rem;
    padding-inline: 0.625rem;
    transition-duration: 0.3s;
    transition-property: color background-color border-color
      text-decoration-color fill stroke;
  }

  &:hover {
    background-color: ${({ hover_bg_color }) => hover_bg_color ? hover_bg_color : '#EAB308'};
    color: ${({ hover_text_color }) => hover_text_color ? hover_text_color : '#FEF9C3'};
  }
`

const HeroSection: React.FC<{
  editor: Blog & {
    categories: Partial<Categories>
    likes: Like[]
    comment: Comment[]
  }
}> = ({ editor }) => {
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
            background: `url(${editor?.banner})`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundColor: 'grey'
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
              text={editor.categories.title!}
              tag_link="#"
              hover_text_color="white"
            />

            <h2 className="text-base sm:text-xl lg:text-2xl font-semibold ">
              <Link href={`blog/${editor.id}`} className="z-2 ">
                {editor.title}
              </Link>
            </h2>

            <ImgNameDate
              authName={'Tayture'}
              date={moment(editor.createdAt).format('MMMM DD, YYYY')}
              enableDash={false}
              isColumn={true}
              bg_color="black"
              authImgCont_wi_hei="2.5rem"
              is_image={false}
            />

            <LikesCom
              likes_num={editor.likes.length}
              comments_num={`${editor.comment.length}`}
              bg_color="rgba(249,250,251)"
              hover={false}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeroSection
