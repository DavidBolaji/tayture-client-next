import React, { useState } from 'react';

import HeadingDescSB from './components/singleBlogComponents/HeadingDescSB';
import Wrapper from '@/components/Wrapper/Wrapper';
import HomeLayout from '@/components/layouts/HomeLayout';
// import NewsletterSection from './components/Newsletter/NewsletterSection';
import { Footer } from '@/components/Footer';
import Image from 'next/image';

import { Blog, Categories, Like } from '@prisma/client';
import { getRandomColor } from '@/utils/helpers';
import ImgNameDate from './components/NameDate';
import moment from 'moment';
import RenderText from './components/RenderText';
import CategoriesSection from './sections/CategoriesSection';
import AllBlogSection from './sections/AllBlogSection';
import Meta from '../dashboard/profile/components/Meta';
import CommentSection from './sections/CommentSection';
import BlogLikeComponent from './sections/BlogLikeComponent';
import styled from '@emotion/styled';
import BlogTag from './components/BlogTag';
import { Axios } from '@/request/request';

type Props = {
  $bg_color?: string;
  $text_color?: string;
  $hover_bg_color?: string;
  $hover_text_color?: string;
};

const BlogTagStyle = styled(BlogTag)<Props>`
  & {
    background-color: ${({ $bg_color }) => $bg_color || '#000'};
    color: ${({ $text_color }) => $text_color || '#FFF'};
    z-index: 11;
    border-radius: 10px;
    font-size: 0.75rem;
    font-weight: 500;
    line-height: 1rem;
    padding-block: 0.25rem;
    padding-inline: 0.625rem;
    transition-duration: 0.3s;
    transition-property: color, background-color, border-color, text-decoration-color, fill, stroke;
  }

  &:hover {
    background-color: ${({ $hover_bg_color }) => $hover_bg_color || '#EAB308'};
    color: ${({ $hover_text_color }) => $hover_text_color || '#FEF9C3'};
  }
`;

function SingleBlogTemplate({
  blog,
  categories,
}: {
  blog: Blog & { categories: Categories; likes: Like[]; comment: Comment[] };
  categories: Categories[];
}) {

  const [likes, setLikes] = useState(blog?.likes?.length);
  const [comments, setComments] = useState(blog?.comment?.length);

  return (
    <>
      <Meta imageUrl={blog?.banner} title={blog?.title} desc={blog?.except} />
      <div className="bg-blog_bg h-[90vh] overflow-y-scroll no-s" id="sb">
        <div className="bg-blog_bg">
          <Wrapper>
            <div className="SingleBlog pt-8 lg:pt-16">
              <header className="rounded-xl">
                <div className="max-w-screen-md mx-auto">
                  <div>
                    <div className="space-y-5">
                      <div className="nc-CategoryBadgeList flex flex-wrap space-x-2">
                        <BlogTagStyle
                          text={blog?.categories.title}
                          tag_link="#"
                          $bg_color={getRandomColor()}
                          $text_color="#fff"
                          $hover_bg_color={getRandomColor()}
                          $hover_text_color="white"
                        />
                      </div>

                      <HeadingDescSB
                        heading={blog?.title}
                        description={blog?.except}
                      />

                      <div className="w-full border-b border-neutral-200 dark:border-neutral-700"></div>

                      <div className="flex flex-col sm:flex-row justify-between sm:items-end space-y-5 sm:space-y-0 sm:space-x-5">
                        <ImgNameDate
                          authName="Tayture"
                          date={moment(blog?.createdAt).format('MMM DD YYYY')}
                          enableDash={false}
                          isColumn={true}
                          bg_color="#EAB308"
                          authImgCont_wi_hei="2.7rem"
                          is_image={false}
                        />

                        <div className="flex flex-row mx-2.5 items-center">
                          <BlogLikeComponent
                            blog={blog}
                            likes={likes}
                            setLikes={setLikes}
                            comments={comments}
                            setComments={setComments}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </header>

              {/* Image Container */}
              <div className="container my-10 sm:my-12">
                <Image
                  priority
                  src={blog?.banner}
                  width={1060}
                  height={750}

                  alt="single"
                  sizes="(max-width: 1024px) 100vw, 1280px"
                  className="w-full rounded-xl"
                />
              </div>
            </div>

            <div className="container mt-10"></div>

            {/* Content Categories and Comment Section */}
            <div className="relative">
              <div className="prose lg:prose-lg !max-w-screen-md mx-auto text-base font-thin leading-loose">
                <p className="py-5">
                  <RenderText text={blog?.text} />
                </p>
              </div>

              <div className="flex flex-col sm:flex-row justify-between sm:items-end space-y-5 sm:space-y-0 sm:space-x-5 mb-10 max-w-screen-md mx-auto bg-neutral-200 rounded-xl p-4">
                <ImgNameDate
                  authName="Tayture"
                  date={moment(blog?.createdAt).format('MMM DD YYYY')}
                  enableDash={false}
                  isColumn={true}
                  bg_color="#EAB308"
                  authImgCont_wi_hei="2.7rem"
                  is_image={false}
                />

                <div className="flex flex-row mx-2.5 items-center">
                  <BlogLikeComponent
                    blog={blog}
                    likes={likes}
                    setLikes={setLikes}
                    comments={comments}
                    setComments={setComments}
                  />
                </div>
              </div>

              <div className="max-w-screen-md mx-auto flex flex-wrap mt-4">
                <CategoriesSection categories={categories} />
              </div>

              {/* HR */}
              <div className="max-w-screen-md mx-auto border-b border-t border-neutral-200 my-10"></div>

              <CommentSection />
            </div>

            <AllBlogSection />

            {/* <NewsletterSection /> */}
          </Wrapper>

          <Footer />
        </div>
      </div>
    </>
  );
}

export const getStaticProps = async (ctx: any) => {
  const blogId = ctx?.params?.blogId; // Corrected: destructure blogId from ctx.params
  const page = ctx?.query?.page || 1;

  try {
    const [res, res2] = await Promise.all([
      Axios.get(`/blog/${blogId}?page=${page}`),
      Axios.get(`/categories`),
    ]);


    const blog = res?.data?.blog;
    const categories = res2?.data?.category;

    return {
      props: { blog, categories },
      // revalidate: 10,
    };
  } catch (error) {
    console.error('Error fetching data:', (error as any).message);

    return {
      props: {
        blog: null,
        categories: [],
      },
    };
  }
};

export async function getStaticPaths() {
  try {
    const res = await Axios.get('/blog/all');
    const blogs = res.data.blogs;

    const paths = blogs.map((blog: Blog) => ({
      params: { blogId: blog.id }, // Corrected: use blogId instead of id
    }));

    return { paths, fallback: 'blocking' };
  } catch (error) {
    console.error('Error fetching blogs:', (error as any).message);
    return { paths: [], fallback: 'blocking' };
  }
}

SingleBlogTemplate.getLayout = function getLayout(page: React.ReactNode) {
  return <HomeLayout>{page}</HomeLayout>;
};

export default SingleBlogTemplate;
