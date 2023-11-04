import React from 'react';
import './App.css';
import Main from './components/Main';
import { BrowserRouter, Route, Routes } from "react-router-dom";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/satori/julia/" element={<Main />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
