import React from "react";

const BookItem = ({ title, author, imgUrl }) => {
  return (
    <div className="book-item">
      <img src={imgUrl} alt={title} />
      <p className="book-title">{title}</p>
      <p className="book-author">By: {author}</p>
    </div>
  );
};

export default BookItem;
