import React from 'react'
import FetchCategories from '../data/FetchCategories'
import ArticlesCatCard from './ArticlesCatCard'

function CategoriesSection2() {
  const categories = FetchCategories()

  return (
    <div className="-mx-2 xl:-mx-4 relative whitespace-nowrap -mx-2 xl:-mx-4 overflow-hidden">
      {categories.map((category) =>
        category.rank !== 0 ? (
          <ArticlesCatCard
            key={`${category.id}`}
            category={category.category}
            totalCatArticles={`${category.tot_articles} Articles`}
            categoryColor={category.category_color}
            bg_image_url={category.image_src}
            authImgCont_wi_hei="2.5rem"
            authImgCont_is_image={false}
            rank={`#${category.rank}`}
            bg_color_rank={category.tag_bg_color}
            text_color_rank={category.category_color}
          />
        ) : (
          <ArticlesCatCard
            key={`${category.id}`}
            category={category.category}
            totalCatArticles={`${category.tot_articles} Articles`}
            categoryColor={category.category_color}
            bg_image_url={category.image_src}
            authImgCont_wi_hei="2.5rem"
            authImgCont_is_image={false}
          />
        )
      )}
    </div>
  )
}

export default CategoriesSection2
