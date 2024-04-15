import React from 'react'
import ImgNameDate from './ImgNameDate'

interface TrendingTopicProps {
  topic_bg_color: string;
  category: string;
  no_articles: string;
}

function TrendingTopic({
  topic_bg_color,
  category,
  no_articles,
}: TrendingTopicProps) {
  return (
    <a
      href="#"
      className="flex items-center p-4 xl:p-5 hover:bg-neutral-200 dark:hover:bg-neutral-700"
    >
      {/* Img */}
      <ImgNameDate
        authImgCont_wi_hei="2.7rem"
        bg_color={topic_bg_color}
        authName={category}
        date={no_articles}
        isColumn={true}
        enableDash={false}
      />
    </a>
  )
}

export default TrendingTopic
