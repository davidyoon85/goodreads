import React from "react";

const Pagination = ({ currentPage, results, nextPage, prevPage }) => (
  <div className="pagination">
    <button className="pagination-button" type="button" onClick={prevPage}>
      &#60;
    </button>
    <div className="pagination-dashboard">
      <p>
        Page {currentPage} of {Math.ceil(results / 20) || 1}
      </p>
      <p>{results} results</p>
    </div>
    <button className="pagination-button" type="button" onClick={nextPage}>
      &#62;
    </button>
  </div>
);

export default Pagination;
