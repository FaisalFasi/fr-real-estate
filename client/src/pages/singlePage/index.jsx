import React, { useContext, useState } from "react";
import "./singlePage.scss";
import Slider from "../../components/Slider/Slider";
import Map from "../../components/Map/Map";
import { useLoaderData } from "react-router-dom";
import DOMPurify from "dompurify";
import { AuthContext } from "../../context/AuthContext";
import apiRequest from "../../lib/apiRequest.js";
import { useNavigate } from "react-router-dom";

const SinglePage = () => {
  const navigate = useNavigate();
  const post = useLoaderData();
  const [saved, setSaved] = useState(post.isSaved);
  const { currentUserInfo } = useContext(AuthContext);

  const handleSave = async () => {
    // After react 19 update to useOptimisticReact Hook
    if (!currentUserInfo) {
      navigate("/login");
      return;
    }

    // Toggle saved state optimistically
    setSaved((prev) => !prev);

    try {
      const response = await apiRequest.post("users/save", { postId: post.id });

      // Check response status and handle success (if needed)
      if (response.status === 200) {
        console.log("Post saved successfully:", response.data);
        // Optionally update UI or perform additional actions on success
      }

      console.log("Post saved successfully:", response.data);
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
                <h1>{post.title}</h1>
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
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(post.postDetail.description),
              }}
            ></div>
          </div>
        </div>
      </div>
      <div className="features">
        <div className="wrapper">
          <p className="title">General</p>
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
          <p className="title"> Sizes</p>
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
          <p className="title">Nearby Places </p>
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
                <p>{post.postDetail.resturant}m away</p>
              </div>
            </div>
          </div>
          <p className="title">Location</p>
          <div className="mapContainer">
            <Map items={post} />
          </div>
          <div className="buttons">
            <button>
              <img src="/chat.png" alt="chat icon" />
              Send a Message
            </button>
            <button
              onClick={handleSave}
              style={{ backgroundColor: saved ? "#fece51" : "white" }}
            >
              <img src="/save.png" alt="save icon" />
              {saved ? "Place is Saved" : "Save The Place"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SinglePage;
