import React from "react";

const SearchBar = props => {
  const { handleSearch, handleSubmit, searchParam } = props;
  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <input
        className="search-bar-input"
        type="text"
        placeholder="Search by title or author..."
        value={searchParam}
        onChange={handleSearch}
      />
      <button className="search-bar-button" type="submit">
        Search
      </button>
    </form>
  );
};

export default SearchBar;
