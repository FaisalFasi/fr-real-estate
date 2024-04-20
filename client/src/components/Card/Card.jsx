import React from "react";
import { Link } from "react-router-dom";
import "./card.scss";

const Card = ({ item }) => {
  console.log(item.img);
  return (
    <div className="card">
      <Link to={`${item.id}`} className="imageContainer">
        <img src={item?.images[0] || "/noavatar.jpg"} alt={item.title} />
      </Link>
      <div className="textContainer">
        <h2 className="title">
          {item.title.length > 50
            ? item.title.slice(0, 50) + "..."
            : item.title}
        </h2>
        <p className="address">
          <img src="/pin.png" alt="" />
          <span>{item.address}</span>
        </p>
        <p className="price"> ${item.price}</p>
        <div className="bottom">
          <div className="features">
            <div className="feature">
              <img src="/bed.png" alt="Bed room Image" />
              <span>{item.bedroom} bedroom</span>
            </div>
            <div className="feature">
              <img src="/bath.png" alt="Bath room Image" />
              <span>{item.bedroom} bedroom</span>
            </div>
          </div>
          <div className="icons">
            <div className="icon">
              <img src="/save.png" alt="Save for later image" />
            </div>
            <div className="icon">
              <img src="/chat.png" alt="Chat image" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
