import React from 'react'
import  BlogTagStyle from './BlogTagStyle.styles'
import ImgNameDate from './NameDate'
import LikesCom from './LikesCom'
import Image from 'next/image'
import Link from 'next/link'
import { Axios } from '@/request/request'
import { useRouter } from 'next/router'

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

interface MainArticleCardProps {
  img_src: string
  alt_img?: string
  tag_text: string
  tag_bg_color: string
  tag_text_color: string
  tag_hover_bg_color: string
  tag_hover_text_color: string
  article_heading: string
  article_description: string
  likes_num: number
  comments_num: string  
  likesCom_bg_color: string
  authImgCont_wi_hei: string
  ImgNameDate_bg_color:string
  authImgCont_is_image: boolean
  authImgCont_imageSrc?: string
  authImgCont_altImage?: string
  blog_id:string | number
  date: string
}

const MainArticleCard = ({
  img_src,
  alt_img,
  tag_text,
  tag_bg_color,
  tag_text_color,
  tag_hover_bg_color,
  tag_hover_text_color,
  article_heading,
  article_description,
  likes_num,
  comments_num,
  likesCom_bg_color,
  authImgCont_wi_hei,
  ImgNameDate_bg_color,
  authImgCont_is_image,
  authImgCont_imageSrc,
  authImgCont_altImage,
  blog_id,
  date
}: MainArticleCardProps) => {
  const router = useRouter()
  return (
    <div className="group relative flex flex-col h-full">
       <div onClick={async () => {
        await Axios.put(`/blog/click/${blog_id}`)
        router.push(`/blog/${blog_id}`)
        }}   className="absolute inset-0 z-11"></div>
      {/* <Link href={`/blog/${blog_id}`} className='absolute inset-0 z-10'></Link> */}
      <div className="ImgCont block flex-shrink-0 flex-grow relative w-full h-0 pt-[75%] sm:pt-[55%] z-1">
        <Image
          sizes="(max-width: 600px) 480px, 800px"
          width={400}
          height={400}
          src={img_src}
          className="object-cover rounded-3xl absolute inset-0 z-1 w-full h-full"
          alt={alt_img!}
        />
        <BlogTagStyle
          text={tag_text}
          bg_color={tag_bg_color}
          text_color={tag_text_color}
          hover_bg_color={tag_hover_bg_color}
          hover_text_color={tag_hover_text_color}
          className="flex flex-wrap space-x-2 absolute top-3 left-3"
        />
      </div>

      {/* Heading Description hr likes, comment container */}
      <div className="mt-5 px-4 flex flex-col">
        <ImgNameDate
          authName="Tayture"
          date={date}
          enableDash= {true}
          isColumn= {false}
          bg_color={ImgNameDate_bg_color}
          authImgCont_wi_hei = {authImgCont_wi_hei}
          is_image={authImgCont_is_image}
          imageSrc={authImgCont_imageSrc}
          altImage={authImgCont_altImage}
          
        />

        <h2 className="block font-semibold text-neutral-900 text-base sm:text-lg md:text-xl mt-4">
          <a
            className="line-clamp-2"
            href="#"
          >
            {article_heading}
          </a>
        </h2>
        <span className=" text-neutral-500 text-[15px] leading-6  mt-4 line-clamp-5">
          {article_description}
        </span>
      </div>

      {/* Horizontal line */}
      <div className="my-5 border-t border-neutral-200 dark:border-neutral-700"></div>

      {/* Likes and Comment */}
      <LikesCom likes_num={likes_num} comments_num={comments_num} bg_color={likesCom_bg_color} hover={false} />
    </div>
  )
}

export default MainArticleCard
