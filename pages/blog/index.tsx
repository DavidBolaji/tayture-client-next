import React from 'react'
import Wrapper from '@/components/Wrapper/Wrapper'
import HomeLayout from '@/components/layouts/HomeLayout'
import { Footer } from '@/components/Footer'
import TrendingTopics from './components/TrendingTopics'
import NewsletterSection from './components/Newsletter/NewsletterSection'
import InputWithIcon from './components/Newsletter/InputWithIcon'
import HeroSection from './components/HeroSection'
import Section2AllItems from './components/Section2AllItems'

const Blog = () => {
  return (
    <>
      <div className="bg-blog_bg h-[90vh] overflow-y-scroll no-s">
        <div className="bg-blog_bg ">
          <Wrapper>
            {/* Search */}
            <InputWithIcon Search_Arrow="Search" is_sm={true} placeholder = 'Search Blog'/>

            {/* Hero */}
            <HeroSection />

            {/* Section 2 */}
            <TrendingTopics />

            {/* Section 3  K12_centered*/}
            <Section2AllItems />

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
