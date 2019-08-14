import React, { Component } from "react";
import axios from "axios";

import BookItem from "./BookItem";
import SearchBar from "./SearchBar";

class Landing extends Component {
  state = {
    searchParam: "",
    searchRes: null,
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

  handleSubmit = e => {
    e.preventDefault();
    this.getBooks();
  };

  getBooks = () => {
    this.setState({ loading: true });
    const apiKey = "Yp44Rw2ZdofVJsshzCcpCQ";
    const secret = "T0MvsQs7sICQPThVBPHiOH7niAWixr7ujpd1ZoZEQ";
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    const url = `https://www.goodreads.com/search/index.xml?key=${apiKey}&format=json&q='${
      this.state.searchParam
    }'`;

    axios
      .get(proxyurl + url)
      .then(res => {
        this.parseXMLResponse(res.data);
      })
      .then(() => {
        this.setState({ loading: false });
      })
      .catch(error => {
        console.log(error.message);
      });
  };

  parseXMLResponse = response => {
    const parser = new DOMParser();
    const XMLResponse = parser.parseFromString(response, "application/xml");
    const parseError = XMLResponse.getElementsByTagName("parsererror");

    if (parseError.length) {
      this.setState({
        error: "There was an error fetching results.",
        fetchingData: false
      });
    } else {
      const XMLresults = new Array(...XMLResponse.getElementsByTagName("work"));
      const searchResults = XMLresults.map(result => this.XMLToJson(result));
      this.setState({ books: searchResults });
    }
  };

  XMLToJson = XML => {
    const allNodes = new Array(...XML.children);
    const jsonResult = {};
    allNodes.forEach(node => {
      if (node.children.length) {
        jsonResult[node.nodeName] = this.XMLToJson(node);
      } else {
        jsonResult[node.nodeName] = node.innerHTML;
      }
    });
    console.log(jsonResult);
    return jsonResult;
  };

  render() {
    const { books } = this.state;
    return (
      <div>
        <SearchBar
          handleSearch={this.handleSearch}
          handleSubmit={this.handleSubmit}
          searchParam={this.state.searchParam}
        />
        {this.state.loading ? (
          <p className="loading">Loading...</p>
        ) : (
          <div className="book-list">
            {books.map(book => (
              <BookItem book={book} />
            ))}
          </div>
        )}
      </div>
    );
  }
  // }
}

export default Landing;

// best_book:
// author: {id: "7074943", name: "Victoria Aveyard"}
// id: "22328546"
// image_url: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1449778912l/22328546._SX98_.jpg"
// small_image_url: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1449778912l/22328546._SY75_.jpg"
// title: "Red Queen (Red Queen, #1)"
