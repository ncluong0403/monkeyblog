import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
const PostImageStyles = styled.div`
  height: 100%;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 16px;
  }
`;
const PostImage = ({ src = "", alt = "", className = "", to = null }) => {
  if (to) {
    return (
      <NavLink to={to}>
        <PostImageStyles>
          <img
            src={src}
            alt={alt}
            loading="lazy"
            className={`post-image ${className}`}
          />
        </PostImageStyles>
      </NavLink>
    );
  }
  return (
    <PostImageStyles>
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className={`post-image ${className}`}
      />
    </PostImageStyles>
  );
};

export default PostImage;
