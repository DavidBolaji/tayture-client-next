import React from 'react'
import { BlogTagStyle } from '../components/BlogTagStyle.styles'
import HeadingDescSB from '../components/singleBlogComponents/HeadingDescSB'
import ImgNameDate from '../components/ImgNameDate'
import LikesCom from '../components/LikesCom'

const content =
  'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veniam, minus veritatis omnis debitis ad facilis optio recusandae facere expedita rerum ab cum maiores dolorum repellat vel! Ratione sunt illo culpa!Eum, voluptate culpa harum voluptates repellendus perspiciatis dolor quaerat autem laborum porro veniam nobis odio sed quam ducimus sapiente hic fuga rerum nam ipsum quasi minus cupiditate eligendi vitae. Commodi.Explicabo labore corrupti blanditiis nemo aperiam veritatis doloribus! Deleniti nesciunt fugit, nemo, officiis aut libero harum voluptates dicta debitis aliquam, accusamus esse! Assumenda deleniti temporibus id. Laboriosam illum ipsam dicta?At aliquid, veniam saepe eveniet aut beatae accusantium non dicta modi explicabo, repellat in, nemo doloremque magni. Quibusdam a fugiat culpa similique. Veritatis praesentium nemo natus odio ipsam, obcaecati modi!Mollitia numquam totam officia id nulla inventore, ex sit maiores praesentium harum optio dicta incidunt fugiat itaque, aliquid quo. Dignissimos, dolore. Voluptate, amet velit? Nisi atque fuga nulla quibusdam totam.Perferendis minus consectetur inventore magnam modi quod adipisci sint, consequuntur iure dolor esse ex maxime itaque eaque, quos cumque voluptatem, mollitia veritatis corrupti eligendi sequi. Vel quos magnam quas vero.Nam, ab porro. Unde numquam earum aliquid optio quasi hic ut architecto illum. Atque, ipsum id eveniet fugiat reiciendis aut, facilis ab quidem qui, veritatis dolorum. Maxime illum doloribus molestiae.Dignissimos consequatur sunt deleniti corrupti, natus repellendus laboriosam molestias doloribus ducimus rerum quos tempora eos explicabo nisi sed modi! Itaque ratione architecto, ipsam officia magnam molestias distinctio at atque cupiditate!Saepe dolorem tempora cupiditate, quaerat soluta, non nihil odio consequuntur autem temporibus odit! Eius fugiat iusto laborum. Velit maiores sapiente sequi, incidunt itaque sunt possimus ipsum quod debitis veritatis reprehenderit.At officia praesentium necessitatibus veniam optio quis eligendi exercitationem quia cum alias? Est cumque in sit quia harum dignissimos aspernatur qui iste sapiente officia impedit rerum, quo vitae, unde aliquam?  '

function SingleBlogTemplate() {
  return (
    <div>
      <div className="SingleBlog pt-8 lg:pt-16">
        <header className="rounded-xl">
          <div className="max-w-screen-md mx-auto">
            <div>
              {/* Container for the Heading section */}
              <div className="space-y-5">
                {/* Tag */}
                <div className="nc-CategoryBadgeList flex flex-wrap space-x-2">
                  <BlogTagStyle
                    text="Admin"
                    tag_link="#"
                    bg_color="#FEF9C3"
                    text_color="#EAB308"
                    hover_bg_color="#EAB308"
                    hover_text_color="white"
                  />
                </div>

                {/* Heading and description */}
                <HeadingDescSB
                  heading="Lorem, ipsum dolor sit amet consectetur adipisicing elit."
                  description="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nam velit omnis quae perferendis praesentium magni fugiat, harum numquam dignissimos reiciendis a, deserunt distinctio iste maxime nulla dolor itaque explicabo? Magni!"
                />

                {/* Horizontal */}
                <div className="w-full border-b border-neutral-200 dark:border-neutral-700"></div>

                {/* Img auth date, likes and comm*/}
                <div className="flex flex-col sm:flex-row justify-between sm:items-end space-y-5 sm:space-y-0 sm:space-x-5">
                  {/* Img auth date */}
                  <ImgNameDate
                    authName="Tayture"
                    date="April 12, 2024"
                    enableDash={false}
                    isColumn={true}
                    bg_color="#EAB308"
                    authImgCont_wi_hei="2.7rem"
                    is_image={false}
                    //   imageSrc={authImgCont_imageSrc}
                    //   altImage={authImgCont_altImage}
                  />

                  {/* Lkes and Com num */}
                  <div className="flex flex-row space-x-2.5 items-center">
                    <LikesCom
                      likes_num="20"
                      comments_num="20"
                      bg_color="none"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Image Container */}
        <div className="container my-10 sm:my-12">
          <img
            src="https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg"
            width="1260"
            height="750"
            alt="single"
            sizes="(max-width: 1024px) 100vw, 1280px"
            className="w-full rounded-xl"
          />
        </div>
      </div>

      <div className="container mt-10"></div>
      <div className="relative">
        <div className="prose lg:prose-lg !max-w-screen-md mx-auto text-base font-thin leading-loose   ">
          <p className='pt-5'>{content.slice(0,500)}</p>
          <p className='pt-5'>{content.slice(500,1000)}</p>
          <p className='pt-5'>{content.slice(500,1000)}</p>
        </div>
      </div>
    </div>
  )
}

export default SingleBlogTemplate
