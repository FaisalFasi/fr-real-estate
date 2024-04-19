import React, { useEffect } from "react";
import ListComp from "../../components/ListComp/ListComp";
import "./profile.scss";
import Chat from "../../components/Chat/Chat";
import apiRequest from "../../lib/apiRequest";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";

const Profile = () => {
  const { currentUserInfo, updateUser } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await apiRequest.post("/auth/logout");

      // remove user from local storage and redirect to home page
      // removing user also removes the cookie (token)
      updateUser(null);
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="profilePage">
      <div className="details">
        <div className="wrapper">
          <div className="title">
            <h1>User Information</h1>
            <Link to="/profile/update">
              <button>Update Profile</button>
            </Link>
          </div>
          <div className="info">
            <span>
              Avatar:
              <img
                src={currentUserInfo?.avatar || "/noavatar.jpg"}
                alt="User Image"
              />
            </span>
            <span>
              Username: <b>{currentUserInfo?.username}</b>
            </span>
            <span>
              Email: <b> {currentUserInfo?.email}</b>
            </span>
            <button onClick={handleLogout}>Logout</button>
          </div>
          <div className="title">
            <h1>My List</h1>
            <Link to="/add">
              <button>Create New Post</button>
            </Link>
          </div>
          <ListComp />
          <div className="title">
            <h1>Saved List</h1>
          </div>
          <ListComp />
        </div>
      </div>
      <div className="chatContainer">
        <div className="wrapper">
          <Chat />
        </div>
      </div>
    </div>
  );
};

export default Profile;
