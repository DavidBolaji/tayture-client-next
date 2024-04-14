import React from 'react'
import { BlogTagStyle } from './BlogTagStyle.styles'
import ImgNameDate from './ImgNameDate'
import LikesCom from './LikesCom'

interface SmallArticleCardProps {
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

const SmallArticleCard = ({
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
}: SmallArticleCardProps) => {
  return (
    <div className="SmallArticleCard relative flex group flex-row items-center sm:p-4 sm:rounded-3xl sm:bg-white sm:border border-neutral-200 h-full ">
      <a className="absolute inset-0 z-0" href="#"></a>
      {/* tag heading auth date like comm cont */}
      <div className="flex flex-col flex-grow">
        {/* tag heading auth date cont */}
        <div className="space-y-3 mb-4">
          <div className=" flex flex-wrap space-x-2">
            <BlogTagStyle
              text={tag_text}
              tag_link="#"
              bg_color={tag_bg_color}
              text_color={tag_text_color}
              hover_bg_color={tag_hover_bg_color}
              hover_text_color={tag_hover_text_color}
            />
          </div>
          <h2 className="block font-semibold text-sm sm:text-base">
            <a className="line-clamp-2" href="#">
              {heading_text}
            </a>
          </h2>
          <ImgNameDate
            authName="Tayture"
            date="April 12, 2024"
            enableDash={true}
            isColumn={false}
            bg_color={ImgNameDate_bg_color}
            width_hei={ImgNameDate_width_hei}
          />
        </div>
        {/* likes and comment */}
        <div className="flex items-center flex-wrap justify-between mt-auto">
          <LikesCom
            likes_num={likes_num}
            comments_num={comments_num}
            bg_color={likesCom_bg_color}
          />
        </div>
      </div>
      <a
        href="#"
        className="block relative flex-shrink-0 w-24 h-24 sm:w-40 sm:h-full ml-3 sm:ml-5 rounded-2xl overflow-hidden z-0"
      >
        <img
          src={img_src}
          alt={alt_img}
          className="object-cover w-full h-full object-cover absolute inset-0 w-full h-full"
          sizes="(max-width: 600px) 180px, 400px"
        />
      </a>
    </div>
  )
}

export default SmallArticleCard
