import React from 'react'
import { Field, reduxForm } from 'redux-form'
import TextField from 'material-ui/TextField'
import SelectField from 'material-ui/SelectField'
import DatePicker from 'material-ui/DatePicker'
import MenuItem from 'material-ui/MenuItem'
import { connect } from 'react-redux'


const renderTextField = ({ input, label, meta: { touched, error }, ...custom
}) => (
<TextField
hintText={label}
floatingLabelText={label}
errorText={touched && error}
{...input}
{...custom}
/>
)


const renderSelectField = ({
	input,
	label,
	meta: { touched, error },
	children,
	...custom
}) => (
<SelectField style={{bottom: "-14px"}}
floatingLabelText={label}
errorText={touched && error}
{...input}
onChange={(event, index, value) => input.onChange(value)}
children={children}
{...custom}
/>
)

const renderDatePicker = ({
	input,
	label,
	meta: { touched, error },
	minDate,
	maxDate
}) => {
	return(
<DatePicker style={{ width: "256px", display: "inline-block", position: "relative"}}
floatingLabelText={label}
onChange={(event, value) => input.onChange(value)}
minDate={minDate}
maxDate={maxDate}
value={new Date(input.value) || null}
/>
)
}


const renderMultiLineField = ({ input, label, meta: { touched, error }, ...custom
}) => { 

	return(
		<TextField
		style = {{"width": "100%"}}
		hintText={label}
		floatingLabelText={label}
		errorText={touched && error}
		multiLine={true}
		rows={1}
		rowsMax={5}
		value={input.value}
		{...input}
		{...custom}
		/>
		)
}


const validate = values => {
	const errors = {}
	const requiredFields = [
	'firstName',
	'lastName',
	'dateOfBirth',
	'ethnicity',
	]
	requiredFields.forEach(field => {
		if (!values[field]) {
			errors[field] = 'Required'
		}
	})

	return errors
}


class ProfileForm extends React.Component {
	constructor(props){
		super(props);
		
	}

	limitLines = (event) => {
		if(this.getNumberOfLines(event.target.value) === 5)
			if(event.which == 13){
				event.preventDefault();
			}
		}

		getNumberOfLines = (str) => {
			if (str) {
				return str.split(/\r\n|\r|\n/).length;
			}
			return 1;
		}

		render(){
			return (
				<form>
				<div>
				<span>
				<Field name="firstName" component={renderTextField} label="First Name" />
				</span>
				
				<span>
				<Field name="lastName" component={renderTextField} label="Last Name" />
				</span>
				<span>
				<Field name="dateOfBirth" component={renderDatePicker} label="Date of Birth" minDate={new Date(1970, 0)} maxDate={new Date()} />
				</span>
				<span>
				<Field
				name="ethnicity"
				component={renderSelectField}
				label="Ethnicity"
				>
				<MenuItem value="kinh" primaryText="Kinh" />
				<MenuItem value="hoa" primaryText="Hoa" />
				<MenuItem value="cham" primaryText="Cham" />
				<MenuItem value="khmer" primaryText="Khmer" />
				<MenuItem value="other" primaryText="Other" />
				</Field>
				
				</span>
				</div>
				
				<div style={{"paddingLeft" : "10px", "paddingRight": "10px", "maxWidth": "512px", margin: "0 auto 0 auto"}}>
				<Field
				name="notes"
				component={renderMultiLineField}
				label="Notes"
				onKeyPress={(event) => this.limitLines(event)}
				/>
				</div>
				

				</form>
				)
		}
	}

	const mapStateToProps = (state, ownProps) => {
		return {
			initialValues: {
				firstName: ownProps.initialValues.firstName,
				lastName: ownProps.initialValues.lastName,
				dateOfBirth: ownProps.initialValues.dateOfBirth,
				ethnicity: ownProps.initialValues.ethnicity,
				notes: ownProps.initialValues.notes,
			}
		}
	}

	ProfileForm = connect(mapStateToProps)(ProfileForm);

	export default reduxForm({
		form: 'ProfileForm',
		enableReinitialize: true,
		validate,

	})(ProfileForm)