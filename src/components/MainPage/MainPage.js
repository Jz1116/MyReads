import React, { Component } from "react";
import "../../App.css";
import { Link } from "react-router-dom";
import CurrentReading from "./components/CurrentReading";
import WantToRead from "./components/WantToRead";
import Read from "./components/Read";

class MainPage extends Component {
  render() {
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <CurrentReading />
            <WantToRead />
            <Read />
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
