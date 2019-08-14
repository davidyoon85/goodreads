import React, { Component } from "react";
import axios from "axios";

import BookItem from "./BookItem";

const apiKey = "Yp44Rw2ZdofVJsshzCcpCQ";
const secret = "T0MvsQs7sICQPThVBPHiOH7niAWixr7ujpd1ZoZEQ";
const proxyurl = "https://cors-anywhere.herokuapp.com/";
const url = `https://www.goodreads.com/search/index.xml?key=${apiKey}&format=json&q='red'`;

class Landing extends Component {
  state = {
    searchTerm: "",
    searchRes: null,
    total: 1,
    currentPage: 1,
    errorMsg: "",
    loading: false,
    books: []
  };

  componentDidMount() {
    this.getBooks();
  }

  getBooks = () => {
    axios
      .get(proxyurl + url)
      .then(res => {
        this.parseXMLResponse(res.data);
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
    if (books.length === 0) {
      return <h1>Loading...</h1>;
    } else {
      return (
        <div className="book-list">
          {books.map(book => (
            <BookItem book={book} />
          ))}
        </div>
      );
    }
  }
}

export default Landing;

// best_book:
// author: {id: "7074943", name: "Victoria Aveyard"}
// id: "22328546"
// image_url: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1449778912l/22328546._SX98_.jpg"
// small_image_url: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1449778912l/22328546._SY75_.jpg"
// title: "Red Queen (Red Queen, #1)"
