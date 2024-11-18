import React, { useState, useRef } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const ImageCarousel = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState(images[0]);
  const mainSliderRef = useRef(null);
  const thumbnailSliderRef = useRef(null);

  // Settings for the main image slider
  const mainSliderSettings = {
    arrows: false, // Hide arrows for the main slider
    fade: true,    // Enable fade transition
    asNavFor: thumbnailSliderRef.current, // Sync with the thumbnail slider
  };

  // Settings for the thumbnail slider (carousel)
  const thumbnailSliderSettings = {
    slidesToShow: 5,
    slidesToScroll: 1,
    focusOnSelect: true,
    centerMode: true,
    asNavFor: mainSliderRef.current, // Sync with the main slider
    arrows: true, // Show arrows on the thumbnail slider
    swipeToSlide: true,
  };

  return (
    <div className="carousel-container">
      {/* Main Image Display */}
      <div className="main-slider">
        <img src={selectedImage} alt="Selected" className="main-image" />
      </div>

      {/* Conditional Rendering */}
      {images.length >= 5 ? (
        // If images are 5 or more, use the thumbnail carousel
        <Slider {...thumbnailSliderSettings} ref={thumbnailSliderRef} className="thumbnail-slider">
          {images.map((image, index) => (
            <div key={index} onClick={() => setSelectedImage(image)}>
              <img
                src={image}
                alt={`Thumbnail ${index}`}
                className={`thumbnail ${selectedImage === image ? 'active-thumbnail' : ''}`}
                style={{ width: '80px', height: 'auto', cursor: 'pointer' }}
              />
            </div>
          ))}
        </Slider>
      ) : (
        // If less than 5 images, show them as static thumbnails without carousel
        <div className="thumbnail-list">
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Thumbnail ${index}`}
              onClick={() => setSelectedImage(image)}
              className={`thumbnail ${selectedImage === image ? 'active-thumbnail' : ''}`}
              style={{ width: '80px', height: 'auto', cursor: 'pointer', marginRight: '10px' }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageCarousel;
