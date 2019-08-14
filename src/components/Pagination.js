import React from "react";

const Pagination = ({ currentPage, total, nextPage, prevPage }) => (
  <div className="pagination">
    <button className="pagination-button" type="button" onClick={prevPage}>
      &#60;
    </button>
    <p className="pagination-dashboard">
      Page {currentPage} of {Math.floor(total / 20)} - {total} total results
    </p>
    <button className="pagination-button" type="button" onClick={nextPage}>
      &#62;
    </button>
  </div>
);

export default Pagination;
