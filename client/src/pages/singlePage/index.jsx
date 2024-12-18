import React, { useContext, useEffect, useState } from "react";
import "./singlePage.scss";
import Slider from "../../components/Slider/Slider";
import Map from "../../components/Map/Map";
import { useLoaderData } from "react-router-dom";
import DOMPurify from "dompurify";
import { AuthContext } from "../../context/AuthContext";
import apiRequest from "../../lib/apiRequest.js";
import ChatModal from "../../components/ChatModal/ChatModal.jsx";

const SinglePage = () => {
  const post = useLoaderData();
  const [saved, setSaved] = useState(post.isSaved);
  const { currentUserInfo } = useContext(AuthContext);
  const [isOpenModal, setIsOpenModal] = useState(false);

  const handleCloseModal = () => {
    setIsOpenModal(false);
  };
  const handleOpenModal = () => {
    if (!currentUserInfo) return alert("Please login to start a chat");
    else setIsOpenModal(true);
  };
  const res = useLoaderData();

  const handleSave = async () => {
    // After react 19 update to useOptimisticReact Hook
    if (!currentUserInfo) {
      alert("Please login to save the post");
      // navigate("/login");
      return;
    }

    // Toggle saved state optimistically
    setSaved((prev) => !prev);

    try {
      const response = await apiRequest.post("users/save", { postId: post.id });

      // Check response status and handle success
      if (response.status === 200) {
        alert("Post saved successfully.");
      }
    } catch (error) {
      console.error("Error saving post:", error);

      // Revert saved state if save operation fails
      setSaved((prev) => !prev);

      // Display error message to user
      alert("Failed to save post. Please try again later."); // Use appropriate UI for error display
    }
  };

  return (
    <div className="singlePage">
      <div className="details">
        <div className="wrapper">
          <Slider images={post?.images} />
          <div className="info">
            <div className="top">
              <div className="post">
                <h1>
                  {post.title.length <= 30
                    ? post.title
                    : `${post.title.slice(0, 30)}...`}
                </h1>
                <div className="address">
                  <img src="/pin.png" alt="pin image" />
                  <span>{post.address}</span>
                </div>
                <div className="price">$ {post.price}</div>
              </div>
              <div className="user">
                <img src={post?.user?.avatar || "/noavatar.jpg"} alt="image" />
                <span>{post.user.username}</span>
              </div>
            </div>
            <div
              className="bottom"
              // what does the DOMPurify.sanitize do?
              // It sanitizes the HTML string and removes any malicious code from it.
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(post.postDetail.description),
              }}
            ></div>
          </div>
        </div>
      </div>
      <div className="features">
        <div className="wrapper">
          <h3 className="title">General</h3>
          <div className="listVertical">
            <div className="feature">
              <img src="/utility.png" alt="feature image" />
              <div className="featureText">
                <span>Utilities</span>
                {post.postDetail.utilities === "owner" ? (
                  <p>Owner is responsible</p>
                ) : (
                  <p>Tenant is responsible</p>
                )}
              </div>
            </div>
            <div className="feature">
              <img src="/pet.png" alt="pet image" />
              <div className="featureText">
                <span>Pet Policy</span>
                {post.postDetail.pet === "allowed" ? (
                  <p>Pets are allowed</p>
                ) : (
                  <p>Pets are not allowed</p>
                )}
              </div>
            </div>
            <div className="feature">
              <img src="/fee.png" alt="fee image" />
              <div className="featureText">
                <span>Income Policy </span>
                <p>{post.postDetail.income}</p>
              </div>
            </div>
          </div>
          <h3 className="title"> Sizes</h3>
          <div className="sizes">
            <div className="size">
              <img src="/size.png" alt="size image" />
              <span>{post.postDetail.size} sqft</span>
            </div>
            <div className="size">
              <img src="/bed.png" alt="bed image" />
              <span>{post.bedroom} beds</span>
            </div>
            <div className="size">
              <img src="/bath.png" alt="bath image" />
              <span>{post.bathroom} bathroom</span>
            </div>
          </div>
          <h3 className="title">Nearby Places </h3>
          <div className="listHorizontal">
            <div className="feature">
              <img src="/school.png" alt="school image" />
              <div className="featureText">
                <span>School</span>
                <p>{post.postDetail.school}m away</p>
              </div>
            </div>
            <div className="feature">
              <img src="/pet.png" alt="pet image" />
              <div className="featureText">
                <span>Bus Stop</span>
                <p>{post.postDetail.bus}m away</p>
              </div>
            </div>
            <div className="feature">
              <img src="/restaurant.png" alt="restaurant image" />
              <div className="featureText">
                <span>Restaurant</span>
                <p>{post.postDetail.restaurant}m away</p>
              </div>
            </div>
          </div>
          <h3 className="title">Location</h3>
          <div className="mapContainer">
            <Map items={post} />
          </div>
          {post?.userId != currentUserInfo?.id && (
            <div className="buttons">
              <button onClick={handleOpenModal} className="p-2 rounded-md">
                <img src="/chat.png" alt="chat icon" />
                <label htmlFor="">Send a Message</label>
              </button>
              <button
                onClick={handleSave}
                className={`p-2 rounded-md hover:bg-[#00d5ff] ${
                  saved ? "bg-[#00ff7b]" : ""
                }`}
              >
                <img src="/save.png" alt="save icon" />
                <label htmlFor="">
                  {saved ? "Place is Saved" : "Save The Place"}
                </label>
              </button>
            </div>
          )}
        </div>
      </div>

      <ChatModal
        isOpen={isOpenModal}
        onClose={handleCloseModal}
        postId={post?.id}
        // postOwner={postOwner} // Pass the recipient user info
        recipientUserId={post?.userId} // Pass the recipient user ID
        currentUserInfo={currentUserInfo} // Pass current user info
      />
    </div>
  );
};

export default SinglePage;
