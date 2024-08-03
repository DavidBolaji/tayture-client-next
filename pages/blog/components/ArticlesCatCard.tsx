"use client"
import React from 'react'
import styled from '@emotion/styled'
import Image from 'next/image'

import ImgNameDate from './NameDate'
import { useRouter } from 'next/router'
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

interface ArticlesCatCardProps {
  rank?: string
  bg_color_rank?: string
  text_color_rank?: string
  bg_image_url: string
  category: string
  totalCatArticles: string
  categoryColor: string
  authImgCont_wi_hei: string
  authImgCont_is_image: boolean
  authImgCont_imageSrc?: string
  authImgCont_altImage?: string
  id?: string
}

const ArticlesCatCardCont = styled.div`
  & {
    width: calc(20%);
  }

  @media (max-width: 1024px) {
    & {
      width: calc(33.3333%);
    }
  }

  @media (max-width: 499px) {
    & {
      width: calc(50%);
    }
  }
`

const ImgCont = styled.div<{ bg_image_url: string }>`
  & {
    background: ${({ bg_image_url }) => bg_image_url} no-repeat;
    background-color: rgba(255, 255, 255, 0);
    background-position: center center;
    background-blend-mode: overlay;
    height: 150px;
    background-size: cover;
  }

  &:hover {
    background-color: rgba(255, 255, 255, 0.25);
  }
`

const ArticlesCatCard = ({
  rank,
  bg_color_rank,
  text_color_rank,
  bg_image_url,
  category,
  totalCatArticles,
  categoryColor,
  authImgCont_wi_hei,
  authImgCont_is_image,
  authImgCont_imageSrc,
  authImgCont_altImage,
  id
}: ArticlesCatCardProps) => {
  const router = useRouter()
  return (
    <ArticlesCatCardCont className="relative inline-block px-2 xl:px-4 whitespace-normal">
      <div className="flex flex-col hover:cursor-pointer"
      onClick={() => router.push(`blog/${id}`)}
      >
        {/* Image and Rank Cont */}
        <div className="flex-shrink-0 relative w-full  aspect-w-7 aspect-h-5 rounded-3xl overflow-hidden group">
          <ImgCont
            bg_image_url={bg_image_url}
            className="bg-cover object-cover rounded-2xl w-full p-[0.75rem]  relative"
          >
            <Image
              layout="fill"
              src={bg_image_url}
              alt={category}
              className=""
            />
            <BlogTagStyle
              text={rank}
              bg_color={bg_color_rank}
              text_color={text_color_rank}
              className="absolute"
            />
          </ImgCont>
        </div>

        {/* Category total articles color */}
        <div className="mt-4">
          <ImgNameDate
            authName={category}
            date={totalCatArticles}
            enableDash={false}
            isColumn={true}
            bg_color={categoryColor}
            authImgCont_wi_hei={authImgCont_wi_hei}
            is_image={authImgCont_is_image}
            imageSrc={authImgCont_imageSrc}
            altImage={authImgCont_altImage}
          />
        </div>
      </div>
    </ArticlesCatCardCont>
  )
}

export default ArticlesCatCard
