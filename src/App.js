import React from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";
import SearchPage from "./components/SearchPage/SearchPage";
import MainPage from "./components/MainPage/MainPage";

class BooksApp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      booksOnShelf: [],
    };
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      const bookData = books.map((book) => {
        return {
          id: book.id,
          title: book.title,
          author: book.authors.join(", "),
          thumbnail: book.imageLinks.thumbnail,
          shelf: book.shelf,
        };
      });
      this.setState({
        booksOnShelf: bookData,
      });
    });
  }

  updateBookData = async (id, shelf) => {
    await BooksAPI.update({ id }, shelf);
    const { booksOnShelf } = this.state;

    const bookIndex = booksOnShelf.findIndex((book) => book.id === id);
    booksOnShelf[bookIndex].shelf = shelf;

    this.setState({
      booksOnShelf,
    });
  };

  deleteBookOnShelf = async (id) => {
    const { booksOnShelf } = this.state;

    await BooksAPI.update({ id }, "none");

    const deleteIndex = booksOnShelf.findIndex((book) => book.id === id);
    booksOnShelf.splice(deleteIndex, 1);

    this.setState({
      booksOnShelf,
    });
  };

  addBookToShelf = async (book, shelf) => {
    const { booksOnShelf } = this.state;
    await BooksAPI.update({ id: book.id }, shelf);

    const bookIndex = booksOnShelf.findIndex(
      (bookOnShelf) => book.id === bookOnShelf.id
    );

    if (bookIndex === -1) {
      const newBook = {
        id: book.id,
        title: book.title,
        author: book.author,
        thumbnail: book.thumbnail,
        shelf,
      };

      booksOnShelf.push(newBook);
    } else {
      booksOnShelf[bookIndex].shelf = shelf;
    }

    this.setState({
      booksOnShelf,
    });
  };

  render() {
    const { booksOnShelf } = this.state;

    return (
      <div className="app">
        <Switch>
          <Route path="/search">
            <SearchPage
              booksOnShelf={booksOnShelf}
              addBookToShelf={this.addBookToShelf}
            />
          </Route>
          <Route path="/">
            <MainPage
              booksOnShelf={booksOnShelf}
              updateBookData={this.updateBookData}
              deleteBookOnShelf={this.deleteBookOnShelf}
            />
          </Route>
        </Switch>
      </div>
    );
  }
}

export default BooksApp;
