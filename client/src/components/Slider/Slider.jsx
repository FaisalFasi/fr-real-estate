import React, { useEffect, useState } from "react";
import "./slider.scss";

const Slider = ({ images }) => {
  const [imageIndex, setImageIndex] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const changeSlide = (direction) => {
    if (direction === "left") {
      setImageIndex((prev) => {
        const newIndex = prev === 0 ? images.length - 1 : prev - 1;
        setCurrentImageIndex(newIndex);
        return newIndex;
      });
    } else {
      setImageIndex((prev) => {
        const newIndex = prev === images.length - 1 ? 0 : prev + 1;
        setCurrentImageIndex(newIndex);
        return newIndex;
      });
    }
  };

  // Handle keyboard navigation
  useEffect(() => {
    if (imageIndex === null) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setImageIndex(null);
      } else if (e.key === "ArrowLeft") {
        setImageIndex((prev) => {
          const newIndex = prev === 0 ? images.length - 1 : prev - 1;
          setCurrentImageIndex(newIndex);
          return newIndex;
        });
      } else if (e.key === "ArrowRight") {
        setImageIndex((prev) => {
          const newIndex = prev === images.length - 1 ? 0 : prev + 1;
          setCurrentImageIndex(newIndex);
          return newIndex;
        });
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [imageIndex, images.length]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (imageIndex !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [imageIndex]);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      setImageIndex(null);
    }
  };

  if (!images || images.length === 0) {
    return <div className="slider">No images available</div>;
  }

  return (
    <div className="slider">
      {/* Full Screen Modal */}
      {imageIndex !== null && (
        <div className="fullSlider" onClick={handleBackdropClick}>
          <button
            className="closeBtn"
            onClick={() => setImageIndex(null)}
            aria-label="Close"
          >
            ×
          </button>
          <button
            className="navBtn leftBtn"
            onClick={(e) => {
              e.stopPropagation();
              changeSlide("left");
            }}
            aria-label="Previous image"
          >
            ‹
          </button>
          <div className="modalImageContainer" onClick={(e) => e.stopPropagation()}>
            <img src={images[imageIndex]} alt={`Image ${imageIndex + 1}`} />
          </div>
          <button
            className="navBtn rightBtn"
            onClick={(e) => {
              e.stopPropagation();
              changeSlide("right");
            }}
            aria-label="Next image"
          >
            ›
          </button>
        </div>
      )}

      {/* Main Carousel */}
      <div className="bigImage">
        <img
          src={images[currentImageIndex]}
          alt="Main property image"
          onClick={() => setImageIndex(currentImageIndex)}
        />
      </div>
      <div className="smallImages">
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Thumbnail ${index + 1}`}
            onClick={() => setCurrentImageIndex(index)}
            className={index === currentImageIndex ? "active" : ""}
          />
        ))}
      </div>
    </div>
  );
};

export default Slider;
