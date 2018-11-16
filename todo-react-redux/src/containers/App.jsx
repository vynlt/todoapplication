import React from 'react';
import LoginView from '../views/LoginView';
import HomePage from './homePage.jsx';
import LoginService from '../services/login.js';

import { BrowserRouter as Router,
  Route,
  Link,
  Redirect,
   Switch } from 'react-router-dom';

const App = (props) => {
	return (
		<div className="todo-app">
		<Router>
		<Switch>
		<Route path="/login" render={() => <LoginView loginService={LoginService} />} />
		<HomePage path="/" component={HomePage} loginService={LoginService} />
		</Switch>
		</Router>
		</div>
	);
}
export default App;