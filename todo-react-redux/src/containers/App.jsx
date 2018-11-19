import React from 'react';
import LoginView from '../views/LoginView';
import ForgotPasswordView from '../views/ForgotPasswordView';
import HomePage from './homePage.jsx';
import LoginService from '../services/login.js';
import {logOut} from '../views/MainView/actions.js';
import { connect } from 'react-redux';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

class App  extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			loginState: (this.getLoginSession && props.loginState),
		}
	}

	getLoginSession = () => {
		if(LoginService.checkLogin()){
			return true;
		}else{
			return false;
		}
	}

	render(){
		return (
			<div>
			<Router>
			<Switch>
			<Route path="/login" render={() => (
				<div>
				<div className="todo-app">
				<LoginView loginService={LoginService} loginState={this.state.loginState} />
				</div>
				<div className="todo-app">
				<ForgotPasswordView />
				</div>
				</div>)} 
			/>
			<Route path="/" render={() => (<HomePage path="/" component={HomePage} loginState={this.state.loginState} logInStateChanger={this.props.logOut} />)} />
			</Switch>
			</Router>
			</div>
			);
	}
}


const mapStateToProps = (state)=>  {
console.log(state.logInStateChanger.loginState);
	return ({
	loginState: state.logInStateChanger.loginState
})
}
const mapDispatchToProps = (dispatch) => ({
	logOut: () => {
		dispatch(logOut());
		LoginService.signout();
	}
})
export default connect(
	mapStateToProps,
	mapDispatchToProps
	)(App);

