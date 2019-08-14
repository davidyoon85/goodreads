import React from "react";

const SearchBar = () => {
  return (
    <form className="search-bar">
      <input
        className="search-bar-input"
        type="text"
        placeholder="Search by title..."
        // value={searchParam}
        // onChange={handleSearch}
      />
      <button className="search-bar__submit-btn" type="submit">
        Search
      </button>
    </form>
  );
};

export default SearchBar;
