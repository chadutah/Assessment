import React, { Component } from 'react';
import './App.css';
import Mydropzone from './Compnents/DropZone/DopZone';
// import Piechart from './Compnents/RadialChart/piechart';
import Piechart from './Compnents/pie';
import { BrowserRouter as Router } from 'react-router-dom';
import Route from 'react-router-dom/Route';
import Home from './Compnents/home';


class App extends Component {
  render() {
    return (
      <Router>
      <div className="App">
      <Route path="/" exact render={
            () => {
              return (<div>

                <Home></Home>
              </div>)
            }
          } />
          <Route path="/table" exact render={
            () => {
              return (<div>

                <Mydropzone></Mydropzone>
              </div>)
            }
          } />
          <Route path="/chart" exact render={
            () => {
              return (<div>

                <Piechart></Piechart>
              </div>)
            }
          } />
      </div>
      </Router>
    );
  }
}

export default App;
