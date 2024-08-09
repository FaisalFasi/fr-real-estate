import React from "react";
import ReactDOM from "react-dom";

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  const handleBackgroundClick = (e) => {
    onClose();
  };

  const handleContentClick = (e) => {
    e.stopPropagation(); // Stop the event from bubbling up to the background
  };

  return ReactDOM.createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={handleBackgroundClick}
    >
      <div className=" w-full h-full p-6 overflow-auto">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">{title ? title : ""}</h2>
          <button
            className="text-black bg-white hover:bg-gray-200"
            onClick={handleBackgroundClick}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="w-full" onClick={handleContentClick}>
          {children}
        </div>
      </div>
    </div>,
    document.body // Render the modal at the top level of the DOM
  );
};

export default Modal;
