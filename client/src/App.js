import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import { Switch, Route } from 'react-router-dom';
import Form from './components/Form';
import Main from './components/Main';

class App extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <div>
          <Switch>
            <Route exact path="/" component={Main} />
            <Route exact path="/form" component={Form} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
