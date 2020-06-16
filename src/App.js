import React from 'react';
import './App.css';
import { Router, Route } from "react-router-dom";
import { useEffect } from "react";
import HomePage from "./components/HomePage";
import TopBar from "./components/TopBar";
import ErrorPage from "./components/ErrorPage";
import { createBrowserHistory } from "history";
const customHistory = createBrowserHistory();

function App({ location }) {
  useEffect(() => {});

  return (
    <div className="App">
      <Router history={customHistory} >
          <TopBar />
            <Route path="/" exact component={HomePage} />
            <Route path="/error" exact component={ErrorPage} />
      </Router>
    </div>
  );
}

export default App;