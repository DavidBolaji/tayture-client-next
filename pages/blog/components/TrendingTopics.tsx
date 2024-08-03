import React from 'react'
import SectionCont from './helpers/SectionCont'
import HeadingDesc from './HeadingDesc'
import CategoriesSection2 from './CategoriesSection2'
import { Blog, Categories } from '@prisma/client'

const TrendingTopics:React.FC<{
  trending: (Blog & {
    categories: Partial<Categories> & { blog: Blog[] }
  })[]
}>  = ({trending}) => {
  return (
    <SectionCont bg_color="bg-[rgb(242,242,242)]" class_name="mt-12 pb-16">
      {/* Header Section 2 */}
      <HeadingDesc
        heading="Top trending topics"
        description={`Discover ${trending.length} topics`}
      />

      {/* Articles Category Card  */}
      <div className="artcilesCatCard">
        <CategoriesSection2 trending={trending} />
      </div>
    </SectionCont>
  )
}

export default TrendingTopics
