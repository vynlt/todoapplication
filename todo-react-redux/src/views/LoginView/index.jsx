import React from 'react';
import LoginForm from "../components/LoginForm";
import { Redirect} from 'react-router-dom';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import {LoginService} from '../../services/login.js';
import './style.scss'

class LoginView extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      loginState: this.props.loginState,
      loginEmail: null
    }
  }
  
  handleSubmit = (values) => {
    LoginService.login(values.email, values.password)
    .then(
        user => {
          this.setState({loginEmail: values.email});
        },
        error => this.setState({ error, loading: false })
    );
  }

  render() {
    const { from } =  { from: { pathname: "/" } };
    if (this.state.loginState) return <Redirect to={from} />;
    
    return (
      <div className="todo-app-login-view">
      <MuiThemeProvider muiTheme={getMuiTheme()}>
      <LoginForm 
      onSubmit={this.handleSubmit}
      onSubmitSuccess={() => {
        this.props.logInHandler(() => {
          this.setState({
            loginState: true,
          })
        }, this.state.loginEmail);
      }} />
      </MuiThemeProvider>
      </div>
    );
  }
}

export default LoginView;