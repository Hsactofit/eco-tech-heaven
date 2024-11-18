import React, { useState } from 'react';
import "./Counter.css";
const Counter = ({ count, setCount }) => {
    return (
        <div className="row counter-container">
          {/* Minus button */}
          <button 
            className="counter-button" 
            onClick={() => setCount(count - 1)}
            disabled={count === 0} /* Disable if count is 0 */
          >
            <span>-</span> {/* Minus icon */}
          </button>
    
          {/* Display count */}
          <div className="counter-display">
            {count}
          </div>
    
          {/* Plus button */}
          <button 
            className="counter-button" 
            onClick={() => setCount(count + 1)}
          >
            <span>+</span> {/* Plus icon */}
          </button>
        </div>
      );
};

export default Counter;