import {combineReducers} from 'redux';
import {todos, visibilityFilter, logInStateChanger}  from '../views/MainView/reducer';
import { reducer as reduxFormReducer } from 'redux-form';

const rootReducer = combineReducers({
	todos,
	visibilityFilter,
	logInStateChanger,
	form: reduxFormReducer
});
export default rootReducer;