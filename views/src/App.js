import React from 'react';
import logo from './logo.svg';
import './App.css';
import url from './server';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <a
          className="App-link"
          href={url}
          target="_blank"
          rel="noopener noreferrer"
        >
          Send Request
        </a>
      </header>
    </div>
  );
}

export default App;
