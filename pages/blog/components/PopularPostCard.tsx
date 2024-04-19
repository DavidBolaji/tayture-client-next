import React from 'react'
import ImgNameDate from './ImgNameDate'
import HeadingDesc from './HeadingDesc'
import Image from 'next/image'

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
        <Image
          width={100}
          height={100}
          src={popular_post_image}
          title={popular_post_image_alt}
          className="object-cover w-full h-full group-hover:scale-110 transform transition-transform duration-300"
          alt={popular_post_image_alt}
        />
      </div>
    </div>
  )
}

export default PopularPostCard
