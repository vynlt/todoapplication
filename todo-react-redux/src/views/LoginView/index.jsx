import React from 'react';
import LoginForm from "../components/LoginForm";
import { Redirect} from 'react-router-dom';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class LoginView extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      forgotPassword: false,
    }
  }
  

  render() {
    const { from } =  { from: { pathname: "/" } };
    if (this.props.loginService.checkLogin()) return <Redirect to={from} />;
    
    return (
      <div style={{"width": "300px", "margin": "auto"}}>
      <MuiThemeProvider muiTheme={getMuiTheme()}>
      <LoginForm 
      onSubmitSuccess={() => {
        this.props.loginService.authenticate(() => {
          this.forceUpdate();
        });
      }} />
     
      </MuiThemeProvider>
      </div>
      );
  }
}


export default LoginView;