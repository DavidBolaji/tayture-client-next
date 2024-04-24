import React from 'react'
import CategoryOthers from '../components/singleCategoryTemplateComponents/CategoryOthers'
import Wrapper from '@/components/Wrapper/Wrapper'

function SingleCategoryTemplate() {
  return (
    <div>
        {/* Image and Text */}
      <div className="w-full px-2 xl:max-w-screen-2xl mx-auto">
        <div className="relative rounded-3xl md:rounded-[40px] overflow-hidden z-0 h-[500px]">
            {/* Image */}
          <img
            src="https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=2&amp;h=750&amp;w=1260"
            sizes="(max-width: 1280px) 100vw, 1536px"
            className="object-cover w-full h-full rounded-3xl md:rounded-[40px] object-cover inset-0 w-full h-full"
            alt="archive"
          />

          {/* Text */}
          <div className="absolute inset-0 bg-black text-white bg-opacity-30 flex flex-col items-center justify-center">
            <h2 className="inline-block align-middle text-5xl font-semibold md:text-7xl ">
              Educators
            </h2>
            <span className="block mt-4 text-neutral-300">20 Articles</span>
          </div>
        </div>
      </div>

      <Wrapper>

      <div className='pt-10 pb-16 lg:pb-28 lg:pt-20 my-16 lg:my-28'>
        <CategoryOthers/>
      </div>
      </Wrapper>
    </div>
  )
}

export default SingleCategoryTemplate
