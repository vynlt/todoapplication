import React from 'react'
import { Field, reduxForm } from 'redux-form'
import TextField from 'material-ui/TextField'
import PasswordField from 'material-ui-password-field'
import { SubmissionError } from 'redux-form'
import LoginService from '../../../services/login.js';

const validate = values => {
  const errors = {}
  const requiredFields = [
  'email',
  'password'
  ]
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Required'
    }
  })

  if (
    values.email &&
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
    errors.email = 'Invalid email address'
}

if (
 values.password && !/[A-Z]/.test(values.password)
 ) {
  errors.password = 'A least one uppercase letter';
}else if (
 values.password && !/[a-z]/.test(values.password)
 ) {
  errors.password = 'A least one lowercase letter';
}else if (
 values.password && !/[0-9]/.test(values.password)
 ) {
  errors.password = 'A least one digit letter';
}
return errors
}

const renderTextField = ({
  input,
  label,
  meta: { touched, error },
  ...custom
}) => (
<TextField
hintText={label}
floatingLabelText={label}
errorText={touched && error}
{...input}
{...custom}
/>
)

const renderPasswordField = ({
  input,
  label,
  meta: { touched, error },
  ...custom
}) => (
<PasswordField
hintText={label}
floatingLabelText={label}
errorText={touched && error}
{...input}
{...custom}
/>
)

class LoginForm extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      forgotPassword: false,
      email: ''
    }
  }

  handleChange = (event) => {
    const value = event.target.value;
    console.log(value);
    this.setState({
      email: value,
    })
  }
  
  render() {
    const {  error, handleSubmit, pristine, reset, submitting} = this.props;
    return (
      <form onSubmit={handleSubmit}>
      <div>
      <Field name="email" component={renderTextField} label="Email" onChange={this.handleChange} />
      </div>
      
      <div>
      <Field name="password" component={renderPasswordField} label="Password" />
      </div>
      {error && <strong>{error}</strong>}
      <div>
      <button className="btn btn-outline-primary" type="submit" disabled={submitting}>
      Submit
      </button>
      <button className="btn btn-outline-dark" type="button" disabled={pristine || submitting} onClick={() => {
        reset();
        this.setState({
          email: '',
          forgotPassword: false,
        });
      }}>
      Clear Values
      </button>
      <button className="btn btn-outline-primary" type="button"onClick={() => {

        if (LoginService.getUser(this.state.email) && this.state.email.trim() !== "") {
          this.setState({ forgotPassword: true, });
        }else 
        this.setState({ forgotPassword: false, });
      }
    } >
    Forgot Password
    </button>
    {this.state.forgotPassword && (<div>
      <h3>Forgotten account</h3>
      <div>Email: {this.state.email}</div>
      <div>Forgotten password: {LoginService.getUser(this.state.email)}</div>
      </div>)}
    </div>
    </form>
    )
  }
}


const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

const submit = (values) => {
  return sleep(1000).then(() => {

    if (!LoginService.getUser(values.email)) {
      throw new SubmissionError({
        email: 'User does not exist',
        _error: 'Login failed!'
      })
    } else if (values.password !== LoginService.getUser(values.email)) {
      throw new SubmissionError({
        password: 'Wrong password',
        _error: 'Login failed!'
      })
    } 
  })
}

export default reduxForm({
  form: 'LoginForm', // a unique identifier for this form
  validate,
  onSubmit: submit,
})(LoginForm)