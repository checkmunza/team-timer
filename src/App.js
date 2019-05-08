import React, { Component } from 'react';
import MyTimer from './components/my-timer'

import 'jquery/dist/jquery.min.js';
import 'popper.js/dist/popper.min.js';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {
  render() {
    return (
      <MyTimer />
    );
  }
}

export default App;
