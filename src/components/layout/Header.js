import { signOut } from "firebase/auth";
import IconMenu from "icon/IconMenu";
import Sidebar from "module/dashboard/Sidebar";
import React, { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import styled from "styled-components";
import { useAuth } from "../../context/auth-context";
import { auth } from "../../firebase-app/firebase-config";
import Button from "../button/Button";
const menuLink = [
  {
    id: 1,
    url: "/",
    title: "Home",
  },
  {
    id: 2,
    url: "/blog",
    title: "Blog",
  },
  {
    id: 3,
    url: "/contact",
    title: "Contact",
  },
];

const HeaderStyles = styled.header`
  padding: 30px;
  .header-main {
    display: flex;
    align-items: center;
  }
  .logo {
    max-width: 40px;
  }
  .menu {
    display: flex;
    margin-left: 40px;
    gap: 40px;
    font-weight: 600;
  }
  .search {
    margin-left: auto;
    flex: 1;
    width: 100%;
    max-width: 320px;
    position: relative;
    margin-right: 20px;
  }
  .input-search {
    border: 1px solid #cfcfcf;
    padding: 15px 25px;
    border-radius: 8px;
    width: 100%;
    padding-right: 45px;
  }
  .icon-search {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 15px;
  }
  .header-auth {
    display: flex;
    align-items: center;
  }
`;
const Header = () => {
  const { userInfo } = useAuth();
  const [show, setShow] = useState(false);
  const handleShowMenu = (e) => {
    setShow(!show);
  };
  return (
    <HeaderStyles>
      <div className="container">
        <div className="header-main relative">
          <NavLink to="/">
            <img srcSet="/logo.png 2x" alt="monkey blogging" className="logo" />
          </NavLink>
          <ul className="menu">
            {menuLink.length > 0 &&
              menuLink.map((item) => (
                <li className="menu-item" key={item.id}>
                  <NavLink to={item.url}>{item.title}</NavLink>
                </li>
              ))}
          </ul>
          <div className="search">
            <input
              type="text"
              placeholder="Search posts..."
              className="input-search"
            />
            <span className="icon-search">
              <svg
                width="18"
                height="17"
                viewBox="0 0 18 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <ellipse
                  cx="7.66669"
                  cy="7.05161"
                  rx="6.66669"
                  ry="6.05161"
                  stroke="#999999"
                  strokeWidth="1.5"
                />
                <path
                  d="M17.0001 15.5237L15.2223 13.9099L14.3334 13.103L12.5557 11.4893"
                  stroke="#999999"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <path
                  d="M11.6665 12.2964C12.9671 12.1544 13.3706 11.8067 13.4443 10.6826"
                  stroke="#999999"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </div>
          {!userInfo ? (
            <Button
              type="button"
              className="header-button"
              height="56px"
              to="/sign-in"
            >
              Login
            </Button>
          ) : (
            <div className="header-auth">
              <Button
                type="button"
                height="56px"
                className="ml-6 font-medium text-sm"
                kind="primary"
                to="/dashboard"
              >
                Dashboard
              </Button>
            </div>
          )}
          <IconMenu onClick={handleShowMenu}></IconMenu>
          {show && (
            <div className="absolute top-2/4 -right-[50px]">
              <Sidebar></Sidebar>
            </div>
          )}
        </div>
      </div>
    </HeaderStyles>
  );
};

export default Header;
