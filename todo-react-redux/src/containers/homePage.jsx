import React from 'react';
import MainView from '../views/MainView';
import HeaderView from '../views/HeaderView';
import AboutView from '../views/AboutView';
import { BrowserRouter as Router, Route, Redirect, Switch} from 'react-router-dom';


const HomePage = ({ component: Component, loginService , ...rest }) => {
	return (
		<Route
		{...rest}
		render={(props) =>
			loginService.checkLogin() ? (
				<div>
				<HeaderView />
				<Router>
				<Switch>
				<Route exact path="/" component={MainView} />
				<Route path="/about" component={AboutView} />
				</Switch>
				</Router>
				</div>
				) : (
				<Redirect
				to={{
					pathname: "/login",
					state: { from: props.location }
				}}
				/>
				)
			}
		/>
	);
}
export default HomePage;