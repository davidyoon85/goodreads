import React, { Component } from "react";
import axios from "axios";

import BookItem from "./BookItem";
import SearchBar from "./SearchBar";
import Pagination from "./Pagination";

const goodReadsAPI = axios.create({
  baseURL: "https://good-reads--85davidyoon.repl.co"
});

class Landing extends Component {
  state = {
    searchParam: "",
    results: 1,
    currentPage: 1,
    errorMsg: "",
    loading: false,
    books: []
  };

  handleSearch = e => {
    const searchParam = e.target.value;
    this.setState(() => ({ searchParam }));
  };

  handleClick = e => {
    e.preventDefault();
    this.setState({
      searchParam: "",
      results: 1,
      currentPage: 1,
      errorMsg: "",
      loading: false,
      books: []
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.setState({ currentPage: 1 });
    this.getBooks();
  };

  getBooks = () => {
    if (this.state.searchParam) {
      this.setState({ loading: true });

      const { searchParam, currentPage } = this.state;
      const url = `/search/${searchParam}/${currentPage}`;

      goodReadsAPI
        .get(url)
        .then(({ data: { data: books, results } }) => {
          if (books) {
            this.setState(() => ({
              books,
              results,
              errorMsg: "",
              loading: false
            }));
          } else {
            this.setState(() => ({
              errorMsg: "No books match your search.",
              books: [],
              loading: false
            }));
          }
        })
        .catch(err => {
          this.setState(() => ({
            errorMsg: "Try a new search.",
            loading: false
          }));
        });
    }
  };

  prevPage = () => {
    if (this.state.currentPage > 1) {
      this.setState(
        prevState => ({ currentPage: prevState.currentPage - 1 }),
        () => this.getBooks()
      );
    }
  };

  nextPage = () => {
    const displayPages = Math.ceil(this.state.results / 20);
    if (this.state.currentPage < displayPages) {
      this.setState(
        prevState => ({ currentPage: prevState.currentPage + 1 }),
        () => this.getBooks()
      );
    }
  };

  render() {
    const { books } = this.state;

    debugger;
    return (
      <main className="main">
        <SearchBar
          handleSearch={this.handleSearch}
          handleClick={this.handleClick}
          handleSubmit={this.handleSubmit}
          searchParam={this.state.searchParam}
        />
        {this.state.loading ? (
          <p className="loading">
            <img
              className="spinner"
              src="http://freepreloaders.com/wp-content/uploads/2019/05/5-1.svg"
              alt="spinner"
            />
          </p>
        ) : (
          <div>
            {this.state.errorMsg ? (
              <p className="search-error">{this.state.errorMsg}</p>
            ) : null}
            <div className="book-list">
              {books.map(book => {
                const id = book["id"][0]["_"];
                const title = book["best_book"][0]["title"][0];
                const author = book["best_book"][0]["author"][0]["name"][0];
                const imgUrl = book["best_book"][0]["image_url"][0];
                debugger;
                return (
                  <BookItem
                    key={id}
                    title={title}
                    author={author}
                    imgUrl={imgUrl}
                  />
                );
              })}
            </div>
            {this.state.results > 1 && !this.state.errorMsg.length && (
              <div>
                <Pagination
                  results={this.state.results}
                  currentPage={this.state.currentPage}
                  nextPage={this.nextPage}
                  prevPage={this.prevPage}
                />
              </div>
            )}
          </div>
        )}
      </main>
    );
  }
}

export default Landing;
