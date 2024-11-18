import React, {useEffect, useState} from 'react';

const Pagination = ({totalNumbers, onActiveChange, initialNumber}) => {
    const [active, setActive] = React.useState(initialNumber);
    const [start, setStart] = React.useState(1);
    const [showNum, setShowNum] = React.useState(totalNumbers < 5 ? totalNumbers : 5);

    const handleClick = (number) => {
        setActive(number);
        onActiveChange(number);
        if (number === start && start > 1) {
            setStart(start - 1);
        } else if (number === start + showNum - 1 && start + showNum - 1 < totalNumbers) {
            setStart(start + 1);
        }
    };

    const handleLeftClick = () => {
        if (active > 1) {
            handleClick(active - 1);
        }
    };

    const handleRightClick = () => {
        if (active < totalNumbers) {
            handleClick(active + 1);
        }
    };


    return (
        <div className="flex w-fit items-center space-x-4 bg-[#0F3460] p-2 rounded-full">
            <button
                className={`w-12 h-12 rounded-full flex items-center justify-center transition-transform transform hover:scale-110 ${active === 1 ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-white text-[#0F3460]'}`}
                onClick={handleLeftClick}
                disabled={active === 1}
            >
                <i className="fas fa-chevron-left"></i>
            </button>
            <div className="flex items-center space-x-4">
                {Array.from({length: Math.min(showNum, totalNumbers)}, (_, i) => start + i).map((number) => (
                    <div
                        key={number}
                        className={`w-12 h-12 rounded-full flex items-center justify-center relative cursor-pointer transition-transform transform hover:scale-110 ${active === number ? 'bg-[#5A8CC0] text-white' : 'bg-white text-[#0F3460]'}`}
                        onClick={() => handleClick(number)}
                    >
                        {number}
                        {active === number &&
                            <span className="absolute inset-0 border-2 border-white rounded-full"></span>}
                    </div>
                ))}
            </div>
            <button
                className={`w-12 h-12 rounded-full flex items-center justify-center transition-transform transform hover:scale-110 ${active === totalNumbers ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-white text-[#0F3460]'}`}
                onClick={handleRightClick}
                disabled={active === totalNumbers}
            >
                <i className="fas fa-chevron-right"></i>
            </button>
        </div>
    );
};

export default Pagination;