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
    await BooksAPI.update(id, shelf);
    const { booksOnShelf } = this.state;

    booksOnShelf.forEach((book) => {
      if (book.id === id) {
        book.shelf = shelf;
      }
    });

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
            <SearchPage />
          </Route>
          <Route path="/">
            <MainPage
              booksOnShelf={booksOnShelf}
              updateBookData={this.updateBookData}
            />
          </Route>
        </Switch>
      </div>
    );
  }
}

export default BooksApp;
