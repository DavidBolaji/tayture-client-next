import React, { useState } from 'react'
import FetchBlogs from '../data/FetchBlogs'
import MainArticleCard from './MainArticleCard'
import SmallArticleCard from './SmallArticleCard'
import SectionCont from './helpers/SectionCont'
import HeadingDesc from './HeadingDesc'
import NavItem from './NavItem'
import { HiOutlineArrowRight } from 'react-icons/hi'
import Pagination from './Pagination'

const PostsPerPage = 4;

function Section2AllItems() {
  const allBlogs = FetchBlogs()
  const adminsBlogs = allBlogs.filter(blog => blog.category === 'Admins')
  const educatorsBlogs = allBlogs.filter(blog => blog.category === 'Educators')
  const pupilsBlogs = allBlogs.filter(blog => blog.category === 'Pupils')
  const eventBlogs = allBlogs.filter(blog => blog.category === 'Events')
  const [currentPage, setCurrentPage] = useState(1)

  // Calculate the index range for the current page
  const startIndex = (currentPage - 1) * PostsPerPage
  const endIndex = startIndex + PostsPerPage
  const blogs = allBlogs.slice(startIndex, endIndex)

  const totalPages = Math.ceil(allBlogs.length / PostsPerPage)

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  return (
    //Section 3  K12_centered
    <SectionCont bg_color="none">
      <div className="flex flex-col mb-8 relative">
        {/* Heading */}
        <HeadingDesc
          heading="Insightful Articles"
          description="Explore tailored solutions for administrators, teachers, students, and parents, empowering every stakeholder in the K-12 education journey."
        />

        {/* Buttons for Categories */}
        <div className="flex justify-between">
          <nav className="relative flex w-full overflow-x-auto text-sm md:text-base">
            <NavItem />
          </nav>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
        {blogs.map((blog) =>
          blog.id === endIndex ? (
            <MainArticleCard
              key={`${blog.id}`}
              blog_id={blog.id}
              img_src={blog.hor_image_src}
              alt_img="Lorem ipsum"
              tag_text={blog.category}
              tag_text_color={blog.category_text_hoverBg_color}
              tag_bg_color={blog.category_bg_color}
              tag_hover_text_color="white"
              tag_hover_bg_color={blog.category_text_hoverBg_color}
              authImgCont_wi_hei="2.7rem"
              ImgNameDate_bg_color={blog.category_text_hoverBg_color}
              article_heading={blog.title}
              article_description={blog.content}
              likes_num={`${blog.likes}`}
              comments_num={`${blog.comments}`}
              likesCom_bg_color="rgba(249,250,251)"
              authImgCont_is_image={false}
            />
          ) : (
            ''
          ),
        )}
        <div className="grid gap-6 md:gap-8">
          {blogs.map((blog) =>
            blog.id !== endIndex ? (
              <SmallArticleCard
                key={`${blog.id}`}
                blog_id={blog.id}
                tag_text={blog.category}
                tag_text_color={blog.category_text_hoverBg_color}
                tag_bg_color={blog.category_bg_color}
                tag_hover_text_color="white"
                tag_hover_bg_color={blog.category_text_hoverBg_color}
                heading_text={blog.title}
                ImgNameDate_bg_color={blog.category_text_hoverBg_color}
                authImgCont_wi_hei="1.75rem"
                likes_num={`${blog.likes}`}
                comments_num={`${blog.comments}`}
                likesCom_bg_color="rgba(249,250,251)"
                img_src={blog.ver_image_src}
                alt_img="Lorem ipsum"
                is_bg_border={true}
                is_description={false}
                authImgCont_is_image={false}
              />
            ) : (
              ''
            ),
          )}
        </div>
      </div>

      <div className="w-full flex justify-center items-center pt-16">
        <Pagination total_pages={totalPages} currentPage={currentPage} onPageChange={handlePageChange}/>
      </div>
    </SectionCont>
  )
}

export default Section2AllItems
