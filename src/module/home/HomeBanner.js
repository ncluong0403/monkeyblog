import React from "react";
import styled from "styled-components";
import Button from "../../components/button/Button";
const HomeBannerStyles = styled.div`
  min-height: 520px;
  background-image: linear-gradient(
    to right bottom,
    ${(props) => props.theme.primary},
    ${(props) => props.theme.secondary}
  );
  .banner {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 40px;
    height: 100%;
    &-content {
      max-width: 600px;
      margin-right: 40px;
      color: white;
    }
    &-heading {
      font-size: 40px;
      font-weight: 800;
      margin-top: 50px;
      margin-bottom: 20px;
    }
    &-desc {
      font-size: 14px;
      margin-bottom: 20px;
      line-height: 1.75;
    }
    &-img {
      flex: 1;
    }
  }
`;
const HomeBanner = () => {
  return (
    <HomeBannerStyles>
      <div className="container">
        <div className="banner">
          <div className="banner-content">
            <div className="banner-heading">Monkey Blogging</div>
            <div className="banner-desc">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Praesentium illum quisquam ipsum dolorem, quo voluptatum quidem
              dolore nobis quas hic, atque consequuntur fugit in dicta tempore
              id ea, quod eum. Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Sed ab quasi praesentium harum odio alias vitae
              autem sunt possimus voluptatum eaque soluta similique neque ipsa,
              eum fugit veniam, dolore reiciendis!
            </div>
            <Button kind="secondary" to="/sign-up">
              Get Started
            </Button>
          </div>
          <div className="banner-img">
            <img src="/banner.png" alt="" />
          </div>
        </div>
      </div>
    </HomeBannerStyles>
  );
};

export default HomeBanner;
