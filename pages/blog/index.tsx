import React from 'react'
import Wrapper from '@/components/Wrapper/Wrapper'
import LikesCom from './components/LikesCom'
import BackNext from './components/BackNext'
import HomeLayout from '@/components/layouts/HomeLayout'
import { BlogTagStyle } from './components/BlogTagStyle.styles'
import { Footer } from '@/components/Footer'
import ImgNameDate from './components/ImgNameDate'
import SectionCont from './components/helpers/SectionCont'
import ArticlesCatCard from './components/ArticlesCatCard'
import HeadingDesc from './components/HeadingDesc'
import NavItem from './components/NavItem'
import { HiOutlineArrowRight } from 'react-icons/hi'
import MainArticleCard from './components/MainArticleCard'
import SmallArticleCard from './components/SmallArticleCard'
import SmallArticleCardVertical from './components/SmallArticleCardVertical'
import WidgetHeading from './components/WidgetHeading'
import WidgetTags from './components/WidgetTags'
import PopularPostCard from './components/PopularPostCard'
import TrendingTopic from './components/TrendingTopic'
import Pagination from './components/Pagination'

const Blog = () => {
  return (
    <>
      <div className="bg-blog_bg overflow-auto h-[99vh]">
        <div className="bg-blog_bg">
          <Wrapper>
            {/* Hero */}
            <div className="relative pt-10 md:py-12 lg:pb-10 lg:pt-20">
              {/* Heading(Head and Paragraph) */}
              <HeadingDesc
                heading="Editor's Pick"
                description="Discover outstanding articles, Insights and Inspiration"
              />

              {/* Hero Blog*/}
              <div className="imgWrapper flex m:pt-0 items-start sm:mb-5 relative  flex-col md:flex-row justify-end ">
                {/* Image */}
                <div
                  className="bg-black w-full md:w-4/5 lg:w-2/3  bg-center bg-no-repeat bg-cover"
                  style={{
                    height: '450px',
                    borderRadius: '20px',
                    background:
                      'url(https://images.unsplash.com/photo-1440778303588-435521a205bc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80)',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                  }}
                ></div>

                {/* Article Card  */}
                <div className="md:absolute z-10 md:left-0 md:top-1/2 md:-translate-y-1/2 w-full -mt-8 md:mt-0 px-3 sm:px-6 md:px-0 md:w-3/5 lg:w-1/2 xl:w-2/5">
                  <div
                    className="bg-blog_bg  p-4 sm:p-8 xl:py-14 md:px-10 dark:bg-neutral-900/40 backdrop-blur-lg shadow-lg dark:shadow-2xl rounded-3xl space-y-3 sm:space-y-5 "
                    style={{
                      backgroundColor: '#fff6',
                      backdropFilter: ' blur(16px)',
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

                    <h2 className="text-base sm:text-xl lg:text-2xl font-semibold ">
                      <a href="#">
                        Effective classroom management strategies for new
                        teachers
                      </a>
                    </h2>

                    <ImgNameDate
                      authName="Boluwatife Adewole"
                      // altImage="tayture"
                      // image
                      date="April 10, 2024"
                      enableDash={false}
                      isColumn={true}
                      bg_color="black"
                      authImgCont_wi_hei="2.5rem"
                    />

                    <LikesCom
                      likes_num="20"
                      comments_num="30"
                      bg_color="rgba(249,250,251)"
                    />
                  </div>

                  {/* Back and Next Btn Cont */}
                  <div className="p-4 sm:pt-8 sm:px-10">
                    <BackNext />
                  </div>
                </div>
              </div>
            </div>

            {/* Section 2 */}
            <SectionCont bg_color="bg-[rgb(242,242,242)]" class_name="mt-12">
              {/* Header Section 2 */}
              <HeadingDesc
                heading="Top trending topics"
                description="Discover 233 topics"
              />

              {/* Articles Category Card  */}
              <div className="artcilesCatCard">
                <div className="-mx-2 xl:-mx-4 relative whitespace-nowrap -mx-2 xl:-mx-4 overflow-hidden">
                  <ArticlesCatCard
                    category="Admin"
                    totalCatArticles="20 Articles"
                    categoryColor="#EAB308"
                    rank="#1"
                    bg_color_rank="#FEF9C3"
                    text_color_rank="#EAB308"
                    bg_image_url="url(https://img.freepik.com/free-photo/entrepreneurs-meeting-office_23-2148898688.jpg?t=st=1712831917~exp=1712835517~hmac=d3e6c62789e340457130f14c892e245e2ef8c4512b82811c35b14a24a7067daf&w=996)"
                    authImgCont_wi_hei="2.5rem"
                  />
                  <ArticlesCatCard
                    category="Teachers"
                    totalCatArticles="10 Articles"
                    categoryColor="#EF4444"
                    rank="#2"
                    bg_color_rank="#FEE2E2"
                    text_color_rank="#EF4444"
                    bg_image_url="url(https://img.freepik.com/free-photo/medium-shot-smiley-woman-with-white-board_23-2149272221.jpg?t=st=1712842359~exp=1712845959~hmac=84e9b41ce746cc752babc2926fce09ad0cbbcbc874c4f2d5d43eea19bf34aee6&w=996)"
                    authImgCont_wi_hei="2.5rem"
                  />
                  <ArticlesCatCard
                    category="Pupils"
                    totalCatArticles="10 Articles"
                    categoryColor="rgb(99,102,241)"
                    rank="#3"
                    bg_color_rank="rgb(224 231 255)"
                    text_color_rank="rgb(55 48 163)"
                    bg_image_url="url(https://img.freepik.com/free-photo/front-view-kid-doing-homework_23-2149610742.jpg?t=st=1712843045~exp=1712846645~hmac=255d35bf764718bb1864a29615708666ff743c47584a097c64569468025cde32&w=996)"
                    authImgCont_wi_hei="2.5rem"
                  />
                  <ArticlesCatCard
                    category="Parents"
                    totalCatArticles="15 Articles"
                    categoryColor="#EC4899"
                    bg_image_url="url(https://img.freepik.com/free-photo/medium-shot-happy-parents-girl_23-2148960586.jpg?t=st=1712843236~exp=1712846836~hmac=07be2995070489fcd7c2bfd1fd7478b5f955c7e6b3a1dbeb692eb84c18d2a136&w=996)"
                    authImgCont_wi_hei="2.5rem"
                  />
                  <ArticlesCatCard
                    category="Events"
                    totalCatArticles="10 Articles"
                    categoryColor="#EF4444"
                    bg_image_url="url(https://img.freepik.com/free-photo/portrait-elegant-professional-businessman-speaking-conference_23-2150917212.jpg?t=st=1712843534~exp=1712847134~hmac=32fdc9959a700b0f44530679b47b24c93de6fc7bec1224bdd6c7c580a00de2ea&w=740)"
                    authImgCont_wi_hei="2.5rem"
                  />
                  <ArticlesCatCard
                    category="Events"
                    totalCatArticles="10 Articles"
                    categoryColor="#EF4444"
                    bg_image_url="url(https://img.freepik.com/free-photo/portrait-elegant-professional-businessman-speaking-conference_23-2150917212.jpg?t=st=1712843534~exp=1712847134~hmac=32fdc9959a700b0f44530679b47b24c93de6fc7bec1224bdd6c7c580a00de2ea&w=740)"
                    authImgCont_wi_hei="2.5rem"
                  />
                </div>
              </div>
            </SectionCont>

            {/* Section 3 */}

            <SectionCont bg_color="none">
              {/* Heading and Buttons for Categories */}
              <div className="flex flex-col mb-8 relative">
                {/* Heading */}
                <HeadingDesc
                  heading="Latest Articles"
                  description="Discover the most outstanding articles in all topics targetted at better K-12 Education"
                />

                {/* Buttons for Categories */}
                <div className="flex justify-between">
                  <nav className="relative flex w-full overflow-x-auto text-sm md:text-base">
                    <NavItem />
                  </nav>
                  <button className="flex-shrink-0 relative h-12 inline-flex items-center justify-center rounded-full transition-colors border-transparent bg-black_200 hover:bg-orange text-white text-sm sm:text-base font-medium px-6 hidden md:!flex ">
                    <span>View all</span>
                    <HiOutlineArrowRight className="w-6 h-5 ml-3" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
                <MainArticleCard
                  img_src="https://img.freepik.com/free-photo/study-group-african-people_23-2149156377.jpg?t=st=1712928955~exp=1712932555~hmac=21fa6f9318c79b9a8a94158bbff8a5007638cfa4d73058d70539756ff0632ba6&w=996"
                  alt_img="Lorem ipsum"
                  tag_text="Educators"
                  tag_text_color="#EF4444"
                  tag_bg_color="#FEE2E2"
                  tag_hover_text_color="white"
                  tag_hover_bg_color="#EF4444"
                  authImgCont_wi_hei="2.7rem"
                  ImgNameDate_bg_color="#EF4444"
                  article_heading="Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore culpa vitae natus in distinctio ab."
                  article_description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum commodi voluptas quaerat enim porro similique officia libero, maxime omnis delectus impedit dolores amet ratione facilis molestiae ea at minima assumenda!"
                  likes_num="20"
                  comments_num="25"
                  likesCom_bg_color="rgba(249,250,251)"
                />

                <div className="grid gap-6 md:gap-8">
                  <SmallArticleCard
                    tag_text="Admin"
                    tag_text_color="#EAB308"
                    tag_bg_color="#FEF9C3"
                    tag_hover_text_color="white"
                    tag_hover_bg_color="#EAB308"
                    heading_text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore culpa vitae natus in distinctio ab."
                    ImgNameDate_bg_color="#EAB308"
                    authImgCont_wi_hei="1.75rem"
                    likes_num="20"
                    comments_num="25"
                    likesCom_bg_color="rgba(249,250,251)"
                    img_src="https://img.freepik.com/free-photo/portrait-african-young-businesswoman-holding-mobile-phone-hand-looking-away_23-2148190733.jpg?t=st=1713113376~exp=1713116976~hmac=dc4ebdf1082c96f828a5138bf6f588d50a2a78944491e293b9fbee4dc77c7b18&w=360"
                    alt_img="Lorem ipsum"
                    is_bg_border={true}
                    is_description={false}
                  />
                  <SmallArticleCard
                    tag_text="Pupils"
                    tag_text_color="rgb(55 48 163)"
                    tag_bg_color="rgb(224 231 255)"
                    tag_hover_text_color="white"
                    tag_hover_bg_color="rgb(55 48 163)"
                    heading_text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore culpa vitae natus in distinctio ab."
                    ImgNameDate_bg_color="rgb(55 48 163)"
                    authImgCont_wi_hei="1.75rem"
                    likes_num="20"
                    comments_num="25"
                    likesCom_bg_color="rgba(249,250,251)"
                    img_src="https://img.freepik.com/free-photo/young-girls-spending-time-home_23-2149489564.jpg?t=st=1713042037~exp=1713045637~hmac=ccbec82c88554f41606c23b80aa02461ccedc467d82a7396c05c70b14c35326f&w=360"
                    alt_img="Lorem ipsum"
                    is_bg_border={true}
                    is_description={false}
                  />
                  <SmallArticleCard
                    tag_text="Parents"
                    tag_text_color="#EC4899"
                    tag_bg_color="#FFEAF5"
                    tag_hover_text_color="white"
                    tag_hover_bg_color="#EC4899"
                    heading_text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore culpa vitae natus in distinctio ab."
                    ImgNameDate_bg_color="#EC4899"
                    authImgCont_wi_hei="1.75rem"
                    likes_num="20"
                    comments_num="25"
                    likesCom_bg_color="rgba(249,250,251)"
                    img_src="https://img.freepik.com/free-photo/medium-shot-family-together-home_23-2149160316.jpg?t=st=1713113078~exp=1713116678~hmac=7e887d6b596123021b0dbf4862433f546d89337fba9852c23088f966df9853fb&w=360"
                    alt_img="Lorem ipsum"
                    is_bg_border={true}
                    is_description={false}
                  />
                </div>
              </div>
            </SectionCont>

            {/* Section 4 */}
            <SectionCont bg_color="bg-[rgb(242,242,242)]" class_name="mb-12">
              {/* Heading and Navigation */}
              <div className="flex flex-col mb-8 relative">
                <HeadingDesc
                  heading="Lorem Ipsum"
                  description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam optio nulla odit."
                />
                <div className="flex justify-between">
                  <nav className="relative flex w-full overflow-x-auto text-sm md:text-base">
                    <NavItem />
                  </nav>
                  <button className="flex-shrink-0 relative h-12 inline-flex items-center justify-center rounded-full transition-colors border-transparentbg-black_200 hover:bg-orange bg-black_200 hover:bg-orange text-white text-sm sm:text-base font-medium px-6 hidden md:!flex ">
                    <span>View all</span>
                    <HiOutlineArrowRight className="w-6 h-5 ml-3" />
                  </button>
                </div>
              </div>

              {/* Articles Cont */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                <div className="grid gap-6">
                  <SmallArticleCardVertical
                    tag_text="Admin"
                    tag_text_color="#EAB308"
                    tag_bg_color="#FEF9C3"
                    tag_hover_text_color="white"
                    tag_hover_bg_color="#EAB308"
                    heading_text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore culpa vitae natus in distinctio ab."
                    ImgNameDate_bg_color="#EAB308"
                    authImgCont_wi_hei="1.75rem"
                    likes_num="20"
                    comments_num="25"
                    likesCom_bg_color="rgba(249,250,251)"
                    img_src="https://img.freepik.com/free-photo/media-star-reviews-laptop-fans_482257-81654.jpg?t=st=1713119967~exp=1713123567~hmac=ebdd7f1610a47975298d2faa02af3726d19d6ec81f3cc20eefca21cd68b088c9&w=996"
                    alt_img="Lorem ipsum"
                  />
                  <SmallArticleCardVertical
                    tag_text="Admin"
                    tag_text_color="#EAB308"
                    tag_bg_color="#FEF9C3"
                    tag_hover_text_color="white"
                    tag_hover_bg_color="#EAB308"
                    heading_text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore culpa vitae natus in distinctio ab."
                    ImgNameDate_bg_color="#EAB308"
                    authImgCont_wi_hei="1.75rem"
                    likes_num="20"
                    comments_num="25"
                    likesCom_bg_color="rgba(249,250,251)"
                    img_src="https://img.freepik.com/free-photo/media-star-reviews-laptop-fans_482257-81654.jpg?t=st=1713119967~exp=1713123567~hmac=ebdd7f1610a47975298d2faa02af3726d19d6ec81f3cc20eefca21cd68b088c9&w=996"
                    alt_img="Lorem ipsum"
                  />
                </div>
                <div className="lg:col-span-2">
                  <MainArticleCard
                    img_src="https://img.freepik.com/free-photo/study-group-african-people_23-2149156377.jpg?t=st=1712928955~exp=1712932555~hmac=21fa6f9318c79b9a8a94158bbff8a5007638cfa4d73058d70539756ff0632ba6&w=996"
                    alt_img="Lorem ipsum"
                    tag_text="Educators"
                    tag_text_color="#EF4444"
                    tag_bg_color="#FEE2E2"
                    tag_hover_text_color="white"
                    tag_hover_bg_color="#EF4444"
                    authImgCont_wi_hei="2.7rem"
                    ImgNameDate_bg_color="#EF4444"
                    article_heading="Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore culpa vitae natus in distinctio ab."
                    article_description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum commodi voluptas quaerat enim porro similique officia libero, maxime omnis delectus impedit dolores amet ratione facilis molestiae ea at minima assumenda!"
                    likes_num="20"
                    comments_num="25"
                    likesCom_bg_color="rgba(249,250,251)"
                  />
                </div>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-1 md:col-span-3 xl:col-span-1">
                  <SmallArticleCardVertical
                    tag_text="Admin"
                    tag_text_color="#EAB308"
                    tag_bg_color="#FEF9C3"
                    tag_hover_text_color="white"
                    tag_hover_bg_color="#EAB308"
                    heading_text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore culpa vitae natus in distinctio ab."
                    ImgNameDate_bg_color="#EAB308"
                    authImgCont_wi_hei="1.75rem"
                    likes_num="20"
                    comments_num="25"
                    likesCom_bg_color="rgba(249,250,251)"
                    img_src="https://img.freepik.com/free-photo/media-star-reviews-laptop-fans_482257-81654.jpg?t=st=1713119967~exp=1713123567~hmac=ebdd7f1610a47975298d2faa02af3726d19d6ec81f3cc20eefca21cd68b088c9&w=996"
                    alt_img="Lorem ipsum"
                  />
                  <SmallArticleCardVertical
                    tag_text="Admin"
                    tag_text_color="#EAB308"
                    tag_bg_color="#FEF9C3"
                    tag_hover_text_color="white"
                    tag_hover_bg_color="#EAB308"
                    heading_text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore culpa vitae natus in distinctio ab."
                    ImgNameDate_bg_color="#EAB308"
                    authImgCont_wi_hei="1.75rem"
                    likes_num="20"
                    comments_num="25"
                    likesCom_bg_color="rgba(249,250,251)"
                    img_src="https://img.freepik.com/free-photo/media-star-reviews-laptop-fans_482257-81654.jpg?t=st=1713119967~exp=1713123567~hmac=ebdd7f1610a47975298d2faa02af3726d19d6ec81f3cc20eefca21cd68b088c9&w=996"
                    alt_img="Lorem ipsum"
                  />
                </div>
              </div>
            </SectionCont>

            {/* Section 5 Latest Articels*/}
            <SectionCont bg_color="none">
              <div className="flex flex-col lg:flex-row">
                {/* left */}
                <div className="left_cont w-full lg:w-3/5 xl:w-2/3 xl:pr-14">
                  <HeadingDesc
                    heading="Latest Articles"
                    description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam optio nulla odit."
                  />

                  {/* Latest articles */}
                  <div className="latest_articles_cont grid gap-6 md:gap-8 ">
                    <SmallArticleCard
                      tag_text="Admin"
                      tag_text_color="#EAB308"
                      tag_bg_color="#FEF9C3"
                      tag_hover_text_color="white"
                      tag_hover_bg_color="#EAB308"
                      heading_text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore culpa vitae natus in distinctio ab."
                      ImgNameDate_bg_color="#EAB308"
                      authImgCont_wi_hei="1.75rem"
                      likes_num="20"
                      comments_num="25"
                      likesCom_bg_color="rgba(249,250,251)"
                      img_src="https://img.freepik.com/free-photo/portrait-african-young-businesswoman-holding-mobile-phone-hand-looking-away_23-2148190733.jpg?t=st=1713113376~exp=1713116976~hmac=dc4ebdf1082c96f828a5138bf6f588d50a2a78944491e293b9fbee4dc77c7b18&w=360"
                      alt_img="Lorem ipsum"
                      is_bg_border={false}
                      is_description={true}
                      description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore culpa vitae natus in distinctio ab.Lorem ipsum dolor sit amet consectetur adipisicing elit."
                    />
                    <SmallArticleCard
                      tag_text="Admin"
                      tag_text_color="#EAB308"
                      tag_bg_color="#FEF9C3"
                      tag_hover_text_color="white"
                      tag_hover_bg_color="#EAB308"
                      heading_text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore culpa vitae natus in distinctio ab."
                      ImgNameDate_bg_color="#EAB308"
                      authImgCont_wi_hei="1.75rem"
                      likes_num="20"
                      comments_num="25"
                      likesCom_bg_color="rgba(249,250,251)"
                      img_src="https://img.freepik.com/free-photo/portrait-african-young-businesswoman-holding-mobile-phone-hand-looking-away_23-2148190733.jpg?t=st=1713113376~exp=1713116976~hmac=dc4ebdf1082c96f828a5138bf6f588d50a2a78944491e293b9fbee4dc77c7b18&w=360"
                      alt_img="Lorem ipsum"
                      is_bg_border={false}
                      is_description={true}
                      description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore culpa vitae natus in distinctio ab.Lorem ipsum dolor sit amet consectetur adipisicing elit."
                    />
                    <SmallArticleCard
                      tag_text="Admin"
                      tag_text_color="#EAB308"
                      tag_bg_color="#FEF9C3"
                      tag_hover_text_color="white"
                      tag_hover_bg_color="#EAB308"
                      heading_text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore culpa vitae natus in distinctio ab."
                      ImgNameDate_bg_color="#EAB308"
                      authImgCont_wi_hei="1.75rem"
                      likes_num="20"
                      comments_num="25"
                      likesCom_bg_color="rgba(249,250,251)"
                      img_src="https://img.freepik.com/free-photo/portrait-african-young-businesswoman-holding-mobile-phone-hand-looking-away_23-2148190733.jpg?t=st=1713113376~exp=1713116976~hmac=dc4ebdf1082c96f828a5138bf6f588d50a2a78944491e293b9fbee4dc77c7b18&w=360"
                      alt_img="Lorem ipsum"
                      is_bg_border={false}
                      is_description={true}
                      description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore culpa vitae natus in distinctio ab.Lorem ipsum dolor sit amet consectetur adipisicing elit."
                    />
                    <SmallArticleCard
                      tag_text="Admin"
                      tag_text_color="#EAB308"
                      tag_bg_color="#FEF9C3"
                      tag_hover_text_color="white"
                      tag_hover_bg_color="#EAB308"
                      heading_text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore culpa vitae natus in distinctio ab."
                      ImgNameDate_bg_color="#EAB308"
                      authImgCont_wi_hei="1.75rem"
                      likes_num="20"
                      comments_num="25"
                      likesCom_bg_color="rgba(249,250,251)"
                      img_src="https://img.freepik.com/free-photo/portrait-african-young-businesswoman-holding-mobile-phone-hand-looking-away_23-2148190733.jpg?t=st=1713113376~exp=1713116976~hmac=dc4ebdf1082c96f828a5138bf6f588d50a2a78944491e293b9fbee4dc77c7b18&w=360"
                      alt_img="Lorem ipsum"
                      is_bg_border={false}
                      is_description={true}
                      description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore culpa vitae natus in distinctio ab.Lorem ipsum dolor sit amet consectetur adipisicing elit."
                    />
                    <SmallArticleCard
                      tag_text="Admin"
                      tag_text_color="#EAB308"
                      tag_bg_color="#FEF9C3"
                      tag_hover_text_color="white"
                      tag_hover_bg_color="#EAB308"
                      heading_text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore culpa vitae natus in distinctio ab."
                      ImgNameDate_bg_color="#EAB308"
                      authImgCont_wi_hei="1.75rem"
                      likes_num="20"
                      comments_num="25"
                      likesCom_bg_color="rgba(249,250,251)"
                      img_src="https://img.freepik.com/free-photo/portrait-african-young-businesswoman-holding-mobile-phone-hand-looking-away_23-2148190733.jpg?t=st=1713113376~exp=1713116976~hmac=dc4ebdf1082c96f828a5138bf6f588d50a2a78944491e293b9fbee4dc77c7b18&w=360"
                      alt_img="Lorem ipsum"
                      is_bg_border={false}
                      is_description={true}
                      description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore culpa vitae natus in distinctio ab.Lorem ipsum dolor sit amet consectetur adipisicing elit."
                    />
                    <SmallArticleCard
                      tag_text="Admin"
                      tag_text_color="#EAB308"
                      tag_bg_color="#FEF9C3"
                      tag_hover_text_color="white"
                      tag_hover_bg_color="#EAB308"
                      heading_text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore culpa vitae natus in distinctio ab."
                      ImgNameDate_bg_color="#EAB308"
                      authImgCont_wi_hei="1.75rem"
                      likes_num="20"
                      comments_num="25"
                      likesCom_bg_color="rgba(249,250,251)"
                      img_src="https://img.freepik.com/free-photo/portrait-african-young-businesswoman-holding-mobile-phone-hand-looking-away_23-2148190733.jpg?t=st=1713113376~exp=1713116976~hmac=dc4ebdf1082c96f828a5138bf6f588d50a2a78944491e293b9fbee4dc77c7b18&w=360"
                      alt_img="Lorem ipsum"
                      is_bg_border={false}
                      is_description={true}
                      description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore culpa vitae natus in distinctio ab."
                    />
                    <SmallArticleCard
                      tag_text="Admin"
                      tag_text_color="#EAB308"
                      tag_bg_color="#FEF9C3"
                      tag_hover_text_color="white"
                      tag_hover_bg_color="#EAB308"
                      heading_text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore culpa vitae natus in distinctio ab."
                      ImgNameDate_bg_color="#EAB308"
                      authImgCont_wi_hei="1.75rem"
                      likes_num="20"
                      comments_num="25"
                      likesCom_bg_color="rgba(249,250,251)"
                      img_src="https://img.freepik.com/free-photo/portrait-african-young-businesswoman-holding-mobile-phone-hand-looking-away_23-2148190733.jpg?t=st=1713113376~exp=1713116976~hmac=dc4ebdf1082c96f828a5138bf6f588d50a2a78944491e293b9fbee4dc77c7b18&w=360"
                      alt_img="Lorem ipsum"
                      is_bg_border={false}
                      is_description={true}
                      description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore culpa vitae natus in distinctio ab.Lorem ipsum dolor sit amet consectetur adipisicing elit."
                    />
                  </div>

                  {/* Pagination */}
                  <div className="flex flex-col mt-12 md:mt-20 space-y-5 sm:space-y-0 sm:space-x-3 sm:flex-row sm:justify-between sm:items-center">
                    <Pagination />

                    <button className="showMoreButton flex-shrink-0 relative h-auto inline-flex items-center justify-center rounded-full transition-colors border-transparent bg-black_200 hover:bg-orange text-white text-sm sm:text-base font-medium py-3 px-4 sm:py-3.5 sm:px-6  ">
                      Show me more
                    </button>
                  </div>
                </div>
                {/* Right */}
                <div className="right_cont w-full space-y-7 mt-24 lg:mt-0 lg:w-2/5 lg:pl-10 xl:pl-0 xl:w-1/3 ">
                  {/* Heading and Tags Container */}
                  <div className="rounded-3xl overflow-hidden bg-[rgb(242,242,242)]">
                    {/* heading */}
                    <WidgetHeading heading_text="Tags" view_all_link="#" />

                    {/* Tags Container */}
                    <div className="flex flex-wrap p-4 xl:p-5">
                      <WidgetTags
                        tag_text="Admin"
                        tag_link="#"
                        tot_articles="20"
                      />
                      <WidgetTags
                        tag_text="Educators"
                        tag_link="#"
                        tot_articles="10"
                      />
                      <WidgetTags
                        tag_text="Pupils"
                        tag_link="#"
                        tot_articles="15"
                      />
                      <WidgetTags
                        tag_text="Parents"
                        tag_link="#"
                        tot_articles="25"
                      />
                      <WidgetTags
                        tag_text="Events"
                        tag_link="#"
                        tot_articles="20"
                      />
                    </div>
                  </div>
                  {/* Popular posts */}
                  <div className="rounded-3xl overflow-hidden bg-[rgb(242,242,242)]">
                    <WidgetHeading
                      heading_text="Popular Posts"
                      view_all_link="#"
                    />
                    {/* popular post posts cont */}
                    <div className="flex flex-col divide-y divide-neutral-200">
                      <PopularPostCard
                        popular_post_tag="#"
                        popular_post_heading="Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus nemo excepturi saepe."
                        popular_post_image="https://img.freepik.com/free-photo/medium-shot-family-together-home_23-2149160316.jpg?t=st=1713113078~exp=1713116678~hmac=7e887d6b596123021b0dbf4862433f546d89337fba9852c23088f966df9853fb&w=360"
                      />
                      <PopularPostCard
                        popular_post_tag="#"
                        popular_post_heading="Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus nemo excepturi saepe."
                        popular_post_image="https://img.freepik.com/free-photo/medium-shot-family-together-home_23-2149160316.jpg?t=st=1713113078~exp=1713116678~hmac=7e887d6b596123021b0dbf4862433f546d89337fba9852c23088f966df9853fb&w=360"
                      />
                      <PopularPostCard
                        popular_post_tag="#"
                        popular_post_heading="Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus nemo excepturi saepe."
                        popular_post_image="https://img.freepik.com/free-photo/medium-shot-family-together-home_23-2149160316.jpg?t=st=1713113078~exp=1713116678~hmac=7e887d6b596123021b0dbf4862433f546d89337fba9852c23088f966df9853fb&w=360"
                      />
                      <PopularPostCard
                        popular_post_tag="#"
                        popular_post_heading="Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus nemo excepturi saepe."
                        popular_post_image="https://img.freepik.com/free-photo/medium-shot-family-together-home_23-2149160316.jpg?t=st=1713113078~exp=1713116678~hmac=7e887d6b596123021b0dbf4862433f546d89337fba9852c23088f966df9853fb&w=360"
                      />
                    </div>
                  </div>

                  {/* Trending Topic */}
                  <div className="rounded-3xl overflow-hidden bg-[rgb(242,242,242)]">
                    <WidgetHeading
                      heading_text="Trending Topic"
                      view_all_link="#"
                    />

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
              </div>
            </SectionCont>
          </Wrapper>

          <Footer />
        </div>
      </div>
    </>
  )
}

Blog.getLayout = function getLayout(page: React.ReactNode) {
  return <HomeLayout>{page}</HomeLayout>
}

export default Blog
