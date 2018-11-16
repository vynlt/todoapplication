import React from 'react'
import { Field, reduxForm } from 'redux-form'
import submit from './submit'
import TextField from 'material-ui/TextField'
import PasswordField from 'material-ui-password-field'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


const LoginForm = props => {
  const { error, handleSubmit, pristine, reset, submitting } = props
  return (
    <MuiThemeProvider>
    <form onSubmit={handleSubmit(submit)}>
    <TextField
    hintText="Email format"
    floatingLabelText="Enter your email"
    errorText={error}
    />
    <PasswordField
    hintText="At least 8 characters"
    floatingLabelText="Enter your password"
    errorText={error}
    />
    {error && <strong>{error}</strong>}
    <div>
    <button className="btn btn-outline-primary" onClick={props.onLogin} type="submit" disabled={submitting}>
    Log In
    </button>
    <button className="btn btn-outline-dark" type="button" disabled={pristine || submitting} onClick={reset}>
    Clear Values
    </button>
    </div>
    </form>
    </MuiThemeProvider>
    )
}

export default reduxForm({
  form: 'submitValidation' 
})(LoginForm)