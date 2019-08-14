import React from "react";

const BookItem = ({ book }) => {
  return (
    <div className="book-item">
      <img src={book.best_book.image_url} alt={book.title} />
      <p className="book-title">{book.best_book.title}</p>
      <p className="book-author">By: {book.best_book.author.name}</p>
    </div>
  );
};

export default BookItem;
