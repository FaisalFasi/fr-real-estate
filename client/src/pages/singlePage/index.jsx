import React from "react";
import "./singlePage.scss";
import Slider from "../../components/Slider/Slider";
import { singlePostData, userData, listData } from "../../lib/dummydata";
import Map from "../../components/Map/Map";

const SinglePage = () => {
  const data = listData;

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
        <div className="wrapper">
          <p className="title">General</p>
          <div className="listVertical">
            <div className="feature">
              <img src="/utility.png" alt="feature image" />
              <div className="featureText">
                <span>Utilities</span>
                <p>Renter is responsible</p>
              </div>
            </div>
            <div className="feature">
              <img src="/pet.png" alt="pet image" />
              <div className="featureText">
                <span>Pet Policy</span>
                <p>Pet Allowed</p>
              </div>
            </div>
            <div className="feature">
              <img src="/fee.png" alt="fee image" />
              <div className="featureText">
                <span>Property Fees</span>
                <p>Must have 3x the rent in total household income</p>
              </div>
            </div>
          </div>
          <p className="title"> Sizes</p>
          <div className="sizes">
            <div className="size">
              <img src="/size.png" alt="size image" />
              <span>80sqft</span>
            </div>
            <div className="size">
              <img src="/bed.png" alt="bed image" />
              <span>2 beds</span>
            </div>
            <div className="size">
              <img src="/bath.png" alt="bath image" />
              <span>1 bathroom</span>
            </div>
          </div>
          <p className="title">Nearby Places </p>
          <div className="listHorizontal">
            <div className="feature">
              <img src="/school.png" alt="school image" />
              <div className="featureText">
                <span>School</span>
                <p>250m away</p>
              </div>
            </div>
            <div className="feature">
              <img src="/pet.png" alt="pet image" />
              <div className="featureText">
                <span>Bus Stop</span>
                <p>150m away</p>
              </div>
            </div>
            <div className="feature">
              <img src="/restaurant.png" alt="restaurant image" />
              <div className="featureText">
                <span>Restaurant</span>
                <p>500m away</p>
              </div>
            </div>
          </div>
          <p className="title">Location</p>
          <div className="mapContainer">
            <Map items={data} />
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
