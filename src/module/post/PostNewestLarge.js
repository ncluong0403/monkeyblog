import React from "react";
import styled from "styled-components";
import PostCategory from "./PostCategory";
import PostImage from "./PostImage";
import PostMeta from "./PostIMeta";
import PostTitle from "./PostTitle";
const PostNewestLargeStyles = styled.div`
  .post {
    &-image {
      display: block;
      margin-bottom: 16px;
      height: 433px;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 16px;
      }
    }
    &-category {
      margin-bottom: 10px;
    }
    &-title {
      margin-bottom: 10px;
    }
  }
`;

const PostNewestLarge = ({ data }) => {
  const formDate = new Date(
    data?.category?.createdAt?.seconds * 1000
  ).toLocaleDateString();
  if (!data) return;
  return (
    <PostNewestLargeStyles>
      <PostImage
        src={data.image}
        alt="unsplash"
        to={`/${data.slug}`}
      ></PostImage>
      <PostCategory className="post-category">
        {data?.category?.name}
      </PostCategory>
      <PostTitle size="large">{data.title}</PostTitle>
      <PostMeta date={formDate} authorName={data.user.username}></PostMeta>
    </PostNewestLargeStyles>
  );
};

export default PostNewestLarge;
