import React from "react";
import ReactStars from "react-rating-stars-component";

const ProductRating = ({ rating }) => {
  return (
    <div className="rate">
      <div className="stars">
        <ReactStars
          count={5}             // Total number of stars (e.g., 5 for a 5-star rating system)
          value={rating}         // This is the rating value, which could be a decimal
          size={24}              // Size of the stars (you can adjust this)
          isHalf={true}          // Allows for half-star ratings
          activeColor="#ffd700"  // Color for active stars
          edit={false}           // Disable editing if you want it as a display-only component
        />
      </div>
    </div>
  );
};

export default ProductRating;
