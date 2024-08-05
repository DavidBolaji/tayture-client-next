import React from 'react'
import FetchBlogs from '../data/FetchBlogs'
import SectionCont from './helpers/SectionCont'
import HeadingDesc from './HeadingDesc'
import NavItem from './NavItem'
import { HiOutlineArrowRight } from 'react-icons/hi'
import MainArticleCard from './MainArticleCard'
import SmallArticleCardVertical from './SmallArticleCardVertical'

function MustRead() {
  const blogs = FetchBlogs()
  const mustReadBlogs = blogs.filter((blog) => blog.is_must_read)

  // Separate mustReadBlogs into centered and left/right posts
  const centeredPost = mustReadBlogs.find((blog) => blog.is_main_article)
  const leftRightPosts = mustReadBlogs.filter((blog) => !blog.is_main_article)

  return (
    <SectionCont bg_color="bg-[rgb(242,242,242)]" class_name="mb-12">
      {/* Heading and Navigation */}
      <div className="flex flex-col mb-8 relative">
        <HeadingDesc
          heading="Must Read"
          description="Discover indispensable articles offering crucial insights and expert advice tailored to administrators, educators, students, and parents."
        />
        <div className="flex justify-between">
          <nav className="relative flex w-full overflow-x-auto text-sm md:text-base">
            <NavItem
            activeButton={''}
            handleClick={() => {}}
            categories={[]}
            />
          </nav>
          <button className="flex-shrink-0 relative h-12 items-center justify-center rounded-full transition-colors border-transparentbg-black_200 hover:bg-orange bg-black_200  text-white text-sm sm:text-base font-medium px-6 hidden md:!flex ">
            <span>View all</span>
            <HiOutlineArrowRight className="w-6 h-5 ml-3" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {/* left */}
        <div className="grid gap-6">
          {leftRightPosts.slice(0, 2).map((leftBlog) => (
            <SmallArticleCardVertical
              key={`${leftBlog.id}`}
              blog_id={leftBlog.id}
              tag_text={leftBlog.category}
              tag_text_color={leftBlog.category_text_hoverBg_color}
              tag_bg_color={leftBlog.category_bg_color}
              tag_hover_text_color="white"
              tag_hover_bg_color={leftBlog.category_text_hoverBg_color}
              heading_text={leftBlog.title}
              ImgNameDate_bg_color={leftBlog.category_text_hoverBg_color}
              authImgCont_wi_hei="1.75rem"
              likes_num={leftBlog.likes}
              comments_num={`${leftBlog.comments}`}
              likesCom_bg_color="rgba(249,250,251)"
              img_src={leftBlog.hor_image_src}
              alt_img="Lorem ipsum"
              authImgCont_is_image={false}
              date={new Date().toISOString()}
            />
          ))}
        </div>
        {/* center */}
        <div className="lg:col-span-2">
          {centeredPost && (
            <MainArticleCard
              key={`${centeredPost.id}`}
              blog_id={centeredPost.id}
              img_src={centeredPost.hor_image_src}
              alt_img="Lorem ipsum"
              tag_text={centeredPost.category}
              tag_text_color={centeredPost.category_text_hoverBg_color}
              tag_bg_color={centeredPost.category_bg_color}
              tag_hover_text_color="white"
              tag_hover_bg_color={centeredPost.category_text_hoverBg_color}
              authImgCont_wi_hei="2.7rem"
              ImgNameDate_bg_color={centeredPost.category_text_hoverBg_color}
              article_heading={centeredPost.title}
              article_description={centeredPost.content}
              likes_num={centeredPost.likes}
              comments_num={`${centeredPost.comments}`}
              likesCom_bg_color="rgba(249,250,251)"
              authImgCont_is_image={false}
              date={new Date().toISOString()}
            />
          )}
        </div>
        {/* right */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-1 md:col-span-3 xl:col-span-1">
          {leftRightPosts.slice(2, 4).map((leftBlog) => (
            <SmallArticleCardVertical
              key={`${leftBlog.id}`}
              blog_id={leftBlog.id}
              tag_text={leftBlog.category}
              tag_text_color={leftBlog.category_text_hoverBg_color}
              tag_bg_color={leftBlog.category_bg_color}
              tag_hover_text_color="white"
              tag_hover_bg_color={leftBlog.category_text_hoverBg_color}
              heading_text={leftBlog.title}
              ImgNameDate_bg_color={leftBlog.category_text_hoverBg_color}
              authImgCont_wi_hei="1.75rem"
              likes_num={leftBlog.likes}
              comments_num={`${leftBlog.comments}`}
              likesCom_bg_color="rgba(249,250,251)"
              img_src={leftBlog.hor_image_src}
              alt_img="Lorem ipsum"
              authImgCont_is_image={false}
              date={new Date().toISOString()}
            />
          ))}
        </div>
      </div>
    </SectionCont>
  )
}

export default MustRead
