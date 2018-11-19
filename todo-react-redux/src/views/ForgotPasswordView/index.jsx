import React from 'react';

class ForgotPasswordView extends React.Component {

	render() {
		return (
			<div style={{"width": "300px", "margin": "-30% auto"}}>
			<button className="btn btn-outline-primary" type="button">
			Forgot Password
			</button>
			<div>Account: </div>
			<div>ForgotPassword: </div>
			</div>
			);
	}
}

export default ForgotPasswordView;