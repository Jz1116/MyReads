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

  handleSearchChange = async (event) => {
    const searchInput = event.target.value;
    this.setState({
      searchInput,
    });

    await this.queryBooks(event.target.value);
  };

  handleBookSelection = async (event, book) => {
    const { addBookToShelf } = this.props;

    await addBookToShelf(book, event.target.value);
  };

  queryBooks = async (searchInput) => {
    try {
      const books = await BooksAPI.search(searchInput);
      if (books !== undefined) {
        this.setSearchData(books);
      } else {
        this.setState({
          searchData: [],
        });
      }
    } catch (e) {
      this.setState({
        searchData: [],
      });
    }
  };

  setSearchData = (books) => {
    const { booksOnShelf } = this.props;

    const data = books.map((book) => {
      let authors = book.authors;

      const sameBook = booksOnShelf.find(
        (bookOnShelf) => bookOnShelf.id === book.id
      );

      let shelf;

      if (sameBook === undefined) {
        shelf = "none";
      } else {
        shelf = sameBook.shelf;
      }

      if (authors !== undefined) {
        authors = authors.join(", ");
      }

      return {
        title: book.title,
        author: authors,
        id: book.id,
        shelf,
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
              onChange={async (event) => this.handleSearchChange(event)}
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
                        <select
                          value={book.shelf}
                          onChange={async (event) =>
                            this.handleBookSelection(event, book)
                          }
                        >
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
