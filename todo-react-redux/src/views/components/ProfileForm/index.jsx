import React from 'react'
import { Field, reduxForm } from 'redux-form'
import TextField from 'material-ui/TextField'
import SelectField from 'material-ui/SelectField'
import DatePicker from 'material-ui/DatePicker'
import MenuItem from 'material-ui/MenuItem'



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
<SelectField
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
	minDate,
	maxDate
}) => (
<DatePicker
floatingLabelText={label}
onChange={(event, value) => input.onChange(value)}
/>
)



const renderMultiLineField = ({ input, label, meta: { touched, error }, ...custom
}) => { 

	return(
		<TextField
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
			const {  error, handleSubmit, pristine, reset, submitting, invalid, minDate, maxDate} = this.props;
			return (
				<form onSubmit={handleSubmit}>
				<div>
				<Field name="firstName" component={renderTextField} label="First Name" />
				</div>
				<div>
				<Field name="lastName" component={renderTextField} label="Last Name" />
				</div>
				<div>
				<Field name="dateOfBirth" component={renderDatePicker} label="Date of Birth" minDate={minDate} maxDate={maxDate} />
				</div>
				<div>
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
				</div>
				<div>
				<Field
				name="notes"
				component={renderMultiLineField}
				label="Notes"
				onKeyPress={(event) => this.limitLines(event)}
				/>
				</div>
				{error && <strong>{error}</strong>}
				<div>

				</div>
				</form>
				)
		}
	}

	export default reduxForm({
		form: 'ProfileForm',
	})(ProfileForm)