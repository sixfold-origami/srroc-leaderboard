import React, { Component } from 'react';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import NavButton from '../navbutton';

class TopBar extends Component {
  render() {
    return (
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">
            SRROC Leaderboard
          </Typography>
          <NavButton path="/" text="Home"/>
          <NavButton path="/about" text="About"/>
        </Toolbar>
      </AppBar>
    );
  }
}

export default TopBar;
