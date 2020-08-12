import React, { Component } from "react";
import "../../App.css";
import { Link } from "react-router-dom";
import CurrentReading from "./components/CurrentReading";
import WantToRead from "./components/WantToRead";
import Read from "./components/Read";

class MainPage extends Component {
  getBooksOnShelves = (books) => {
    const currentlyReading = [];
    const wantToRead = [];
    const read = [];

    books.forEach((book) => {
      if (book.shelf === "currentlyReading") {
        currentlyReading.push(book);
      } else if (book.shelf === "wantToRead") {
        wantToRead.push(book);
      } else {
        read.push(book);
      }
    });

    return { currentlyReading, wantToRead, read };
  };

  render() {
    const { booksOnShelf, updateBookData } = this.props;

    const { currentlyReading, wantToRead, read } = this.getBooksOnShelves(
      booksOnShelf
    );

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <CurrentReading
              currentlyReading={currentlyReading}
              updateBookData={updateBookData}
            />
            <WantToRead
              wantToRead={wantToRead}
              updateBookData={updateBookData}
            />
            <Read read={read} updateBookData={updateBookData} />
          </div>
        </div>
        <div className="open-search">
          <Link to="/search">
            <button>Add a book</button>
          </Link>
        </div>
      </div>
    );
  }
}

export default MainPage;
