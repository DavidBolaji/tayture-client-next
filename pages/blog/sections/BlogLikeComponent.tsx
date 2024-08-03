"use client"
import React, { useEffect } from 'react';
import LikesCom from '../components/LikesCom';
import { Blog, Categories, Like } from '@prisma/client';

const BlogLikeComponent: React.FC<{
  top?: boolean;
  blog: Blog & { categories: Categories } & { likes: Like[] } & {
    comment: Comment[]
  };
  likes: number;
  setLikes: (likes: number) => void;
  comments: number;
  setComments: (comments: number) => void;
}> = ({ top = true, blog, likes, setLikes, comments, setComments }) => {
  useEffect(() => {
    setComments(blog.comment.length);
  }, [blog]);

  return (
    <>
      {top ? (
        <LikesCom
          likes_num={likes}
          comments_num={`${comments}`}
          bg_color="none"
          is_share={true}
          update={(like) => setLikes(like)}
        />
      ) : (
        <LikesCom
          likes_num={likes}
          comments_num={`${comments}`}
          bg_color="none"
          is_share={true}
          update={(like) => setLikes(like)}
        />
      )}
    </>
  );
};

export default BlogLikeComponent;
