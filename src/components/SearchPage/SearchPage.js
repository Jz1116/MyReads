import React, { Component } from "react";
import "../../App.css";
import * as BooksAPI from "../../BooksAPI";
import { Link } from "react-router-dom";

class SearchPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchInput: "",
      searchData: [],
    };
  }

  handleChange = (event) => {
    this.setState({
      searchInput: event.target.value,
    });
    this.queryBooks();
  };

  queryBooks = async () => {
    const { searchInput } = this.state;
    try {
      const books = await BooksAPI.search(searchInput);
      if (books !== undefined) {
        this.setSearchData(books);
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  setSearchData = (books) => {
    const data = books.map((book) => {
      let authors = book.authors;

      if (authors !== undefined) {
        authors = authors.join(", ");
      }
      return {
        title: book.title,
        author: authors,
        thumbnail:
          book.imageLinks === undefined ? undefined : book.imageLinks.thumbnail,
      };
    });

    this.setState({
      searchData: data,
    });
  };

  render() {
    const { searchInput, searchData } = this.state;
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/">
            <button className="close-search">Close</button>
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={searchInput}
              onChange={this.handleChange}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {searchData !== [] &&
              searchData.map((book, index) => (
                <li key={index}>
                  <div className="book">
                    <div className="book-top">
                      <div
                        className="book-cover"
                        style={{
                          width: 128,
                          height: 193,
                          backgroundImage: `url(${book.thumbnail})`,
                        }}
                      />
                      <div className="book-shelf-changer">
                        <select>
                          <option value="move" disabled>
                            Move to...
                          </option>
                          <option value="currentlyReading">
                            Currently Reading
                          </option>
                          <option value="wantToRead">Want to Read</option>
                          <option value="read">Read</option>
                          <option value="none">None</option>
                        </select>
                      </div>
                    </div>
                    <div className="book-title">{book.title}</div>
                    <div className="book-authors">{book.author}</div>
                  </div>
                </li>
              ))}
          </ol>
        </div>
      </div>
    );
  }
}

export default SearchPage;
