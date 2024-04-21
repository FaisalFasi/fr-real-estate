import React from "react";
import "./singlePage.scss";
import Slider from "../../components/Slider/Slider";
// import { singlePostData, userData, listData } from "../../lib/dummydata";
import Map from "../../components/Map/Map";
import { useLoaderData } from "react-router-dom";
import DOMPurify from "dompurify";

const SinglePage = () => {
  // const data = listData;

  const post = useLoaderData();
  console.log(post);

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
                <img src={post.user.avatar || "/noavatar.jpg"} alt="image" />
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
              <span>{post.postDetail.size}sqft</span>
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
            <button>
              <img src="/save.png" alt="save icon" />
              Save the Place
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SinglePage;
