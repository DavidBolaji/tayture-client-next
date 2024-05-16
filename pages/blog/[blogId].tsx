import React from 'react'
import { BlogTagStyle } from './components/BlogTagStyle.styles'
import HeadingDescSB from './components/singleBlogComponents/HeadingDescSB'

import Wrapper from '@/components/Wrapper/Wrapper'

import HomeLayout from '@/components/layouts/HomeLayout'
import NewsletterSection from './components/Newsletter/NewsletterSection'
import { Footer } from '@/components/Footer'
import Image from 'next/image'
import { Axios } from '@/request/request'
import { Blog, Categories, Like } from '@prisma/client'
import { getRandomColor } from '@/utils/helpers'
import ImgNameDate from './components/ImgNameDate'
import moment from 'moment'
import RenderText from './components/RenderText'
import CategoriesSection from './sections/CategoriesSection'
import AllBlogSection from './sections/AllBlogSection'
import Meta from '../dashboard/profile/components/Meta'
import CommentSection from './sections/CommentSection'
import BlogLikeComponent from './sections/BlogLikeComponent'


function SingleBlogTemplate({
  blog,
  blogs,
  categories,
  total_pages,
  currentPage,
}: {
  blog: Blog & { categories: Categories } & { likes: Like[] } & {
    comment: Comment[]
  }
  blogs: (Blog & { categories: Categories } & { likes: Like[] } & {
    comment: Comment[]
  })[]
  categories: Categories[]
  total_pages: number
  currentPage: number
}) {
 

  return (
    <>
     <Meta
        imageUrl={blog.banner}
        title={blog.title}
        desc={blog.except}
      />
    <div className="bg-blog_bg h-[90vh] overflow-y-scroll no-s" id="sb">
      <div className="bg-blog_bg">
        <Wrapper>
          {/* Header and Image Cont */}
          <div className="SingleBlog pt-8 lg:pt-16">
            <header className="rounded-xl">
              <div className="max-w-screen-md mx-auto">
                <div>
                  {/* Container for the Heading section */}
                  <div className="space-y-5">
                    {/* Tag */}
                    <div className="nc-CategoryBadgeList flex flex-wrap space-x-2">
                      <BlogTagStyle
                        text={blog?.categories.title}
                        tag_link="#"
                        bg_color={getRandomColor()}
                        text_color={'#fff'}
                        hover_bg_color={getRandomColor()}
                        hover_text_color="white"
                      />
                    </div>

                    {/* Heading and description */}
                    <HeadingDescSB
                      heading={blog.title}
                      description={blog?.except}
                    />

                    {/* Horizontal */}
                    <div className="w-full border-b border-neutral-200 dark:border-neutral-700"></div>

                    {/* Img auth date, likes and comm*/}
                    <div className="flex flex-col sm:flex-row justify-between sm:items-end space-y-5 sm:space-y-0 sm:space-x-5">
                      {/* Img auth date */}
                      <ImgNameDate
                        authName="Tayture"
                        date={moment(blog.createdAt).format('MMM DD YYYY')}
                        enableDash={false}
                        isColumn={true}
                        bg_color="#EAB308"
                        authImgCont_wi_hei="2.7rem"
                        is_image={false}
                      />

                      {/* Lkes and Com num */}
                      <div className="flex flex-row mx-2.5 items-center">
                        <BlogLikeComponent blog={blog} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </header>

            {/* Image Container */}
            <div className="container my-10 sm:my-12">
              <Image
                priority
                src={blog.banner}
                width="1060"
                height="750"
                alt="single"
                sizes="(max-width: 1024px) 100vw, 1280px"
                className="w-full rounded-xl"
              />
            </div>
          </div>

          <div className="container mt-10"></div>

          {/* Content Categories and Comment Section */}
          <div className="relative">
            <div className="prose lg:prose-lg !max-w-screen-md mx-auto text-base font-thin leading-loose   ">
              <p className="py-5">
                <RenderText text={blog.text} />
              </p>
            </div>

            <div className="flex flex-col sm:flex-row justify-between sm:items-end space-y-5 sm:space-y-0 sm:space-x-5 mb-10 max-w-screen-md mx-auto bg-neutral-200 rounded-xl p-4">
              {/* Img auth date */}
              <ImgNameDate
                authName="Tayture"
                date={moment(blog.createdAt).format('MMM DD YYYY')}
                enableDash={false}
                isColumn={true}
                bg_color="#EAB308"
                authImgCont_wi_hei="2.7rem"
                is_image={false}
              />

              {/* Lkes and Com num */}
              <div className="flex flex-row mx-2.5 items-center">
              <BlogLikeComponent blog={blog} />
              </div>
            </div>

            <div className="max-w-screen-md mx-auto flex flex-wrap mt-4">
              <CategoriesSection categories={categories} />
            </div>

            {/* HR */}
            <div className="max-w-screen-md mx-auto border-b border-t border-neutral-200  my-10"></div>

            <CommentSection />
          </div>

          <AllBlogSection 
           blogs={blogs} 
           total_pages={total_pages}
           currentPage={currentPage}
           />

          {/* <NewsletterSection /> */}
        </Wrapper>

        <Footer />
      </div>
    </div>
    </>
  )
}

export const getServerSideProps = async (ctx: any) => {
  const blogId = ctx.params.blogId
  const page = ctx.query.page || 1

  const req = Axios.get(`/blog/${blogId}?page=${page}`)
  const req2 = await Axios.get(`/categories`)

  const [res, res2] = await Promise.all([req, req2])

  const blog = res.data.blog
  const blogs = res.data.blogs
  const total_pages = res.data.total_pages
  const currentPage = res.data.currentPage
  const categories = res2.data.category

  return { props: { blog, blogs, categories, total_pages, currentPage } }
}

SingleBlogTemplate.getLayout = function getLayout(page: React.ReactNode) {
  return <HomeLayout>{page}</HomeLayout>
}

export default SingleBlogTemplate
