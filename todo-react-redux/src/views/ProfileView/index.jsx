import React from 'react';
import ProfileForm from "../components/ProfileForm";
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const ProfileView = () => {
	return(
		<div>
		<MuiThemeProvider muiTheme={getMuiTheme()}>
		<ProfileForm  />
		</MuiThemeProvider>
		  <button className="btn btn-outline-primary" type="submit">
          Save
          </button>
          <button className="btn btn-outline-dark" type="button">
          Clear Values
          </button>
		</div>
	);
}

export default ProfileView;