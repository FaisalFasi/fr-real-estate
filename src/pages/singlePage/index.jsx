import React from "react";
import "./singlePage.scss";
import Slider from "../../components/Slider/Slider";
import { singlePostData } from "../../lib/dummydata";
import { userData } from "../../lib/dummydata";

const SinglePage = () => {
  console.log(singlePostData);
  return (
    <div className="singlePage">
      <div className="details">
        <div className="wrapper">
          <Slider images={singlePostData[0].images} />
          <div className="info">
            <div className="top">
              <div className="post">
                <h1>{singlePostData[0].title}</h1>
                <div className="address">
                  <img src="/pin.png" alt="pin image" />
                  <span>{singlePostData[0].address}</span>
                </div>
                <div className="price">$ {singlePostData[0].price}</div>
              </div>
              <div className="user">
                <img src={userData.image} alt="image" />
                <span>{userData.name}</span>
              </div>
            </div>
            <div className="bottom">{singlePostData[0].description}</div>
          </div>
        </div>
      </div>
      <div className="features">
        <div className="wrapper"></div>
      </div>
    </div>
  );
};

export default SinglePage;
