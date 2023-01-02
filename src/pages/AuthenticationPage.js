import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
const AuthenticationPageStyles = styled.div`
  padding: 40px;
  .logo {
    margin: 0 auto 20px;
  }
  .heading {
    font-size: 40px;
    color: ${(props) => props.theme.primary};
    text-align: center;
    font-weight: 600;
    margin-bottom: 60px;
  }
  .form {
    max-width: 600px;
    margin: 0 auto;
  }
  .have-account {
    margin-bottom: 25px;
    display: flex;
    justify-content: end;
    gap: 5px;
    a {
      color: ${(props) => props.theme.primary};
      font-size: 16px;
      font-weight: 600;
    }
  }
`;
const AuthenticationPage = ({ children }) => {
  return (
    <AuthenticationPageStyles>
      <div className="container">
        <NavLink to={"/"}>
          <img srcSet="/logo.png 2x" alt="Monkey Blogging" className="logo" />
        </NavLink>
        <h1 className="heading">Monkey Blogging</h1>
      </div>
      {children}
    </AuthenticationPageStyles>
  );
};

export default AuthenticationPage;
