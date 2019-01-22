import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Mydropzone from './Compnents/DropZone/DopZone';


class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <Mydropzone />
        </header>
      </div>
    );
  }
}

export default App;
