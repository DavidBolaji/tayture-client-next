import React from 'react'
import styled from 'styled-components'
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
}

const ArticlesCatCardCont = styled.div<ArticlesCatCardProps>`
  & {
    width: calc(20%);
  }

  @media (max-width:1024px){
    & {
      width: calc(33.3333%)
    }
  }

  @media (max-width:499px){
    & {
      width: calc(50%)
    }
  }
`

const ImgCont = styled.div<ArticlesCatCardProps>`
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
}: ArticlesCatCardProps) => {
  return (
    <ArticlesCatCardCont className="relative inline-block px-2 xl:px-4 whitespace-normal">
      <a className="flex flex-col">
        {/* Image and Rank Cont */}
        <div className="flex-shrink-0 relative w-full  aspect-w-7 aspect-h-5 overflow-hidden rounded-3xl overflow-hidden group">
          <ImgCont
            bg_image_url={bg_image_url}
            className="bg-cover object-cover rounded-2xl w-full p-[0.75rem]"
          >
            <BlogTagStyle
              text={rank}
              bg_color={bg_color_rank}
              text_color={text_color_rank}
              //   hover_bg_color="rgb(133 77 14)"
              //   hover_text_color="white"
            />
          </ImgCont>
        </div>

        {/* Category total articles color */}
        <ImgNameDate
          authName={category}
          // altImage="tayture"
          // image
          date={totalCatArticles}
          enableDash={false}
          isColumn={true}
          bg_color={categoryColor}
        />
      </a>
    </ArticlesCatCardCont>
  )
}

export default ArticlesCatCard
