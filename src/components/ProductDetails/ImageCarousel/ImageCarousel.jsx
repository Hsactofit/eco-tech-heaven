import React, { useState, useRef, useEffect } from 'react';
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
    focusOnSelect: true, // Makes sure thumbnails update when clicked
    responsive: [
      {
        breakpoint: 768, // For mobile devices
        settings: {
          slidesToShow: 3, // Show 3 thumbnails on small screens
          centerMode: false, // Disable center mode on smaller screens
        },
      },
    ],
  };

  // Initialize the sliders once the component is mounted
  useEffect(() => {
    if (thumbnailSliderRef.current) {
      thumbnailSliderRef.current.slickGoTo(0); // Set the initial slide for thumbnail slider
    }
  }, [images]);

  return (
    <div className="carousel-container">
      {/* Main Image Display */}
      <div className="main-slider">
        <img
          src={selectedImage}
          alt="Selected"
          className="main-image"
          style={{ transition: 'transform 0.3s ease' }}
        />
      </div>

      {/* Conditional Rendering for Thumbnail Carousel */}
      {images.length >= 5 ? (
        <Slider {...thumbnailSliderSettings} ref={thumbnailSliderRef} className="thumbnail-slider">
          {images.map((image, index) => (
            <div key={index} onClick={() => setSelectedImage(image)}>
              <img
                src={image}
                alt={`Thumbnail ${index}`}
                className={`thumbnail ${selectedImage === image ? 'active-thumbnail' : ''}`}
                style={{ 
                  width: '80px', 
                  height: 'auto', 
                  cursor: 'pointer',
                  border: selectedImage === image ? '2px solid #e94560' : '2px solid transparent',
                  boxShadow: selectedImage === image ? '0 4px 8px rgba(0, 0, 0, 0.2)' : 'none',
                  transition: 'border 0.3s ease, box-shadow 0.3s ease',
                }}
              />
            </div>
          ))}
        </Slider>
      ) : (
        <div className="thumbnail-list flex">
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Thumbnail ${index}`}
              onClick={() => setSelectedImage(image)}
              className={`thumbnail ${selectedImage === image ? 'active-thumbnail' : ''}`}
              style={{
                width: '80px',
                height: 'auto',
                cursor: 'pointer',
                marginRight: '10px',
                border: selectedImage === image ? '2px solid #e94560' : '2px solid transparent',
                boxShadow: selectedImage === image ? '0 4px 8px rgba(0, 0, 0, 0.2)' : 'none',
                transition: 'border 0.3s ease, box-shadow 0.3s ease',
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageCarousel;
