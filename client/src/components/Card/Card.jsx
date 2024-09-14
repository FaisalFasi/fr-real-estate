import React from "react";
import { Link } from "react-router-dom";
import "./card.scss";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import Modal from "../Modal/Modal";
import ChatModal from "../ChatModal/ChatModal";

const Card = ({
  item,
  isSaved,
  onUnsavePost,
  onSave,
  postOwner,
  handleDeletePost,
}) => {
  const { currentUserInfo } = useContext(AuthContext);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);

  const handleCloseModal = () => {
    setIsOpenModal(false);
  };
  const handleOpenModal = () => {
    if (!currentUserInfo) return alert("Please login to start a chat");
    else setIsOpenModal(true);
  };

  const handleSaveOrUnsave = () => {
    if (!currentUserInfo) {
      return alert("Please login to save the post");
    }
    if (isSaved) {
      onUnsavePost(item.id);
    } else {
      onSave(item.id);
    }
  };

  const handleOpenDeleteModal = () => {
    setIsOpenDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setIsOpenDeleteModal(false);
  };

  const handleConfirmDelete = () => {
    handleDeletePost(item.id);
    handleCloseDeleteModal();
  };

  if (!item || !item.images) {
    return <div>Loading...</div>; // You can render a loading spinner or skeleton UI here
  }

  if (!item) return <div>Error: No item data</div>;

  return (
    <div className="card">
      {/* <div onClick={handleOpenModal}>Open modal </div>{" "} */}
      <Link to={`/${item?.id}`} className="imageContainer">
        <img
          src={item?.images?.[0] ? item.images[0] : "/noavatar.jpg"}
          alt={item?.title || "No Title"}
        />

        {/* <img src={item?.images[0] || "/noavatar.jpg"} alt={item?.title} /> */}
      </Link>
      <div className="textContainer">
        <Link to={`/${item.id}`}>
          <h2 className="title">
            {item?.title?.length > 50
              ? item.title.slice(0, 50) + "..."
              : item.title}
          </h2>
        </Link>
        <p className="address">
          <img src="/pin.png" alt="" />
          <span>{item?.address}</span>
        </p>
        <p className="price"> ${item.price}</p>
        <div className="bottom">
          <div className="features">
            <div className="feature">
              <img src="/bed.png" alt="Bed room Image" />
              <span>{item?.bedroom} bedroom</span>
            </div>
            <div className="feature">
              <img src="/bath.png" alt="Bath room Image" />
              <span>{item?.bathroom} bathroom</span>
            </div>
          </div>

          {item?.userId != currentUserInfo?.id ? (
            <div className="icons">
              <div
                className={`${isSaved ? "bg-green-300" : ""} icon`}
                onClick={handleSaveOrUnsave}
              >
                <img src="/save.png" alt="Save for later image" />
              </div>
              <div className="icon" onClick={handleOpenModal}>
                <img src="/chat.png" alt="Chat image" />
              </div>
            </div>
          ) : (
            <div className="icons">
              <MdDeleteForever
                className="deleteIcon w-fit h-[30px]"
                onClick={handleOpenDeleteModal}
              />
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
          postOwner={postOwner} // Pass the recipient user info
          recipientUserId={item?.userId} // Pass the recipient user ID
          currentUserInfo={currentUserInfo} // Pass current user info
        />
      </div>
      <div>
        <Modal
          isOpen={isOpenDeleteModal}
          onClose={handleCloseDeleteModal}
          // title="Confirm Deletion"
        >
          <div className="bg-white p-4 flex flex-col items-center justify-center gap-10 w-full h-[300px] md:h-[300px] md:w-[600px] xl:w-[900px] rounded-xl">
            <h2 className="text-xl md:text-2xl lg:text-4xl font-semibold text-center ">
              Are you sure you want to delete this post?
            </h2>
            <div className="flex justify-end space-x-10 mt-4 font-bold text-xl md:text-3xl">
              <button
                className="px-4 py-2  bg-gray-300 text-black rounded-lg"
                onClick={handleCloseDeleteModal}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded-lg"
                onClick={handleConfirmDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default Card;
