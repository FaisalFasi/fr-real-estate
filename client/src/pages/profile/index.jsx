import React, { Suspense } from "react";
import ListComp from "../../components/ListComp/ListComp";
import "./profile.scss";
import Chat from "../../components/Chat/Chat";
import apiRequest from "../../lib/apiRequest.js";
import { useLoaderData, useNavigate, Await } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const Profile = () => {
  const { currentUserInfo, updateUser } = useContext(AuthContext);

  const data = useLoaderData();
  const navigate = useNavigate();

  const [savedPosts, setSavedPosts] = useState(
    data.postResponse ? data.postResponse.data.savedPosts : []
  );

  useEffect(() => {
    if (data.postResponse) {
      setSavedPosts(data.postResponse.data.savedPosts);
    }
  }, [data.postResponse]);

  const handleLogout = async () => {
    try {
      await apiRequest.post("/auth/logout");

      // remove user from local storage and redirect to home page
      // removing user also removes the cookie (token)
      console.log("Logout Response:  ");

      updateUser(null);
      navigate("/");
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  // Check if user is authenticated
  if (!currentUserInfo) {
    // Redirect unauthenticated users to login page
    navigate("/");
    return null; // Optionally render a loading spinner or message
  }

  // handle unsave post
  const handleUnsavePost = async (postId) => {
    // Optimistically update the state
    setSavedPosts((prevPosts) =>
      prevPosts.filter((post) => post.id !== postId)
    );

    try {
      const response = await apiRequest.post("users/save", { postId });

      if (response.status !== 200) {
        throw new Error("Failed to unsave post");
      }
      console.log("Post unsaved successfully:", response.data);
      alert("Post unsaved successfully");
    } catch (error) {
      console.error("Error unsaving post:", error);
      // Revert state if unsave operation fails
      setSavedPosts((prevPosts) => [...prevPosts, { id: postId }]);
      alert("Failed to unsave post. Please try again later.");
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
            {/* <ListComp /> */}

            <h1>My Posts</h1>
            <Link to="/add">
              <button>Create New Post</button>
            </Link>
          </div>
          <div className="postsComponents">
            <Suspense fallback={<p>Loading...</p>}>
              <Await
                resolve={data.postResponse}
                errorElement={<p>Failed to load data</p>}
              >
                {(postResponse) => (
                  <ListComp posts={postResponse.data.allPosts} />
                )}
              </Await>
            </Suspense>
          </div>

          {/* <ListComp /> */}
          <div className="title">
            <h1>Saved List</h1>
          </div>
          <div className="postsComponents">
            <Suspense fallback={<p>Loading...</p>}>
              <Await
                resolve={data.postResponse}
                errorElement={<p>Failed to load data</p>}
              >
                {(postResponse) => (
                  <ListComp
                    // posts={postResponse.data.savedPosts}
                    posts={savedPosts}
                    isSaved={true}
                    onUnsavePost={handleUnsavePost}
                  />
                )}
              </Await>
            </Suspense>
          </div>
        </div>
      </div>
      <div className="chatContainer">
        <div className="wrapper">
          <Suspense fallback={<p>Loading...</p>}>
            <Await
              resolve={data.chatResponse}
              errorElement={<p>Failed to load chats!</p>}
            >
              {(chatResponse) => {
                return <Chat chats={chatResponse.data} />;
              }}
            </Await>
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default Profile;
