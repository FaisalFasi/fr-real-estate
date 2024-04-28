import React from "react";
import { useState } from "react";
import "./navbar.scss";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNotificationStore } from "../../lib/notificationStore";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { currentUserInfo } = useContext(AuthContext);

  const fetch = useNotificationStore((state) => state.fetch);
  const number = useNotificationStore((state) => state.number);

  if (currentUserInfo) fetch();

  return (
    <nav>
      <div className="left">
        <a href="/" className="logo">
          <img src="/logo.png" alt="logo" />
          <span>FR-ESTATE</span>
        </a>
        <a href="">Home</a>
        <a href="">About</a>
        <a href="">Contact</a>
        <a href="">Agents</a>
      </div>
      <div className="right">
        {currentUserInfo ? (
          <div className="user">
            <img
              src={currentUserInfo.avatar || "/noavatar.jpg"}
              alt="user image"
            />
            <span>{currentUserInfo.username}</span>
            <Link to="/profile" className="profile">
              {number > 0 && <div className="notification">{number}</div>}{" "}
              <span>Profile</span>
            </Link>
          </div>
        ) : (
          <div className="loginButtons">
            <a href="/login"> Sign in</a>
            <a href="/register" className="register">
              Sign up
            </a>
          </div>
        )}
        <div className="menuIcon">
          <img
            src="/menu.png"
            alt="menu"
            onClick={() => setOpen((prev) => !prev)}
          />
        </div>
        <div className={open ? "menu active" : "menu"}>
          <a href="">Home</a>
          <a href="">About</a>
          <a href="">Contact</a>
          <a href="">Agents</a>
          <a href="">Sign in </a>
          <a href="">Sign up</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
