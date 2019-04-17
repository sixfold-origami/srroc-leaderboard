import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const styles = {
  menuButton: {
    marginLeft: 20,
    color: '#0a0a0a',
  },
}

class NavButton extends Component {
  render() {
    const { classes } = this.props;
    return (
      <Button className={classes.menuButton} component={Link} to={this.props.path}>
        {this.props.text}
      </Button>
    );
  }
}

NavButton.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NavButton);
