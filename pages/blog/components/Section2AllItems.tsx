import React, { useEffect, useRef, useState } from 'react'
import MainArticleCard from './MainArticleCard'
import SmallArticleCard from './SmallArticleCard'
import SectionCont from './helpers/SectionCont'
import HeadingDesc from './HeadingDesc'
import NavItem from './NavItem'
import Pagination from './Pagination'
import { useQuery } from '@tanstack/react-query'
import { Axios } from '@/request/request'
import { Blog, Categories, Comment, Like } from '@prisma/client'
import { getRandomColor2 } from '@/utils/helpers'
import moment from 'moment'
import useInsightHook from '../hooks/useInsightHook'

const PostsPerPage = 4
const cList = [
  '#FF5733',
  '#33FF57',
  '#5733FF',
  '#FF33E9',
  '#33E9FF',
  '#E9FF33',
  '#333333',
  '#000000',
]
const txt = '#fff'

function Section2AllItems() {
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const { handleButtonClick, categories, activeButton } = useInsightHook()
 
  const divRef = useRef<null | HTMLDivElement>(null)

  const { data, isLoading, isError } = useQuery({
    queryKey: ['insightBlog', currentPage, activeButton],
    queryFn: async () => {
      const response = await Axios.get(`/blog/all?page=${currentPage}&categoryId=${activeButton}`)
      setTotalPages(response.data.totalPages)
      return response.data
    },
  })

  const handlePageChange = (pageNumber: number) => {
    divRef.current?.scrollIntoView({
      behavior: 'smooth'
    })
    setCurrentPage(pageNumber)
  }

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error fetching data</div>

  const startIndex = (currentPage - 1) * 4
  const endIndex = startIndex + PostsPerPage

  const blogs = data?.blogs ?? []


  return (
    <SectionCont bg_color="none">
      <div className="flex flex-col mb-8 relative" ref={divRef}>
        {/* Heading */}
        <HeadingDesc
          heading="Insightful Articles"
          description="Explore tailored solutions for administrators, teachers, students, and parents, empowering every stakeholder in the K-12 education journey."
        />

        {/* Buttons for Categories */}
        <div className="flex justify-between">
          <nav className="relative flex w-full overflow-x-auto text-sm md:text-base">
            <NavItem
            activeButton={activeButton}
            handleClick={handleButtonClick}
            categories={categories!}
            />
          </nav>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 md:min-h-44">
        {blogs.map(
          (
            blog: Blog & { categories: Categories } & { likes: Like[] } & {
              comment: Comment[]
            },
            idx: number,
          ) =>
            idx === endIndex - 1 && (
              <MainArticleCard
                key={`${blog.id}`}
                blog_id={blog.id}
                img_src={blog.banner}
                alt_img={blog.title}
                tag_text={blog.categories.title}
                tag_text_color={txt}
                tag_bg_color={getRandomColor2(cList)}
                tag_hover_text_color="white"
                tag_hover_bg_color={getRandomColor2(cList)}
                authImgCont_wi_hei="2.7rem"
                ImgNameDate_bg_color={getRandomColor2(cList)}
                article_heading={blog.title}
                article_description={blog.except}
                likes_num={blog.likes.length}
                comments_num={`${blog?.comment?.length ?? 0}`}
                likesCom_bg_color="rgba(249,250,251)"
                authImgCont_is_image={false}
                date={moment(blog.createdAt).format('MMM DD YYYY')}
              />
            ),
        )}
        <div className="grid gap-6 md:gap-8">
          {blogs.map(
            (
              blog: Blog & { categories: Categories } & { likes: Like[] } & {
                comment: Comment[]
              },
              idx: number,
            ) =>
              idx !== endIndex - 1 && (
                <SmallArticleCard
                  key={`${blog.id}`}
                  blog_id={blog.id}
                  tag_text={blog.categories.title}
                  tag_text_color={txt}
                  tag_bg_color={getRandomColor2(cList)}
                  tag_hover_text_color="white"
                  tag_hover_bg_color={getRandomColor2(cList)}
                  heading_text={blog.title}
                  ImgNameDate_bg_color={getRandomColor2(cList)}
                  authImgCont_wi_hei="1.75rem"
                  likes_num={blog.likes?.length ?? 0}
                  comments_num={`${blog?.comment?.length ?? 0}`}
                  likesCom_bg_color="rgba(249,250,251)"
                  img_src={blog.banner}
                  alt_img={blog.title}
                  is_bg_border={true}
                  is_description={false}
                  authImgCont_is_image={false}
                  date={moment(blog.createdAt).format('MMM DD YYYY')}
                />
              ),
          )}
        </div>
      </div>

      <div className="w-full flex justify-center items-center pt-16 mb-3">
        <Pagination
          total_pages={totalPages}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
    </SectionCont>
  )
}

export default Section2AllItems
