import React from "react";

const SearchBar = props => {
  const { handleSearch, handleSubmit, searchParam, handleClick } = props;
  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <input
        className="search-bar-input"
        type="text"
        placeholder="Search by title or author..."
        value={searchParam}
        onChange={handleSearch}
      />
      <div className="search-buttons">
        <button className="search-bar-button" type="submit">
          Search
        </button>
        <button
          className="search-bar-button"
          type="button"
          onClick={handleClick}
        >
          Reset
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
