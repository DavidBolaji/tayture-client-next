'use client'
import Wrapper from '@/components/Wrapper/Wrapper'
import React, { useRef, useState } from 'react'
import HeadingDesc from '../components/HeadingDesc'
import { Blog, Categories, Like } from '@prisma/client'
import SmallArticleCardVertical from '../components/SmallArticleCardVertical'
import { getRandomColor } from '@/utils/helpers'
import moment from 'moment'
import Pagination from '../components/Pagination'
import { useQuery } from '@tanstack/react-query'
import { Axios } from '@/request/request'

import Spinner from '@/components/Spinner/Spinner'
import { useParams } from 'next/navigation'

const AllBlogSection = ({}) => {
  const params = useParams()
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  const divRef = useRef<null | HTMLDivElement>(null)
  const { data, isLoading, isError, isPending } = useQuery({
    queryKey: ['moreBlog', currentPage],
    queryFn: async () => {
      const response = await Axios.get(
        `/blog/all?page=${currentPage}&except=${params?.blogId}`,
      )

      setTotalPages(response.data.totalPages)
      return response.data
    },
  })

  const handlePageChange = (pageNumber: number) => {
    divRef.current?.scrollIntoView({
      behavior: 'smooth',
    })
    setCurrentPage(pageNumber)
  }

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error fetching data</div>

  const blogs = data?.blogs ?? []

  return (
    <div
      className="relative bg-neutral-100 py-16 lg:py-28 mt-16 lg:mt-28 rounded-[50px]"
      ref={divRef}
    >
      <Wrapper>
        <div className="relative flex flex-col sm:flex-row sm:items-end justify-between text-neutral-900">
          <HeadingDesc heading="More Posts" description="" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
          {isPending ? (
            <Spinner />
          ) : (
            //@ts-ignore
            blogs?.map(
              (
                blog: Blog & { categories: Categories } & {
                  likes: Like[]
                } & {
                  comment: Comment[]
                },
              ) => (
                <SmallArticleCardVertical
                  key={blog.id}
                  blog_id={blog.id}
                  tag_text={blog.categories.title}
                  tag_text_color={getRandomColor()}
                  tag_bg_color={getRandomColor()}
                  tag_hover_text_color="white"
                  tag_hover_bg_color={getRandomColor()}
                  heading_text={blog.title}
                  ImgNameDate_bg_color={getRandomColor()}
                  authImgCont_wi_hei="1.75rem"
                  likes_num={blog.likes.length}
                  comments_num={`${blog.comment.length}`}
                  likesCom_bg_color="rgba(249,250,251)"
                  img_src={blog.banner}
                  alt_img={blog.title}
                  authImgCont_is_image={false}
                  date={moment(blog.createdAt).format('MMMM DD YYYY')}
                />
              ),
            )
          )}
        </div>

        <div className="w-full flex items-center justify-center mt-20">
          <Pagination
            total_pages={totalPages}
            currentPage={currentPage}
            onPageChange={(page) => handlePageChange(page)}
          />
        </div>
      </Wrapper>
    </div>
  )
}

export default AllBlogSection
