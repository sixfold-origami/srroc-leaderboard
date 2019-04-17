import 'typeface-roboto';
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import TopBar from './components/topbar';
import Home from './components/home';
import About from './components/about';

class App extends Component {
  render() {
    return (
      <div>
        <Router> {/*do them routes babey!*/}
        <TopBar />
          <Switch> {/*only match one route (matches the first route)*/}
            <Route path="/about" component={About} />
            <Route path="/" component={Home} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
