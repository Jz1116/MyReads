import React from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import SearchPage from "./components/SearchPage/SearchPage";
import MainPage from "./components/MainPage/MainPage";

class BooksApp extends React.Component {
  render() {
    return (
      <div className="app">
        <Switch>
          <Route path="/search">
            <SearchPage />
          </Route>
          <Route path="/">
            <MainPage />
          </Route>
        </Switch>
      </div>
    );
  }
}

export default BooksApp;
