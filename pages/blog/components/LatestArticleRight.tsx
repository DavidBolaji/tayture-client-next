import React from 'react'
import WidgetHeading from './WidgetHeading'
import WidgetTags from './WidgetTags'
import PopularPostCard from './PopularPostCard'
import TrendingTopic from './TrendingTopic'

function LatestArticleRight() {
  return (
    <div className="right_cont w-full space-y-7 mt-24 lg:mt-0 lg:w-2/5 lg:pl-10 xl:pl-0 xl:w-1/3 ">
      {/* Heading and Tags Container */}
      <div className="rounded-3xl overflow-hidden bg-[rgb(242,242,242)]">
        {/* heading */}
        <WidgetHeading heading_text="Tags" view_all_link="#" />

        {/* Tags Container */}
        <div className="flex flex-wrap p-4 xl:p-5">
          <WidgetTags tag_text="Admin" tag_link="#" tot_articles="20" />
          <WidgetTags tag_text="Educators" tag_link="#" tot_articles="10" />
          <WidgetTags tag_text="Pupils" tag_link="#" tot_articles="15" />
          <WidgetTags tag_text="Parents" tag_link="#" tot_articles="25" />
          <WidgetTags tag_text="Events" tag_link="#" tot_articles="20" />
        </div>
      </div>
      {/* Popular posts */}
      <div className="rounded-3xl overflow-hidden bg-[rgb(242,242,242)]">
        <WidgetHeading heading_text="Popular Posts" view_all_link="#" />
        {/* popular post posts cont */}
        <div className="flex flex-col divide-y divide-neutral-200">
          <PopularPostCard
            popular_post_tag="#"
            popular_post_heading="Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus nemo excepturi saepe."
            popular_post_image="https://img.freepik.com/free-photo/medium-shot-family-together-home_23-2149160316.jpg?t=st=1713113078~exp=1713116678~hmac=7e887d6b596123021b0dbf4862433f546d89337fba9852c23088f966df9853fb&w=360"
            popular_post_image_alt="lorem ipsum"
            authImgCont_is_image={false}
          />
          <PopularPostCard
            popular_post_tag="#"
            popular_post_heading="Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus nemo excepturi saepe."
            popular_post_image="https://img.freepik.com/free-photo/medium-shot-family-together-home_23-2149160316.jpg?t=st=1713113078~exp=1713116678~hmac=7e887d6b596123021b0dbf4862433f546d89337fba9852c23088f966df9853fb&w=360"
            popular_post_image_alt="lorem ipsum"
            authImgCont_is_image={false}
          />
          <PopularPostCard
            popular_post_tag="#"
            popular_post_heading="Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus nemo excepturi saepe."
            popular_post_image="https://img.freepik.com/free-photo/medium-shot-family-together-home_23-2149160316.jpg?t=st=1713113078~exp=1713116678~hmac=7e887d6b596123021b0dbf4862433f546d89337fba9852c23088f966df9853fb&w=360"
            popular_post_image_alt="lorem ipsum"
            authImgCont_is_image={false}
          />
          <PopularPostCard
            popular_post_tag="#"
            popular_post_heading="Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus nemo excepturi saepe."
            popular_post_image="https://img.freepik.com/free-photo/medium-shot-family-together-home_23-2149160316.jpg?t=st=1713113078~exp=1713116678~hmac=7e887d6b596123021b0dbf4862433f546d89337fba9852c23088f966df9853fb&w=360"
            popular_post_image_alt="lorem ipsum"
            authImgCont_is_image={false}
          />
        </div>
      </div>

      {/* Trending Topic */}
      <div className="rounded-3xl overflow-hidden bg-[rgb(242,242,242)]">
        <WidgetHeading heading_text="Trending Topic" view_all_link="#" />

        <div className="flex flex-col divide-y divide-neutral-200">
          <TrendingTopic
            topic_bg_color="#EF4444"
            category="Educators"
            no_articles="10 Articles"
          />
          <TrendingTopic
            topic_bg_color="#EAB308"
            category="Admins"
            no_articles="20 Articles"
          />
          <TrendingTopic
            topic_bg_color="rgb(55 48 163)"
            category="Pupils"
            no_articles="10 Articles"
          />
        </div>
      </div>
    </div>
  )
}

export default LatestArticleRight
