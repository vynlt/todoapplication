import {combineReducers} from 'redux';
import {todos, visibilityFilter}  from '../views/MainView/reducer';

const rootReducer = combineReducers({
	todos,
	visibilityFilter
});
export default rootReducer;