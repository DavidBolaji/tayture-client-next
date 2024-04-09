import React from 'react'
import { Footer } from '@/components/Footer'
import Wrapper from '@/components/Wrapper/Wrapper'
import BlogTag from './components/BlogTag'


const Blog = () => {
  return (
    <>
    <div className='w-screen bg-blog_bg'>
    <Wrapper>
        <div className='h-screen  pt-24 pb-28'>
            <div className='headingWrap'>
                <h1 className='text-3xl leading-snug font-semibold'>Editor's Pick</h1>
                <p className='text-lg leading-7 font-light tracking-normal' style={{color:'rgba(107,114,128,1)',}}>Discover the most outstanding articles</p>
            </div>
            <div className='imgWrapper flex gap-2.5 flex-row-reverse py-10 items-start mb-5 relative'>
                <div className='bg-black ' style={{width:'65%',height:'500px', borderRadius: '50px'}}> 
                </div>
                <div className='bg-white absolute left-0 top-20' style={{width:'40%',height:'300px'}}> 
                    <div className='p-8 bg-blog_bg' style={{borderRadius: '20px'}}>
                        <BlogTag tag_link='#' hover_bg_color="hover:bg-[rgb(133 77 14)]" text='Electronics' bg_color='rgb(254 249 195)' text_color='rgb(133 77 14);
}

' />
                    </div>
                </div>
            </div>
        </div>
    </Wrapper>
    </div>
    </>

  )
}

Blog.getLayout = function getLayout(page: React.ReactNode) {
    return <HomeLayout>{page}</HomeLayout>
  }

export default Blog