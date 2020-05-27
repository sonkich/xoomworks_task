import React from 'react';
import './App.scss';
import { Header } from './components';
import { Route, Switch, BrowserRouter as Router, Redirect } from 'react-router-dom';
import { CreateEmployee, Employee, Employees } from './pages';

function App() {
  return (
      <Router>
          <div className="App">
              <Header />
              <Switch>
                  <Route exact path="/employees">
                      <Employees/>
                  </Route>
                  <Route path="/create-employee">
                      <CreateEmployee/>
                  </Route>
                  <Route path="/employees/:employeeId">
                      <Employee/>
                  </Route>
                  <Route exact path="/" render={() => (<Redirect to="/employees" />)} />
              </Switch>
          </div>
      </Router>
  );
}

export default App;
