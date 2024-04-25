import React from 'react'
import WidgetHeading from './WidgetHeading'
import WidgetTags from './WidgetTags'
import PopularPostCard from './PopularPostCard'
import TrendingTopic from './TrendingTopic'
import FetchBlogs from '../data/FetchBlogs'

const blogs = FetchBlogs()

function LatestArticleRight() {
  return (
    <div className="right_cont w-full space-y-7 mt-24 lg:mt-0 lg:w-2/5 lg:pl-10 xl:pl-0 xl:w-1/3 ">
      {/* Heading and Tags Container */}
      <div className="rounded-3xl overflow-hidden bg-[rgb(242,242,242)]">
        {/* heading */}
        <WidgetHeading heading_text="Tags" view_all_link="#" />

        {/* Tags Container */}
        <div className="flex flex-wrap p-4 xl:p-5">
          <WidgetTags tag_text="Admins" tag_link="#" />
          <WidgetTags tag_text="Educators" tag_link="#" />
          <WidgetTags tag_text="Pupils" tag_link="#" />
          <WidgetTags tag_text="Parents" tag_link="#" />
          <WidgetTags tag_text="Events" tag_link="#" />
        </div>
      </div>
      {/* Popular posts */}
      <div className="rounded-3xl overflow-hidden bg-[rgb(242,242,242)]">
        <WidgetHeading heading_text="Popular Posts" view_all_link="#" />
        {/* popular post posts cont */}
        <div className="flex flex-col divide-y divide-neutral-200">
          {blogs.map((blog) =>
            blog.is_popular_post ? (
              <PopularPostCard
                key={blog.id}
                blog_id={blog.id}
                popular_post_heading={blog.title}
                popular_post_image={blog.ver_image_src}
                popular_post_image_alt="lorem ipsum"
                authImgCont_is_image={false}
              />
            ) : (
              ''
            ),
          )}
        </div>
      </div>

      {/* Trending Topic */}
      <div className="rounded-3xl overflow-hidden bg-[rgb(242,242,242)]">
        <WidgetHeading heading_text="Trending Topic" view_all_link="#" />

        <div className="flex flex-col divide-y divide-neutral-200">
          <TrendingTopic topic_bg_color="#EF4444" category="Educators" />
          <TrendingTopic topic_bg_color="#EAB308" category="Admins" />
          <TrendingTopic topic_bg_color="rgb(55 48 163)" category="Pupils" />
        </div>
      </div>
    </div>
  )
}

export default LatestArticleRight
