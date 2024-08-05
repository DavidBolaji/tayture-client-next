'use client'
import React from 'react'
import  BlogTagStyle from './BlogTagStyle.styles'

import LikesCom from './LikesCom'
import Image from 'next/image'
//@ts-ignore
import ImgNameDate from './NameDate'
import { useRouter } from 'next/router'
import { Axios } from '@/request/request'

interface SmallArticleCardVerticalProps {
  tag_text: string
  tag_bg_color: string
  tag_text_color: string
  tag_hover_bg_color: string
  tag_hover_text_color: string
  heading_text: string
  ImgNameDate_bg_color: string
  authImgCont_wi_hei: string
  likes_num: number
  comments_num: string
  likesCom_bg_color: string
  img_src: string
  alt_img: string
  authImgCont_is_image: boolean
  authImgCont_imageSrc?: string
  authImgCont_altImage?: string
  blog_id: string | number
  date: string
}

const SmallArticleCardVertical = ({
  tag_text,
  tag_bg_color,
  tag_text_color,
  tag_hover_bg_color,
  tag_hover_text_color,
  heading_text,
  ImgNameDate_bg_color,
  authImgCont_wi_hei,
  likes_num,
  comments_num,
  likesCom_bg_color,
  img_src,
  alt_img,
  authImgCont_is_image,
  authImgCont_imageSrc,
  authImgCont_altImage,
  blog_id,
  date,
}: SmallArticleCardVerticalProps) => {
  const router = useRouter()
  return (
    <div className="SmallArticleCardVertical relative flex flex-col group rounded-3xl overflow-hidden bg-white dark:bg-neutral-900 h-full cursor-pointer">
      <div
        onClick={async () => {
          const h = document.getElementById('sb')
          h!.scrollTo({
            top: 0,
            behavior: 'smooth',
          })
          // await Axios.put(`/blog/click/${blog_id}`)
          router.push(`/blog/${blog_id}`)
        }}
        className="absolute z-10 inset-0"
      />
      {/* image */}
      <div className="block flex-shrink-0 relative w-full rounded-t-3xl overflow-hidden z-10 aspect-w-5 aspect-h-3">
        <div>
          <div className="block relative rounded-2xl overflow-hidden z-0  w-[300px] h-[200px]">
            <Image
              src={img_src}
              alt={alt_img}
              priority
              layout="fill"
              className="object-cover w-full h-full z-1"
              sizes="(max-width: 600px) 480px, 800px"
            />
          </div>
        </div>
      </div>
      <a className="absolute inset-0 z-0" href="#"></a>

      {/* blog tag */}
      <div className=" absolute top-3 inset-x-3 z-10">
        <BlogTagStyle
          text={tag_text}
          tag_link="#"
          bg_color={tag_bg_color}
          text_color={tag_text_color}
          hover_bg_color={tag_hover_bg_color}
          hover_text_color={tag_hover_text_color}
        />
      </div>

      {/* tag heading auth date like comm cont */}
      <div className="p-4 flex flex-col space-y-3">
        <div className="inline-flex items-center flex-wrap text-neutral-800 dark:text-neutral-200 leading-none text-xs">
          <ImgNameDate
            authName="Tayture"
            date={date}
            enableDash={true}
            isColumn={false}
            bg_color={ImgNameDate_bg_color}
            authImgCont_wi_hei={authImgCont_wi_hei}
            is_image={authImgCont_is_image}
            imageSrc={authImgCont_imageSrc}
            altImage={authImgCont_altImage}
          />
        </div>
        {/* tag heading auth date cont */}

        <h2 className="block text-base font-semibold text-neutral-900 ">
          {heading_text}
        </h2>
        {/* likes and comment */}
        <div className="flex items-end justify-between mt-auto">
          <LikesCom
            likes_num={likes_num}
            comments_num={comments_num}
            bg_color={likesCom_bg_color}
            hover={false}
          />
        </div>
      </div>
    </div>
  )
}

export default SmallArticleCardVertical
