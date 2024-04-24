import React from 'react'
import { BlogTagStyle } from '../components/BlogTagStyle.styles'
import HeadingDescSB from '../components/singleBlogComponents/HeadingDescSB'
import ImgNameDate from '../components/ImgNameDate'
import LikesCom from '../components/LikesCom'
import WidgetTags from '../components/WidgetTags'
import Comment from '../components/singleBlogComponents/Comment'
import Wrapper from '@/components/Wrapper/Wrapper'
import HeadingDesc from '../components/HeadingDesc'
import SmallArticleCardVertical from '../components/SmallArticleCardVertical'
import FetchBlogs from '../data/FetchBlogs'
import Pagination from '../components/Pagination'

const content =
  'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veniam, minus veritatis omnis debitis ad facilis optio recusandae facere expedita rerum ab cum maiores dolorum repellat vel! Ratione sunt illo culpa!Eum, voluptate culpa harum voluptates repellendus perspiciatis dolor quaerat autem laborum porro veniam nobis odio sed quam ducimus sapiente hic fuga rerum nam ipsum quasi minus cupiditate eligendi vitae. Commodi.Explicabo labore corrupti blanditiis nemo aperiam veritatis doloribus! Deleniti nesciunt fugit, nemo, officiis aut libero harum voluptates dicta debitis aliquam, accusamus esse! Assumenda deleniti temporibus id. Laboriosam illum ipsam dicta?At aliquid, veniam saepe eveniet aut beatae accusantium non dicta modi explicabo, repellat in, nemo doloremque magni. Quibusdam a fugiat culpa similique. Veritatis praesentium nemo natus odio ipsam, obcaecati modi!Mollitia numquam totam officia id nulla inventore, ex sit maiores praesentium harum optio dicta incidunt fugiat itaque, aliquid quo. Dignissimos, dolore. Voluptate, amet velit? Nisi atque fuga nulla quibusdam totam.Perferendis minus consectetur inventore magnam modi quod adipisci sint, consequuntur iure dolor esse ex maxime itaque eaque, quos cumque voluptatem, mollitia veritatis corrupti eligendi sequi. Vel quos magnam quas vero.Nam, ab porro. Unde numquam earum aliquid optio quasi hic ut architecto illum. Atque, ipsum id eveniet fugiat reiciendis aut, facilis ab quidem qui, veritatis dolorum. Maxime illum doloribus molestiae.Dignissimos consequatur sunt deleniti corrupti, natus repellendus laboriosam molestias doloribus ducimus rerum quos tempora eos explicabo nisi sed modi! Itaque ratione architecto, ipsam officia magnam molestias distinctio at atque cupiditate!Saepe dolorem tempora cupiditate, quaerat soluta, non nihil odio consequuntur autem temporibus odit! Eius fugiat iusto laborum. Velit maiores sapiente sequi, incidunt itaque sunt possimus ipsum quod debitis veritatis reprehenderit.At officia praesentium necessitatibus veniam optio quis eligendi exercitationem quia cum alias? Est cumque in sit quia harum dignissimos aspernatur qui iste sapiente officia impedit rerum, quo vitae, unde aliquam?  '

const contentLen = content.length
const blog = FetchBlogs()

function SingleBlogTemplate() {
  return (
    <div>
      {/* Header and Image Cont */}
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
                  <div className="flex flex-row mx-2.5 items-center">
                    <LikesCom
                      likes_num="20"
                      comments_num="20"
                      bg_color="none"
                      is_share={true}
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

      {/* Content Categories and Comment Section */}
      <div className="relative">
        <div className="prose lg:prose-lg !max-w-screen-md mx-auto text-base font-thin leading-loose   ">
          <p className="py-5">{content.slice(0, contentLen / 2)}</p>
          <figure>
            <img
              src="https://images.unsplash.com/photo-1501493870936-9c2e41625521?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=1045&amp;q=80"
              sizes="(max-width: 1024px) 100vw, 1240px"
              width="1635"
              height="774"
              className="rounded-2xl"
              alt="nc blog"
            />
          </figure>
          <p className="py-5">{content.slice(contentLen / 2, contentLen)}</p>
        </div>

        {/* Img auth date, likes and comm*/}
        <div className="flex flex-col sm:flex-row justify-between sm:items-end space-y-5 sm:space-y-0 sm:space-x-5 mb-10 max-w-screen-md mx-auto bg-neutral-200 rounded-xl p-4">
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
          <div className="flex flex-row mx-2.5 items-center">
            <LikesCom
              likes_num="20"
              comments_num="20"
              bg_color="none"
              is_share={true}
            />
          </div>
        </div>

        {/* categories widgets */}
        <div className="max-w-screen-md mx-auto flex flex-wrap mt-4">
          <WidgetTags tag_text="Admin" tag_link="#" tot_articles="20" />
          <WidgetTags tag_text="Educators" tag_link="#" tot_articles="10" />
          <WidgetTags tag_text="Pupils" tag_link="#" tot_articles="15" />
          <WidgetTags tag_text="Parents" tag_link="#" tot_articles="25" />
          <WidgetTags tag_text="Events" tag_link="#" tot_articles="20" />
        </div>

        {/* HR */}
        <div className="max-w-screen-md mx-auto border-b border-t border-neutral-200  my-10"></div>

        {/* Comments */}
        {/* COMMENT FORM */}
        <div className="scroll-mt-20 max-w-screen-md mx-auto pt-5">
          <h3 className="text-xl font-semibold text-neutral-800 dark:text-neutral-200">
            Responses (2)
          </h3>
          <form action="" className="CommentForm mt-5">
            <textarea
              className="block w-full text-sm rounded-xl border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white p-4"
              rows={4}
              placeholder="Add to discussion"
              required
            ></textarea>
            <div className="my-8 space-x-3">
              <button
                className="flex-shrink-0 relative h-auto inline-flex items-center justify-center rounded-full transition-colors border-transparent bg-black hover:bg-orange  text-white text-sm sm:text-base font-semibold py-3 px-4 sm:py-3.5 sm:px-6  "
                type="submit"
              >
                Submit
              </button>
            </div>
          </form>
        </div>

        {/* Comment container */}
        <div className="max-w-screen-md mx-auto">
          <div className="CommentsList my-8">
            <Comment />
            <Comment />
            <button className="flex-shrink-0 relative h-auto inline-flex items-center justify-center rounded-full transition-colors border-transparent bg-black hover:bg-orange text-white text-sm sm:text-base font-medium py-3 px-4 sm:py-3.5 sm:px-6 w-full ">
              View full comments (+10 comments)
            </button>
          </div>
        </div>
      </div>

      {/* Other Post */}
      <div className="relative bg-neutral-100 py-16 lg:py-28 mt-16 lg:mt-28 rounded-[50px]">
        <Wrapper>
          <div className="relative flex flex-col sm:flex-row sm:items-end justify-between text-neutral-900">
            <HeadingDesc heading="More Posts" description="" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {blog.slice(0,4).map((blog) => (
              <SmallArticleCardVertical
                key={blog.id}
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
                authImgCont_is_image={false}
              />
            ))}
          </div>

          {/* Pagination */}
          <div className='w-full flex items-center justify-center mt-20'>

          <Pagination total_pages={5} currentPage={1} onPageChange=''/>
          </div>

        </Wrapper>
      </div>
    </div>
  )
}

export default SingleBlogTemplate
