import React, { useEffect, useState } from "react";
import "./pagination.css";

const Pagination = ({ totalNumbers, onActiveChange, initialNumber,filterList }) => {
  const [active, setActive] = useState(initialNumber || 1);

  useEffect(() => {
    if (onActiveChange) onActiveChange(active);
  }, [active, onActiveChange]);

  const handleLeftClick = () => {
    if (active > 1) setActive(active - 1);
  };

  const handleRightClick = () => {
    if (active < totalNumbers) setActive(active + 1);
  };

  const handleNumberClick = (number) => {
    setActive(number);
  };

  return (
    <>
   {filterList.length>0&& <div className="pagination-container">
      <button
        className={`pagination-btn ${active === 1 ? "disabled" : ""}`}
        onClick={handleLeftClick}
        disabled={active === 1}
      >
        <i className="fas fa-chevron-left"></i>
      </button>
      <div className="pagination-numbers">
        {Array.from({ length: totalNumbers }, (_, index) => index + 1).map((number) => (
          <div
            key={number}
            className={`pagination-number ${active === number ? "active" : ""}`}
            onClick={() => handleNumberClick(number)}
          >
            {number}
          </div>
        ))}
      </div>
      <button
        className={`pagination-btn ${active === totalNumbers ? "disabled" : ""}`}
        onClick={handleRightClick}
        disabled={active === totalNumbers}
      >
        <i className="fas fa-chevron-right"></i>
      </button>
    </div>}
    </>
  );
};

export default Pagination;
