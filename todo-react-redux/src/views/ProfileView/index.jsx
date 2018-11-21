import React from 'react';
import ProfileForm from "../components/ProfileForm";
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { reset, getFormValues} from 'redux-form'  
import { connect } from 'react-redux' 
import ProfileService from '../../services/profile.js'
import LoginService from '../../services/login.js'

class ProfileView extends React.Component {
	constructor(props){
		super(props);
	}

	handleSubmit = () => {
		this.refs.ProfileForm.submit();
	}

	handleReset = () => {
		this.props.reset('ProfileForm');
	}

	onSubmit = () =>{
		const firstName = this.props.values ? this.props.values.firstName: null;
		const lastName= this.props.values ? this.props.values.lastName: null;
		const dateOfBirth = this.props.values ? this.props.values.dateOfBirth: null;
		const ethnicity = this.props.values ? this.props.values.ethnicity: null;
		const notes = this.props.values ? this.props.values.notes: null;
		
		const data = {firstName: firstName,
						lastName: lastName,
						dateOfBirth: dateOfBirth + '',
						ethnicity: ethnicity,
						notes: notes}
		ProfileService.save(LoginService.checkLogin(), data);
	}

	onInitial = () => {
		return ProfileService.getUser(LoginService.checkLogin());
	}

	render(){
		return(
			<div>
			<div className="profile-header">
			<h1 className="profile">
			Profile
			</h1></div>
			<MuiThemeProvider muiTheme={getMuiTheme()}>
			<ProfileForm  ref="ProfileForm" initialValues={this.onInitial()} onSubmit={this.onSubmit} />
			</MuiThemeProvider>
			<div style={{"textAlign": "center", "padding": "10px"}}>
			<button className="btn btn-outline-primary" onClick={this.handleSubmit} >
			Save
			</button>
			<button className="btn btn-outline-dark" onClick={this.handleReset}>
			Clear Values
			</button>
			</div>
			</div>
			);
	}
}

export default connect(state => ({values: getFormValues('ProfileForm')(state)}), { reset })(ProfileView)