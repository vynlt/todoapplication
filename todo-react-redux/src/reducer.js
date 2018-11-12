import { combineReducers } from 'redux';
import {
  ADD_TODO,
  DELETE_TODO,
  EDIT_TODO,
  COMPLETE_TODO,
  COMPLETE_ALL_TODOS,
  CLEAR_COMPLETED, 
  SET_VISIBILITY_FILTER,

  HANDLE_SUBMIT,
} from './constants/ActionTypes';
import { SHOW_ALL } from './constants/TodoFilters';

const visibilityFilter = (state = SHOW_ALL, action) => {
	switch(action.type){
		case SET_VISIBILITY_FILTER:
		return action.filter;
		default:
		return state;
	}
}



const todos = (state = [], action) => {
	switch (action.type){
		case ADD_TODO:
		return [
			...state,
			{
				id: state.reduce((maxId, todo) => Math.max(todo.id, maxId), -1) + 1,
				completed: false,
				text: action.text,
			}
		];
		
		case DELETE_TODO:
		return state.filter(todo => todo.id !== action.id);
		
		case EDIT_TODO:
		return state.map(todo => todo.id === action.id ? {...todo, text: action.text} : todo);
		
		case COMPLETE_TODO:
		return state.map(todo => todo.id === action.id ? {...todo, completed: !todo.completed} : todo);
		
		case COMPLETE_ALL_TODOS:
		const areAllMarked = state.every(todo => todo.completed);
		return state.map(todo => ({
			...todo, 
			completed: !areAllMarked
		}));

		case CLEAR_COMPLETED:
		return state.filter(todo => todo.completed === false);

		default:
		return state;
	}
}

const inputHandler = (state = HANDLE_SUBMIT, action) => {
	switch(action.type){
		case HANDLE_SUBMIT:
		const text = action.e.target.value.trim();
    if (action.e.which === 13) {
      action.props.onSave(text);
      if (action.props.newTodo) {
        return { text: '' };
      }
    }
		return state;	
	
		default:
		return state;
	}
}

const rootReducer = combineReducers({
	todos,
	visibilityFilter,
	inputHandler
});

export default rootReducer;