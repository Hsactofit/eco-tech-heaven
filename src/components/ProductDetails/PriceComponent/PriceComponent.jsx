import React, { useState, useEffect } from 'react';
import "./PriceComponent.css";
const PriceComponent = ({ item, isSelected, onClick }) => {
    return (
        <div 
            className={`flex items-center p-1 border rounded-lg mr-1 cursor-pointer`}
                onClick={() => {
                    onClick(); // Ensure onClick is passed and triggered
                }}>
            <span className="w-8 h-8 mr-1 flex items-center justify-center bg-gray-200 rounded text-sm">{item?.size}</span>
            <span className={`text-sm ${isSelected ? 'text-red-600 font-bold' : 'text-gray-800'}`}>{`₹${item?.price.toFixed(2)}`}</span>
        </div>
    );
}

export default PriceComponent;