import React from 'react'
import styled from '@emotion/styled'
import Image from 'next/image'
import { BlogTagStyle } from './BlogTagStyle.styles'
import ImgNameDate from './ImgNameDate'

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
}: ArticlesCatCardProps) => {
  return (
    <ArticlesCatCardCont className="relative inline-block px-2 xl:px-4 whitespace-normal">
      <a className="flex flex-col">
        {/* Image and Rank Cont */}
        <div className="flex-shrink-0 relative w-full  aspect-w-7 aspect-h-5 rounded-3xl overflow-hidden group">
          <ImgCont
            bg_image_url={bg_image_url}
            className="bg-cover object-cover rounded-2xl w-full p-[0.75rem] "
          >
            <BlogTagStyle
              text={rank}
              bg_color={bg_color_rank}
              text_color={text_color_rank}
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
      </a>
    </ArticlesCatCardCont>
  )
}

export default ArticlesCatCard
