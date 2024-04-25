import React from 'react'
import Wrapper from '@/components/Wrapper/Wrapper'
import LikesCom from './components/LikesCom'
import BackNext from './components/BackNext'
import HomeLayout from '@/components/layouts/HomeLayout'
import { BlogTagStyle } from './components/BlogTagStyle.styles'
import { Footer } from '@/components/Footer'
import SectionCont from './components/helpers/SectionCont'
import HeadingDesc from './components/HeadingDesc'
import SmallArticleCard from './components/SmallArticleCard'
import WidgetHeading from './components/WidgetHeading'
import WidgetTags from './components/WidgetTags'
import PopularPostCard from './components/PopularPostCard'
import TrendingTopic from './components/TrendingTopic'
import Pagination from './components/Pagination'
import ImgNameDate from './components/ImgNameDate'
import TrendingTopics from './components/TrendingTopics'
import MustRead from './components/MustRead'
import K12Section from './components/K12Section'
import LatestArcticlesSection from './components/LatestArcticlesSection'
import SingleBlogTemplate from './[blogId]'
import SingleCategoryTemplate from './components/singleCategoryTemplateComponents/SingleCategoryTemplate'
import NewsletterSection from './components/Newsletter/NewsletterSection'
import { FaSearch } from 'react-icons/fa'
import InputWithIcon from './components/Newsletter/InputWithIcon'
import HeroSection from './components/HeroSection'

const Blog = () => {
  return (
    <>
      <div className="bg-blog_bg overflow-auto h-[99vh]">
        <div className="bg-blog_bg">
          <Wrapper>
            {/* Search */}
            <InputWithIcon Search_Arrow="Search" is_sm={true} />

            {/* Hero */}
            <HeroSection />

            {/* Section 2 */}
            <TrendingTopics />

            {/* Section 3  K12_centered*/}
            <K12Section />

            {/* Section 4 */}
            <MustRead />

            {/* Section 5 Latest Articels*/}
            <LatestArcticlesSection />

            <NewsletterSection />
          </Wrapper>

          <Footer />
        </div>
      </div>
    </>
  )
}

Blog.getLayout = function getLayout(page: React.ReactNode) {
  return <HomeLayout>{page}</HomeLayout>
}

export default Blog
