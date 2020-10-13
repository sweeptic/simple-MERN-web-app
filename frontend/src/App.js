import React from "react"; //default
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom"; //named
import { Places } from "./places/pages/Places";
import Users from "./users/pages/Users";
import MainNavigation from "./shared/components/navigation/MainNavigation";

const App = () => {
  return (
    <Router>
      <MainNavigation />
      <main>
        <Switch>
          <Route path="/" exact component={Users} />
          <Route path="/Places" component={Places} />

          <Redirect to="/" />
        </Switch>
      </main>
    </Router>
  );
};

export default App;
