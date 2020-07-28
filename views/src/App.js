import React from 'react';
import './App.css';
import Home from './components/pages/Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import About from './components/pages/About';

function App() {
  return (
    <div className='body'>
      <Home />
      <About />
    </div>
  );
}

export default App;
