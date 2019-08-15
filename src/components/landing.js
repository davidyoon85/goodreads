import React, { Component } from "react";
import axios from "axios";

import BookItem from "./BookItem";
import SearchBar from "./SearchBar";
import Pagination from "./Pagination";

import spinner from "./spinner.gif";

const goodReadsAPI = axios.create({
  baseURL: "https://osprey-assignment-1--ospreyuw.repl.co"
});

class Landing extends Component {
  state = {
    searchParam: "",
    total: 1,
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
      total: 1,
      currentPage: 1,
      errorMsg: "",
      loading: false,
      books: []
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.getBooks();
  };

  getBooks = () => {
    if (this.state.searchParam) {
      this.setState({ loading: true });

      const { searchParam, currentPage } = this.state;
      const url = `/search/${searchParam}/${currentPage}`;

      goodReadsAPI
        .get(url)
        .then(({ data: { data: books, total } }) => {
          if (books) {
            this.setState(() => ({ books, total, loading: false }));
          } else {
            this.setState(() => ({ errorMsg: "None Found", loading: false }));
          }
        })
        .catch(err => {
          this.setState(() => ({ errorMsg: "Refresh", loading: false }));
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
    const displayPages = Math.floor(this.state.total / 20);
    if (this.state.currentPage < displayPages) {
      this.setState(
        prevState => ({ currentPage: prevState.currentPage + 1 }),
        () => this.getBooks()
      );
    }
  };

  render() {
    const { books } = this.state;
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
            <img className="spinner" src={spinner} alt="spinner" />
          </p>
        ) : (
          <div>
            <div className="book-list">
              {books.map(book => {
                const id = book["id"][0]["_"];
                const title = book["best_book"][0]["title"][0];
                const author = book["best_book"][0]["author"][0]["name"][0];
                const imgUrl = book["best_book"][0]["image_url"][0];
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
            {this.state.total > 1 && !this.state.errorMsg.length && (
              <div>
                <Pagination
                  total={this.state.total}
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
