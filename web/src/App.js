import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Index from './screen/Index';
import Login from './screen/Login';
import SendKey from './screen/SendKey';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/sendkey" component={SendKey} />
          <Route path="/login" component={Login} />
          <Route path="/" component={Index} />
        </Switch>
      </Router>  
    );
  }
}

export default App;