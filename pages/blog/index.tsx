import React from 'react'
import Wrapper from '@/components/Wrapper/Wrapper'
import HomeLayout from '@/components/layouts/HomeLayout'
import { Footer } from '@/components/Footer'
import TrendingTopics from './components/TrendingTopics'
import NewsletterSection from './components/Newsletter/NewsletterSection'
import InputWithIcon from './components/Newsletter/InputWithIcon'
import HeroSection from './components/HeroSection'
import Section2AllItems from './components/Section2AllItems'
import { Axios } from '@/request/request'
import { Blog as BlogProp, Categories, Like } from '@prisma/client'

const Blog = ({
  editor,
  trending
}: {
  editor: BlogProp & {
    categories: Partial<Categories>
    likes: Like[]
    comment: Comment[]
  },
  trending: (BlogProp & {
    categories: Partial<Categories> & { blog: BlogProp[] }
  })[]
}) => {
  return (
    <>
      <div className="bg-blog_bg h-[90vh] overflow-y-scroll no-s">
        <div className="bg-blog_bg ">
          <Wrapper>
            <InputWithIcon
              Search_Arrow="Search"
              is_sm={true}
              placeholder="Search Blog"
            />
            <HeroSection editor={editor} />
            <TrendingTopics trending={trending} />
            <Section2AllItems />

            {/* <NewsletterSection /> */}
          </Wrapper>

          <Footer />
        </div>
      </div>
    </>
  )
}

export const getServerSideProps = async (ctx: any) => {
  const req = Axios.get('/blog/editor')
  const req2 = Axios.get('/blog/trending')

  const [edit, trend] = await Promise.all([req, req2])
  const editor = edit.data.blog
  const trending = trend.data.blog

  return { props: { editor, trending } }
}

Blog.getLayout = function getLayout(page: React.ReactNode) {
  return <HomeLayout>{page}</HomeLayout>
}

export default Blog
