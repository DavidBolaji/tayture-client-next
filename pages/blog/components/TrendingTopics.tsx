import React from 'react'
import SectionCont from './helpers/SectionCont'
import HeadingDesc from './HeadingDesc'
import CategoriesSection2 from './CategoriesSection2'

function TrendingTopics() {
  return (
    <SectionCont bg_color="bg-[rgb(242,242,242)]" class_name="mt-12 pb-16">
      {/* Header Section 2 */}
      <HeadingDesc
        heading="Top trending topics"
        description="Discover 233 topics"
      />

      {/* Articles Category Card  */}
      <div className="artcilesCatCard">
        <CategoriesSection2 />
      </div>
    </SectionCont>
  )
}

export default TrendingTopics
