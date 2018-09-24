import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import DashBoard from './Components/DashBoard';


class App extends Component {
  render() {
    return (
      <div className="App">
          <DashBoard/>
      </div>
    );
  }
}

export default App;
