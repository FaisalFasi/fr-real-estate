import React, { useEffect } from "react";
import "./layout.scss";
import { Navigate, Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const Layout = () => {
  return (
    <div className="layout">
      <div className="navbar">
        <Navbar />
      </div>
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
};

const RequireAuth = () => {
  const { currentUserInfo } = useContext(AuthContext);

  if (!currentUserInfo) {
    <Navigate to="/login" />;
  }

  return (
    currentUserInfo && (
      <div className="layout">
        <div className="navbar">
          <Navbar />
        </div>
        <div className="content">
          <Outlet />
        </div>
      </div>
    )
  );
};

export { Layout, RequireAuth };
