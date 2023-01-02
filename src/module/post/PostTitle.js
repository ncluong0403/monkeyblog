import React from "react";
import { NavLink } from "react-router-dom";
import styled, { css } from "styled-components";
const PostTitleStyles = styled.h3`
  font-weight: bold;
  line-height: 1.5;
  display: block;
  ${(props) =>
    props.size === "small" &&
    css`
      font-size: 18px;
    `};
  ${(props) =>
    props.size === "large" &&
    css`
      font-size: 22px;
    `};
`;
const PostTitle = ({ children, className = "", size = "small", to = "/" }) => {
  return (
    <PostTitleStyles className={`post-title ${className}`} size={size}>
      <NavLink to={to}>{children}</NavLink>
    </PostTitleStyles>
  );
};

export default PostTitle;
