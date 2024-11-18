import "./searchbar.css";

const SearchBar = ({ handler, inputVal }) => {

  const handleChange = (input) => {
    handler(input.target.value);
  };
  return (
    <div className="search-container">
      <input value={inputVal} type="text" placeholder="Search..." onChange={handleChange} />
      <ion-icon name="search-outline" className="search-icon"></ion-icon>
    </div>
  );
};

export default SearchBar;
