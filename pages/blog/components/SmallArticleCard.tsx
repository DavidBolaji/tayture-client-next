import React from 'react'
import  BlogTagStyle from './BlogTagStyle.styles'
import ImgNameDate from './NameDate'
import LikesCom from './LikesCom'
import { useRouter } from 'next/router'

import styled from '@emotion/styled';
import BlogTag from './BlogTag';


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

interface SmallArticleCardProps {
  tag_text: string
  tag_bg_color: string
  tag_text_color: string
  tag_hover_bg_color: string
  tag_hover_text_color: string
  heading_text: string
  description?: string
  ImgNameDate_bg_color: string
  authImgCont_wi_hei: string
  likes_num: number
  comments_num: string
  likesCom_bg_color: string
  img_src: string
  alt_img: string
  is_bg_border: boolean
  is_description: boolean
  authImgCont_is_image: boolean
  authImgCont_imageSrc?: string
  authImgCont_altImage?: string
  blog_id: string
  date?: string
}

const SmallArticleCard = ({
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
  is_bg_border,
  is_description,
  description,
  authImgCont_is_image,
  authImgCont_imageSrc,
  authImgCont_altImage,
  date,
  blog_id,
}: SmallArticleCardProps) => {
  const router = useRouter()
  return (
    <div
      className={`SmallArticleCard relative flex group flex-row items-center sm:p-4 sm:rounded-3xl  border-neutral-200 h-full ${
        is_bg_border ? 'sm:bg-white sm:border' : ''
      }`}
    >
      <div onClick={async () => {
        // await Axios.put(`/blog/click/${blog_id}`)
        router.push(`/blog/${blog_id}`)
        }}   className="absolute inset-0 z-11"></div>
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
          <a className="block">
            <h2 className="block font-medium sm:font-semibold text-neutral-900 text-sm sm:text-base xl:text-lg">
              <span className="line-clamp-2">{heading_text}</span>
            </h2>
            {is_description && (
              <h2 className="block text-neutral-500 text-sm sm:block sm:mt-2 leading-relaxed">
                <span className="line-clamp-2">{description}</span>
              </h2>
            )}
          </a>
          <ImgNameDate
            authName="Tayture"
            date={date}
            enableDash={false}
            isColumn={true}
            bg_color={ImgNameDate_bg_color}
            authImgCont_wi_hei={authImgCont_wi_hei}
            is_image={authImgCont_is_image}
            imageSrc={authImgCont_imageSrc}
            altImage={authImgCont_altImage}
          />
        </div>
        {/* likes and comment */}
        <div className="flex items-center flex-wrap justify-between mt-auto">
          <LikesCom
            likes_num={likes_num}
            comments_num={comments_num}
            bg_color={likesCom_bg_color}
            hover={false}
          />
        </div>
      </div>
      <a
        href="#"
        className="block relative flex-shrink-0 w-24 h-24 sm:w-52 sm:h-full ml-3 sm:ml-5 rounded-2xl overflow-hidden z-0"
      >
        <img
          src={img_src}
          alt={alt_img}
          className="object-cover absolute inset-0 w-full h-full"
          sizes="(max-width: 600px) 180px, 400px"
        />
      </a>
    </div>
  )
}

export default SmallArticleCard
