import React from 'react'
import { Footer } from '@/components/Footer'
import Wrapper from '@/components/Wrapper/Wrapper'
import { BlogTagStyle } from './components/BlogTagStyle.styles'
import ImgNameDate from './components/imgNameDate'
import LikesCom from './components/LikesCom'
import BackNext from './components/BackNext'

const Blog = () => {
  return (
      <div className="bg-blog_bg">
        <Wrapper>
          {/* Hero */}
          <div className="pt-24 pb-28">
            {/* Heading(Head and Paragraph) */}
            <div
              className="headingWrap "
              style={{ marginBottom: '2rem', maxWidth: '42rem' }}
            >
              <h1 className="text-[2.25rem] leading-[2.5rem] font-black">
                Editor's Pick
              </h1>
              <p
                className="text-[1.25rem] leading-[1.75rem] mt-[0.75rem] font-[400] tracking-normal"
                style={{ color: 'rgba(107,114,128,1)' }}
              >
                Discover outstanding articles, Insights and Inspiration
              </p>
            </div>

            {/* Hero Blog*/}
            <div className="imgWrapper flex gap-2.5 flex-row-reverse py-10 items-start mb-5 relative">
              {/* Image */}
              <div
                className="bg-black "
                style={{
                  width: '65%',
                  height: '450px',
                  borderRadius: '20px',
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center center',
                  background:
                    'url(https://images.unsplash.com/photo-1440778303588-435521a205bc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80)',
                }}
              ></div>

              {/* Article Card  */}
              <div className="absolute left-0 top-20" style={{ width: '40%' }}>
                <div
                  className="p-12 bg-blog_bg"
                  style={{
                    borderRadius: '20px',
                    backgroundColor: '#fff6',
                    backdropFilter: ' blur(16px)',
                    boxShadow:
                      '0 0 #0000,  0 0 #0000, 0 0 #0000,  0 0 #0000, 0 10px 15px -3px #0000001a, 0 4px 6px -4px #0000001a;',
                  }}
                >
                  <BlogTagStyle
                    text="Administrative"
                    tag_link="#"
                    bg_color="rgb(254 249 195)"
                    text_color="rgb(133 77 14)"
                    hover_bg_color="rgb(133 77 14)"
                    hover_text_color="white"
                  />

                  <h2
                    style={{
                      fontSize: '1.3rem',
                      lineHeight: '2rem',
                      fontWeight: '600',
                      marginTop: '18px',
                    }}
                  >
                    <a href="#">
                      Effective classroom management strategies for new teachers
                    </a>
                  </h2>

                  <ImgNameDate
                    authName="Tunde Kelani"
                    altImage="tayture"
                    date="April 20, 2024"
                    enable={false}
                    isColumn={true}
                  />

                  <LikesCom />
                </div>

                {/* Back and Next Btn Cont */}
                <div className="p-4 sm:pt-8 sm:px-10">
                  <BackNext />
                </div>

              </div>  
            </div>
          </div>

          <div className="p-28 bg-black h-srceen">
            <p></p>
          </div>
        </Wrapper>
      </div>
  )
}

// Blog.getLayout = function getLayout(page: React.ReactNode) {
//   return <HomeLayout>{page}</HomeLayout>
// }

export default Blog
