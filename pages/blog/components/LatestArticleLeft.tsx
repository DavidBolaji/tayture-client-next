import React, { useState } from 'react';
import HeadingDesc from './HeadingDesc';
import FetchBlogs from '../data/FetchBlogs';
import SmallArticleCard from './SmallArticleCard';
import Pagination from './Pagination';

const PostsPerPage = 5;

function LatestArticleLeft() {
  const allBlogs = FetchBlogs(); // Fetch all blogs from the database
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate the index range for the current page
  const startIndex = (currentPage - 1) * PostsPerPage;
  const endIndex = startIndex + PostsPerPage;
  const blogs = allBlogs.slice(startIndex, endIndex);

  const totalPages = Math.ceil(allBlogs.length / PostsPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to top when changing page
  };

  return (
    <div className="left_cont w-full lg:w-3/5 xl:w-2/3 xl:pr-14">
      <HeadingDesc
        heading="Latest Articles"
        description="Explore our newest articles featuring the latest trends, research findings, and practical tips to stay informed and inspired in this ever-evolving landscape"
      />

      <div className="latest_articles_cont grid gap-6 md:gap-8 ">
        {blogs.map((blog, index: number) => (
          <SmallArticleCard
            key={`${blog.id}`}
            blog_id={blog.id as unknown as string}
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
            img_src={blog.hor_image_src}
            alt_img="Lorem ipsum"
            is_bg_border={false}
            is_description={true}
            description={blog.content}
            authImgCont_is_image={false}
          />
        ))}
      </div>

      {/* Pagination */}
      <div className="flex flex-col mt-12 md:mt-20 space-y-5 sm:space-y-0 sm:space-x-3 sm:flex-row sm:justify-between sm:items-center">
        <Pagination
          currentPage={currentPage}
          total_pages={totalPages}
          onPageChange={handlePageChange}
        />

        <button className="showMoreButton flex-shrink-0 relative h-auto inline-flex items-center justify-center rounded-full transition-colors border-transparent bg-black_200 hover:bg-orange text-white text-sm sm:text-base font-medium py-3 px-4 sm:py-3.5 sm:px-6  ">
          Show me more.
        </button>
      </div>
    </div>
  );
}

export default LatestArticleLeft;