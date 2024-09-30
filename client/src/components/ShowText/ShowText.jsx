import React from "react";
import "./showText.scss";

const ShowText = ({ message }) => {
  return (
    <div className="no-posts-card">
      <p>{message}</p>
    </div>
  );
};

export default ShowText;
