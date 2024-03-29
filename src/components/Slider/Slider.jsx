import React from "react";
import "./slider.scss";

const Slider = ({ images }) => {
  return (
    <div className="slider">
      <div className="fullSlider">
        <div className="arrow">
          <img src="/arrow.png" alt="" />
        </div>
        <div className="imgContainer">
          <img src={images[0]} alt="" />
        </div>
        <div className="arrow">
          <img src="/arrow.png" alt="" className="right" />
        </div>
        <div className="close">X</div>
      </div>
      <div className="bigImage">
        <img src={images[1]} alt="image" />
      </div>
      <div className="smallImages">
        {images.slice(0).map((image, index) => (
          <img key={index} src={image} alt="image" />
        ))}
      </div>
    </div>
  );
};

export default Slider;
