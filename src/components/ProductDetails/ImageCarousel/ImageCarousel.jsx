import React, { useState, useRef } from 'react';
import './ImageCarousel.css';

const ImageZoom = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState(images[0]);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const [isZoomed, setIsZoomed] = useState(false);
  const imageRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!imageRef.current) return;

    const rect = imageRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    setZoomPosition({ x, y });
  };

  return (
    <div className="image-zoom-container">
      <div 
        className="main-image-wrapper"
        onMouseEnter={() => setIsZoomed(true)}
        onMouseLeave={() => setIsZoomed(false)}
        onMouseMove={handleMouseMove}
      >
        <img 
          ref={imageRef}
          src={selectedImage} 
          alt="Product" 
          className="main-image"
        />
        {isZoomed && (
          <div 
            className="zoom-lens"
            style={{
              backgroundImage: `url(${selectedImage})`,
              backgroundPosition: `${zoomPosition.x}% ${zoomPosition.y}%`
            }}
          />
        )}
      </div>

      <div className="thumbnails">
        {images.map((img, index) => (
          <img 
            key={index}
            src={img} 
            alt={`Thumbnail ${index}`}
            className={`thumbnail ${img === selectedImage ? 'active' : ''}`}
            onClick={() => setSelectedImage(img)}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageZoom;