import React from 'react';
import LoginForm from "../components/LoginForm";
import { BrowserRouter as Router, Route, Redirect, Switch} from 'react-router-dom';
import Login from '../../services/login.js';

class LoginView extends React.Component {
  constructor(props){
    super(props);
  }
  state = { redirectToReferrer: false };
  
  login = () => {
    this.props.loginService.authenticate(() => {
      this.setState({ redirectToReferrer: true });
    });
  };

  render() {
    let { from } =  { from: { pathname: "/" } };
    let { redirectToReferrer } = this.state;
    if (redirectToReferrer) return <Redirect to={from} />;
    return (
      <div style={{"width": "300px", "margin": "auto"}}>
        <LoginForm onLogin={this.login} />
      </div>
    );
  }
}


  export default LoginView;