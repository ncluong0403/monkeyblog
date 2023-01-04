import userEvent from "@testing-library/user-event";
import React from "react";
import { useEffect } from "react";
import styled from "styled-components";
import PostCategory from "./PostCategory";
import PostImage from "./PostImage";
import PostMeta from "./PostIMeta";
import PostTitle from "./PostTitle";
const PostItemStyles = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  .post {
    &-image {
      height: 202px;
      margin-bottom: 20px;
      display: block;
      border-radius: 16px;
    }
    &-category {
      margin-bottom: 10px;
    }
    &-title {
      margin-bottom: 10px;
    }
  }
`;

const PostItem = ({ post = "" }) => {
  const formDate = new Date(
    post?.category?.createdAt?.seconds * 1000
  ).toLocaleDateString();

  if (!post) return null;
  return (
    <PostItemStyles>
      <PostImage
        src={post?.image}
        alt="unsplash"
        to={`/${post.slug}`}
      ></PostImage>
      <PostCategory to={`/${post.category.slug}`}>
        {post?.category?.name}
      </PostCategory>
      <PostTitle to={`/${post.title}`}>{post?.title}</PostTitle>
      <PostMeta
        to={`/${post.user.username}`}
        date={formDate}
        authorName={post?.user?.username}
      ></PostMeta>
    </PostItemStyles>
  );
};

export default PostItem;
