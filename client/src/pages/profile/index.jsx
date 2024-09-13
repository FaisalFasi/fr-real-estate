import React, { Suspense } from "react";
import ListComp from "../../components/ListComp/ListComp";
import "./profile.scss";
import Chat from "../../components/Chat/Chat";
import apiRequest from "../../lib/apiRequest.js";
import { useLoaderData, useNavigate, Await } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import { usePostsContext } from "../../context/PostsContext.jsx";

const Profile = () => {
  const { currentUserInfo, updateUser } = useContext(AuthContext);

  const data = useLoaderData();
  const navigate = useNavigate();

  const {
    savedPosts: savedPostsByContext,
    unsavePost,
    handleDeletePost,
  } = usePostsContext();

  const handleLogout = async () => {
    try {
      await apiRequest.post("/auth/logout");
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
                  <ListComp
                    posts={postResponse.data.allPosts}
                    handleDeletePost={handleDeletePost}
                  />
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
                    posts={savedPostsByContext}
                    postOwner={data?.postResponse?.data?.postOwner}
                    isSaved={true}
                    onUnsavePost={unsavePost}
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
