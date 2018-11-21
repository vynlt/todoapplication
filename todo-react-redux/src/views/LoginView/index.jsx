import React from 'react';
import LoginForm from "../components/LoginForm";
import { Redirect} from 'react-router-dom';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { SubmissionError } from 'redux-form'

class LoginView extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      loginState: this.props.loginState,
      loginEmail: null
    }
  }
  
  handleSubmit = (values) => {
    const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))
    return sleep(1000).then(() => {
      if (!this.props.loginService.getUser(values.email)) {
        throw new SubmissionError({
          email: 'User does not exist',
          _error: 'Login failed!'
        })
      } else if (values.password !== this.props.loginService.getUser(values.email)) {
        throw new SubmissionError({
          password: 'Wrong password',
          _error: 'Login failed!'
        })
      } else{
        
        this.setState({loginEmail: values.email});
      }
    });
  }

  render() {
    const { from } =  { from: { pathname: "/" } };
    if (this.state.loginState) return <Redirect to={from} />;
    
    return (
      <div style={{"width": "300px", "margin": "45% auto"}}>
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