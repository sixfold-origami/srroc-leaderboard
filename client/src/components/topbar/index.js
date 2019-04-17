import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import NavButton from '../NavButton';
import ToggleMenu from '../ToggleMenu';

const styles = {
  menuTypography: {
    marginRight: 20,
    color: '#0a0a0a',
  },
}

class TopBar extends Component {
  render() {
    const { classes } = this.props;
    return (
      <AppBar color="primary" position="static">
        <Toolbar>
          <Typography className={classes.menuTypography} variant="h6">
            SRROC Leaderboard
          </Typography>
          <NavButton path="/" text="Home"/>
          <NavButton path="/about" text="About"/>
          <ToggleMenu />
        </Toolbar>
      </AppBar>
    );
  }
}

NavButton.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TopBar);
