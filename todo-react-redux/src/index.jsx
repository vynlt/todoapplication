import React from 'react';
import {render} from 'react-dom';
import {createStore} from 'redux';
import {Provider} from 'react-redux';

import 'bootstrap/dist/css/bootstrap.css';
import './styles/index.scss';
import App from './containers/App';
import reducer from './reducers';
import Model from './model/Model';
import {SHOW_ALL} from './constants/index.js'; 



let model = new Model("MyModelName1");

const initialState = {
	todos: model.todos,
	visibilityFilter: SHOW_ALL,
}
const store = createStore(reducer, initialState);
store.subscribe(() => {
	model.todos = store.getState().todos;
	model.inform();
})

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);