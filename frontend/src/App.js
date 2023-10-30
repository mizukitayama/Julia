
import React from 'react';
import './App.css';
import Main from './components/main';
import { BrowserRouter, Link, Switch, Route } from "react-router-dom";

const App = () => {
  return (
    <BrowserRouter>
      <Link to="/satori/julia">
        <Main />
      </Link>
    </BrowserRouter>
  )
}

export default App;
