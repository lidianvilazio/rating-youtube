import React, { Component } from 'react';
import './App.css';
import Main from './Containers/Main'
import Footer from './Components/Footer';

class App extends Component {
  render() {
    return (
      <div className="App container-fluid">
        <Main/>
        <Footer/>
      </div>
    );
  }
}

export default App;
