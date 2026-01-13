import React from "react";
import { useState, useEffect } from "react";
import "./navbar.scss";
import { Link, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNotificationStore } from "../../lib/notificationStore.js";
import MobileNavbar from "../MobileNavbar/MobileNavbar";
const links = [
  { path: "/", label: "Home" },
  { path: "/about", label: "About" },
  { path: "/contact", label: "Contact" },
  { path: "/agents", label: "Agents" },
];

const Navbar = () => {
  const currentPath = useLocation().pathname;

  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const { currentUserInfo } = useContext(AuthContext);
  const fetchNotifications = useNotificationStore((state) => state.fetch);
  const number = useNotificationStore((state) => state.number);

  if (currentUserInfo) fetchNotifications();

  return (
    <nav>
      <div className="left">
        <Link to="/" className="logo">
          <img src="/frEstate.png" alt="logo" />
          <span>FR-ESTATE</span>
        </Link>
        <div className="links">
          {links.map(({ path, label }) => (
            <Link
              key={path}
              to={path}
              className={currentPath === path ? "active" : ""}
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
      <div className="right">
        {currentUserInfo ? (
          <div className="user">
            <div className="userName">
              <img
                src={currentUserInfo.avatar || "/noavatar.jpg"}
                alt="user image"
              />
              <span>{currentUserInfo.username}</span>
            </div>
            <Link to="/profile" className="profile">
              {number > 0 && <div className="notification">{number}</div>}
              <span>Profile</span>
            </Link>
          </div>
        ) : (
          <div className="loginButtons">
            <Link to="/login"> Sign in</Link>
            <Link to="/register" className="register">
              Sign up
            </Link>
          </div>
        )}
        <div className="menuIcon">
          <img
            src="/menu.png"
            alt="menu"
            onClick={toggleDrawer("right", true)}
          />
        </div>
        <MobileNavbar
          anchor="right"
          state={state}
          toggleDrawer={toggleDrawer}
          currentUserInfo={currentUserInfo}
        />
      </div>
    </nav>
  );
};

export default Navbar;
