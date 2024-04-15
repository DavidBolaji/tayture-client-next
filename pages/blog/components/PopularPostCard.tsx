import React from 'react'
import ImgNameDate from './ImgNameDate'
import HeadingDesc from './HeadingDesc'

interface PopularPostCardProps {
  popular_post_heading: string
  popular_post_tag: string
  popular_post_image: string
  popular_post_image_alt: string
}

function PopularPostCard({
  popular_post_heading,
  popular_post_tag,
  popular_post_image,
  popular_post_image_alt,
}: PopularPostCardProps) {
  return (
    <div className="relative flex flex-row justify-between items-center p-4 xl:px-5 xl:py-6 hover:bg-neutral-200 dark:hover:bg-neutral-700">
      <a href={popular_post_tag} className="absolute inset-0"></a>
      <div className="relative space-y-2">
        <ImgNameDate
          authImgCont_wi_hei="1.75rem"
          bg_color="black"
          authName="Tayture"
          date="April 15, 2024"
          enableDash={false}
          isColumn={false}
        />

        <h2 className="nc-card-title block text-sm sm:text-base font-medium sm:font-semibold text-neutral-900 dark:text-neutral-100">
          <a
            className="line-clamp-2"
            title="Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus nemo excepturi saepe."
            href="#"
          >
            {popular_post_heading}
          </a>
        </h2>
      </div>

      <div className="w-20 flex-shrink-0 relative rounded-lg overflow-hidden z-0 ml-4 group">
        <img
          sizes="100px"
          src={popular_post_image}
          title={popular_post_image_alt}
          class="object-cover w-full h-full group-hover:scale-110 transform transition-transform duration-300"
          alt={popular_post_image_alt}
        />
      </div>
    </div>
  )

  return (
    <div className="nc-Card3Small relative flex flex-row justify-between items-center p-4 xl:px-5 xl:py-6 hover:bg-neutral-200 dark:hover:bg-neutral-700">
      <a className="absolute inset-0" href="#"></a>

      <div className="relative space-y-2">
        <div className="nc-PostCardMeta inline-flex items-center flex-wrap text-neutral-800 dark:text-neutral-200 leading-none text-xs">
          <a
            className="relative flex items-center space-x-2"
            href="/author/the-demo-author-slug"
          >
            <div className="wil-avatar relative flex-shrink-0 inline-flex items-center justify-center overflow-hidden text-neutral-100 uppercase font-semibold shadow-inner rounded-full h-7 w-7 text-sm ring-1 ring-white dark:ring-neutral-900">
              <img
                sizes="100px"
                src="data:image/jpeg;base64,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"
                className="absolute inset-0 w-full h-full object-cover object-cover absolute inset-0 w-full h-full"
                alt="Tousy Vita"
              />
              <span className="wil-avatar__name">T</span>
            </div>
            <span className="block text-neutral-700 hover:text-black dark:text-neutral-300 dark:hover:text-white font-medium">
              Tousy Vita
            </span>
          </a>
          <span className="text-neutral-500 dark:text-neutral-400 mx-[6px] font-medium">
            ·
          </span>
          <span className="text-neutral-500 dark:text-neutral-400 font-normal">
            May 20, 2021
          </span>
        </div>
        <h2 className="nc-card-title block text-sm sm:text-base font-medium sm:font-semibold text-neutral-900 dark:text-neutral-100">
          <a
            className="line-clamp-2"
            title="New tools for Black pregnant and postpartum mothers to save lives"
            href="/single/this-is-single-slug"
          >
            New tools for Black pregnant and postpartum mothers to save lives
          </a>
        </h2>
      </div>
      <a
        title="New tools for Black pregnant and postpartum mothers to save lives"
        className="block w-20 flex-shrink-0 relative rounded-lg overflow-hidden z-0 ml-4 group"
        href="/single/this-is-single-slug"
      >
        <div className="w-full h-0 aspect-w-1 aspect-h-1">
          <img
            sizes="100px"
            src=""
            title="New tools for Black pregnant and postpartum mothers to save lives"
            className="object-cover w-full h-full group-hover:scale-110 transform transition-transform duration-300 object-cover absolute inset-0 w-full h-full"
            alt="featured"
          />
        </div>
      </a>
    </div>
  )
}

export default PopularPostCard
