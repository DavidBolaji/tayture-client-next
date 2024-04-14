import React from 'react'
import { BlogTagStyle } from './BlogTagStyle.styles'
import ImgNameDate from './ImgNameDate'
import LikesCom from './LikesCom'

interface SmallArticleCardVerticalProps {
  tag_text: string
  tag_bg_color: string
  tag_text_color: string
  tag_hover_bg_color: string
  tag_hover_text_color: string
  heading_text: string
  ImgNameDate_bg_color: string
  ImgNameDate_width_hei: string
  likes_num: string
  comments_num: string
  likesCom_bg_color: string
  img_src: string
  alt_img: string
}

const SmallArticleCardVertical = ({
  tag_text,
  tag_bg_color,
  tag_text_color,
  tag_hover_bg_color,
  tag_hover_text_color,
  heading_text,
  ImgNameDate_bg_color,
  ImgNameDate_width_hei,
  likes_num,
  comments_num,
  likesCom_bg_color,
  img_src,
  alt_img,
}: SmallArticleCardVerticalProps) => {
  return (
    <div className="SmallArticleCardVertical relative flex flex-col group rounded-3xl overflow-hidden bg-white dark:bg-neutral-900 h-full">
      {/* image */}
      <div className="block flex-shrink-0 relative w-full rounded-t-3xl overflow-hidden z-10 aspect-w-5 aspect-h-3">
        <div>
        <a
          href="#"
          className="block relative rounded-2xl overflow-hidden z-0  w-full h-full"
        >
          <img
            src={img_src}
            alt={alt_img}
            className="object-cover object-cover absolute inset-0 w-full h-full"
            sizes="(max-width: 600px) 480px, 800px"
          />
        </a>
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
            date="April 12, 2024"
            enableDash={true}
            isColumn={false}
            bg_color={ImgNameDate_bg_color}
            width_hei={ImgNameDate_width_hei}
          />
        </div>
        {/* tag heading auth date cont */}

        <h2 className="block text-base font-semibold text-neutral-900 dark:text-neutral-100">
          <a className="line-clamp-2" href="#">
            {heading_text}
          </a>
        </h2>
        {/* likes and comment */}
        <div className="flex items-end justify-between mt-auto">
          <LikesCom
            likes_num={likes_num}
            comments_num={comments_num}
            bg_color={likesCom_bg_color}
          />
        </div>
      </div>
    </div>
  )
}

export default SmallArticleCardVertical
