import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Home extends Component {
  render() {
    return (
      <div>
        <h1>
          About
        </h1>
        <Link to='/'>Go home</Link>
      </div>
    );
  }
}

export default Home;
