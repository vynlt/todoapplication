import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import App from './containers/App';
import reducer from './views/MainView/reducer.js';
import Model from './model/Model';
import {SHOW_ALL} from './constants/TodoFilters'; 

let model = new Model("MyModelName1");
const initialState = {
	todos: model.todos,
	visibilityFilter: SHOW_ALL,
}
const store = createStore(reducer, initialState);
store.subscribe(() => {
	model.todos = store.getState().todos;
	localStorage.clear();
	model.inform();
})

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);