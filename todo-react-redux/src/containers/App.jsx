import React from 'react';
import MainSection from '../views/MainView/index.js';
import NavBar from '../views/HeaderView/';
import About from '../views/AboutView/';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

const App = (props) => {
	return (
		<div className="learn-bar">
			<NavBar />
			<Router>
				<Switch>	
					<Route exact path="/" component={MainSection} />} />
					<Route path="/about" component={About} />
				</Switch>
			</Router>
		</div>
	);
}
export default App;