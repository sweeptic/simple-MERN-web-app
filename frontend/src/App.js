import React from 'react';  //default
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom'; //named
import { Places } from './places/pages/Places';
import { Users } from './users/pages/Users';

const App = () => {

  return (
    <Router>
      <Switch>
        <Route path='/' exact component={Users} />
        <Route path='/Places' component={Places} />

        <Redirect to="/" />
      </Switch>
    </Router>
  )



}

export default App;
