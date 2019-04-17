import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Home extends Component {
  render() {
    return (
      <div>
        <h1>
          Welcome home
        </h1>
        <Link to='/about'>Go to about</Link>
      </div>
    );
  }
}

export default Home;
