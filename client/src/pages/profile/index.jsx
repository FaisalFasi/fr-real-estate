import React from "react";
import ListComp from "../../components/ListComp/ListComp";
import "./profile.scss";
import Chat from "../../components/Chat/Chat";

const Profile = () => {
  return (
    <div className="profilePage">
      <div className="details">
        <div className="wrapper">
          <div className="title">
            <h1>User Information</h1>
            <button>Update Profile</button>
          </div>
          <div className="info">
            <span>
              Avatar:
              <img
                src="https://images.pexels.com/photos/3778212/pexels-photo-3778212.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="User Image"
              />
            </span>
            <span>
              Username: <b>John Doe</b>
            </span>
            <span>
              Email: <b> JohnDoe@gmail.com</b>
            </span>
          </div>
          <div className="title">
            <h1>My List</h1>
            <button>Create New Post</button>
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
