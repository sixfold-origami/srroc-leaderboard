import 'typeface-roboto';
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import theme from './theme.js';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core'
import Home from './pages/home';
import About from './pages/about';
import Login from './pages/login';
import Racer from './pages/racer';
import Time from './pages/time';
import TopBar from './components/topbar';

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <Router> {/*do them routes babey!*/}
        <TopBar />
          <Switch> {/*only match one route (matches the first route)*/}
            <Route path="/about" component={About} />
            <Route path="/login" component={Login} />
            <Route path="/racer" component={Racer} />
            <Route path="/time" component={Time} />
            <Route path="/" component={Home} />
          </Switch>
        </Router>
      </MuiThemeProvider>
    );
  }
}

export default App;
