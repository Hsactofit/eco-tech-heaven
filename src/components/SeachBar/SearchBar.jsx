import { useRef, useEffect } from "react";
import "./searchbar.css";

const SearchBar = ({ handler, inputVal, onSubmit }) => {
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [inputVal]);

  const handleChange = (event) => {
    handler(event.target.value);
  };

  const handleSearchClick = () => {
    if (onSubmit) onSubmit();
  };

  return (
    <div className="search-container">
      <div className="search-bar">
        <ion-icon name="search-outline" className="search-icon"></ion-icon>
        <input
          ref={inputRef}
          className="search-input"
          value={inputVal}
          type="text"
          placeholder="Search for products, categories..."
          onChange={handleChange}
        />
        {/* <button
          type="button"
          className="search-button"
          onClick={handleSearchClick}
        >
          Search
        </button> */}
      </div>
    </div>
  );
};

export default SearchBar;
