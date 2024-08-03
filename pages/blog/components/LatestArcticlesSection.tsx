import React from 'react'
import SectionCont from './helpers/SectionCont'
import LatestArticleLeft from './LatestArticleLeft'
import LatestArticleRight from './LatestArticleRight'

function LatestArcticlesSection() {
  return (
    <SectionCont bg_color="none">
      <div className="flex flex-col lg:flex-row">
        {/* left */}
        <LatestArticleLeft  />
        <LatestArticleRight />
      </div>
    </SectionCont>
  )
}

export default LatestArcticlesSection
