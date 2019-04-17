import React, { Component } from 'react';
import { Typography, Button } from '@material-ui/core';

class Home extends Component {
  render() {
    return (
      <div>
        <Typography variant="h1"> Welcome Home </Typography>
        <Button variant="contained" color="primary">Button</Button>
      </div>
    );
  }
}

export default Home;
