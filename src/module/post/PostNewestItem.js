import React from "react";
import styled from "styled-components";
import { categoryStatus } from "utils/constants";
import PostCategory from "./PostCategory";
import PostImage from "./PostImage";
import PostMeta from "./PostIMeta";
import PostTitle from "./PostTitle";
const PostNewestItemStyles = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 28px;
  padding-bottom: 28px;
  border-bottom: 1px solid #ccc;
  &:last-child {
    padding-bottom: 0;
    margin-bottom: 0;
    border-bottom: 0;
  }
  .post {
    &-image {
      display: block;
      flex-shrink: 0;
      width: 180px;
      height: 130px;
      border-radius: 10px;
    }
    &-category {
      margin-bottom: 10px;
    }
    &-title {
      margin-bottom: 10px;
    }
  }
`;
const PostNewestItem = ({ data }) => {
  const formDate = new Date(
    data?.category?.createdAt?.seconds * 1000
  ).toLocaleDateString();
  if (!data) return null;
  return (
    <PostNewestItemStyles>
      <PostImage
        src={data.image}
        alt="unsplash"
        to={`/${data.slug}`}
      ></PostImage>
      <div className="post-content">
        <PostCategory type="secondary">{data.category.name}</PostCategory>
        <PostTitle>{data.title}</PostTitle>
        <PostMeta date={formDate} authorName={data.user.username}></PostMeta>
      </div>
    </PostNewestItemStyles>
  );
};

export default PostNewestItem;
