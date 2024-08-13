import React from "react";
import { Link } from "react-router-dom";
import "./card.scss";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useState } from "react";
import ChatModal from "../ChatModal/ChatModal";

const Card = ({ item, isSaved, onUnsavePost }) => {
  const { currentUserInfo } = useContext(AuthContext);

  const [isOpenModal, setIsOpenModal] = useState(false);

  console.log("Item", item);
  const handleCloseModal = () => {
    setIsOpenModal(false);
  };
  const handleOpenModal = () => {
    setIsOpenModal(true);
  };

  const handleUnsaveClick = () => {
    if (onUnsavePost) {
      onUnsavePost(item.id);
    }
  };

  console.log("Item", item);
  return (
    <div className="card">
      {/* <div onClick={handleOpenModal}>Open modal </div>{" "} */}
      <Link to={`/${item.id}`} className="imageContainer">
        <img src={item?.images[0] || "/noavatar.jpg"} alt={item.title} />
      </Link>
      <div className="textContainer">
        <Link to={`/${item.id}`}>
          <h2 className="title">
            {item.title.length > 50
              ? item.title.slice(0, 50) + "..."
              : item.title}
          </h2>
        </Link>
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
              <span>{item.bathroom} bathroom</span>
            </div>
          </div>
          {item?.userId != currentUserInfo?.id && (
            <div className="icons">
              <div
                className={`${isSaved ? "bg-green-300" : ""} icon`}
                onClick={handleUnsaveClick}
              >
                <img src="/save.png" alt="Save for later image" />
              </div>
              <div className="icon" onClick={handleOpenModal}>
                <img src="/chat.png" alt="Chat image" />
              </div>
            </div>
          )}
        </div>
      </div>
      <div>
        {/* <ChatModal isOpen={isOpenModal} onClose={handleCloseModal} /> */}
        <ChatModal
          isOpen={isOpenModal}
          onClose={handleCloseModal}
          postId={item?.id}
          recipientUserId={item?.userId} // Pass the recipient user ID
          recipientUsername={item?.user?.username} // Pass the recipient username
          currentUserInfo={currentUserInfo} // Pass current user info
        />
      </div>
    </div>
  );
};

export default Card;
