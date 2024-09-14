import React from "react";
import ReactDOM from "react-dom";

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  const handleBackgroundClick = (e) => {
    onClose();
  };

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className=" w-full h-full p-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">{title ? title : ""}</h2>
          <button
            className="absolute top-5 right-5 text-black bg-white hover:bg-gray-200 rounded-lg"
            onClick={handleBackgroundClick}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10"
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
        <div
          className="w-full h-full flex justify-center items-center py-20 md:py-0"
          onClick={handleBackgroundClick}
        >
          {children}
        </div>
      </div>
    </div>,
    document.body // Render the modal at the top level of the DOM
  );
};

export default Modal;
