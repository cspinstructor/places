import React, { Component } from 'react';
import Navbar from './Navbar';
//import { Switch, Route } from 'react-router-dom';
//import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

class Main extends Component {
  render() {
    return (
      <div>
        <div className="jumbotron text-center">
          <h1>Welcome to Places</h1>
          <p>For testing Google Places API</p>
        </div>

        <div className="container">
          <div className="row">
            <div className="col-sm-4">
              <h3>Getting Started</h3>
              <p>Click on Search at the top of this page</p>
            </div>
            <div className="col-sm-4">
              <h3>Node.js Express.js Mongodb</h3>
              <p>Backend built using node.js, server runs express.js</p>
              <p>and Mongodb for database</p>
            </div>
            <div className="col-sm-4">
              <h3>Front end React.js</h3>
              <p>Front end built using React.js</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Main;
