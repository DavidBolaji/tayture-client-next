import React from 'react'
import { BlogTagStyle } from './BlogTagStyle.styles'
import ImgNameDate from './ImgNameDate'
import LikesCom from './LikesCom'

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
  likes_num: string 
  comments_num: string  
  likesCom_bg_color: string
  ImgNameDate_width_hei: string
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
  ImgNameDate_width_hei,
}: MainArticleCardProps) => {
  return (
    <div className="group relative flex flex-col h-full">
      <div className="ImgCont block flex-shrink-0 flex-grow relative w-full h-0 pt-[75%] sm:pt-[55%] z-0">
        <img
          sizes="(max-width: 600px) 480px, 800px"
          src={img_src}
          className="object-cover rounded-3xl object-cover absolute inset-0 w-full h-full"
          alt={alt_img}
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
          date="April 12, 2024"
          enableDash= {true}
          isColumn= {false}
          bg_color="yellow"
          width_hei = {ImgNameDate_width_hei}
        />

        <h2 className="block font-semibold text-neutral-900 text-base sm:text-lg md:text-xl mt-4">
          <a
            className="line-clamp-2"
            title="Microsoft announces a five-year commitment to create bigger opportunities for people with disabilities"
            href="/single/this-is-single-slug"
          >
            {article_heading}
          </a>
        </h2>
        <span className="block text-neutral-500 text-[15px] leading-6  mt-4">
          {article_description}
        </span>
      </div>

      {/* Horizontal line */}
      <div className="my-5 border-t border-neutral-200 dark:border-neutral-700"></div>

      {/* Likes and Comment */}
      <LikesCom likes_num={likes_num} comments_num={comments_num} bg_color={likesCom_bg_color}/>
    </div>
  )
}

export default MainArticleCard
