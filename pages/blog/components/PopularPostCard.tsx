import React from 'react'
import ImgNameDate from './NameDate'
import HeadingDesc from './HeadingDesc'
import Link from 'next/link'
import Image from 'next/image'

interface PopularPostCardProps {
  popular_post_heading: string
  blog_id: number
  popular_post_image: string
  popular_post_image_alt: string
  authImgCont_is_image: boolean
  authImgCont_imageSrc?: string
  authImgCont_altImage?: string
}

function PopularPostCard({
  popular_post_heading,
  blog_id,
  popular_post_image,
  popular_post_image_alt,
  authImgCont_is_image,
  authImgCont_imageSrc,
  authImgCont_altImage,
}: PopularPostCardProps) {
  return (
    <div className="relative flex flex-row justify-between items-center p-4 xl:px-5 xl:py-6 hover:bg-neutral-200 dark:hover:bg-neutral-700">
      <div className="relative space-y-2">
      <Link href={`/blog/${blog_id}`} className="absolute inset-0 z-10"></Link>
        <ImgNameDate
          authImgCont_wi_hei="1.75rem"
          bg_color="black"
          authName="Tayture"
          date="April 15, 2024"
          enableDash={false}
          isColumn={true}
          is_image={authImgCont_is_image}
          imageSrc={authImgCont_imageSrc}
          altImage={authImgCont_altImage}
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

      {/* Image */}
      <div className="w-20 flex-shrink-0 relative rounded-lg overflow-hidden ml-4 group">
        <Image
          sizes="100px"
          height={400}
          width={400}
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
