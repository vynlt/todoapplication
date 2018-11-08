import React from 'react';
import Item from './Item.jsx';
import Footer from './Footer.jsx';


const ENTER_KEY = 13;

const ALL_TODOS = 'all';
const ACTIVE_TODOS = 'active';
const COMPLETED_TODOS = 'completed';
const MODEL_NAME = "MyModel";

class App extends React.Component{
	constructor (props){
		super(props);
		this.state = {
			nowShowing: ALL_TODOS,
			newTodo: '',
			editing: null,
			todos: this.storeData(MODEL_NAME),
			onChanges: [],
		}


	}

        showAll(){
			this.setState({
				nowShowing: ALL_TODOS,
			});
			console.log("Trigger" + this.state.nowShowing);
        }

        showActive(){
this.setState({
				nowShowing: ACTIVE_TODOS,
			});
        }

        showCompleted(){
this.setState({
				nowShowing: COMPLETED_TODOS,
			});
        }

	storeData(modelName, data){
		if (data) {
			return localStorage.setItem(modelName, JSON.stringify(data));
		}

		let model = localStorage.getItem(modelName);
		return (model && JSON.parse(model)) || [];
	}

	generateRandomId(){
		return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
	}

	extend(){
		var newObj = {};
		for (var i = 0; i < arguments.length; i++) {
			var obj = arguments[i];
			for (var key in obj) {
				if (obj.hasOwnProperty(key)) {
					newObj[key] = obj[key];
				}
			}
		}
		return newObj;
	}

	insert(val){
		this.setState({
			todos: this.state.todos.concat(
			{
				id: this.generateRandomId(),
				title: val,
				completed: false,
			}),
		});

		this.storeData(MODEL_NAME, this.state.todos);
	}

	toggleAll(event){
		this.setState({
			todos: this.state.todos.map((todo) => {
				return this.extend({}, todo, {completed: event.target.checked});
			}),
		});
		this.storeData(MODEL_NAME, this.state.todos);
	}

	toggle(todoToToggle, event){
		this.setState({
			todos: this.state.todos.map((todo) => {
				return todo !== todoToToggle ?
				todo :
				this.extend({}, todo, {completed: !todo.completed});
			}),
		});


		this.storeData(MODEL_NAME, this.state.todos);
	}

	destroyTodo(todo){
		this.setState({
			todos: this.state.todos.filter((candidate) => {
				return candidate !== todo;
			}),
		});

		this.storeData(MODEL_NAME, this.state.todos);
	}


	save(todoToSave, text) {
		this.setState({
			todos: this.state.todos.map((todo) => {
				return todo !== todoToSave ? todo : this.extend({}, todo, {title: text});
			}),
		});
		this.storeData(MODEL_NAME, this.state.todos);
		this.setState({editing: null});
	}

	clearCompleted() {
		this.setState({
			todos: this.state.todos.filter((todo) => {
				return !todo.completed;
			}),
		});
		

		this.storeData(MODEL_NAME, this.state.todos);
	}

	edit(todo) {
		this.setState({editing: todo.id});
	}



	handleNTDKeyChange(event){

		this.setState({
			newTodo: event.target.value,
		});
	}

	handleNTDKeyDown(event){
		if (event.keyCode !== ENTER_KEY) {
			return;
		}

		let val = this.state.newTodo.trim();

		if (val) {
			this.insert(val);
			this.setState({newTodo: ''});
		}
	}




	render(){
		const srcLink = "https://github.com/vynlt/todoapplication";
		const ES6Link = "https://www.w3schools.com/js/js_es6.asp";
		const emptyLink = "#";
		let main;
		let footer;

		let shownTodos = this.state.todos.filter((todo) =>
		{
			switch (this.state.nowShowing){
				case ACTIVE_TODOS:
				return !todo.completed;
				case COMPLETED_TODOS:
				return todo.completed;
				default:
				return true;
			}
		});
		
		let todoItems = shownTodos.map((todo) => {
			return (
				<Item
				key={todo.id}
				todo={todo}
				onToggle={() => this.toggle(todo)}
				onDestroy={() => this.destroyTodo(todo)}
				editing={this.state.editing === todo.id}
				onSave={() => this.save(todo)}
				onEdit={() => this.edit(todo)}
				onCancel={() => this.cancel(todo)}
				/>
				);
		});

		let activeTodoCount = this.state.todos.reduce(function (accum, todo) {
			return todo.completed ? accum : accum + 1;
		}, 0);

		var completedCount = this.state.todos.length - activeTodoCount;

		if (activeTodoCount || completedCount) {
			footer =
			<Footer
			count={activeTodoCount}
			completedCount={completedCount}
			nowShowing={this.state.nowShowing}
			onClickShowAll={() => this.showAll()}
			onClickShowActive={() => this.showActive()}
			onClickShowCompleted={() => this.showCompleted()}
			onClearCompleted={() => this.clearCompleted()}
			/>;
		}


		if (this.state.todos.length) {
			main = (
				<section  className="main">
				<input id="toggle-all" className="toggle-all" type="checkbox" 
				onChange={(event) => this.toggleAll(event)}
				checked={activeTodoCount === 0}
				/>
				<label htmlFor="toggle-all"> Mark all as complete</label>
				<ul className="todo-list">
				{todoItems}
				</ul>
				</section>
				);
		}

		return(
			<div className="learn-bar">
			<aside className="learn">
			<header>
			<h3>ECMAScript 6</h3>
			<span>
			<h5>
			Vanilla ES6
			</h5>
			<a className="btn btn-outline-dark btn-sm btn-source" href={srcLink}>Source</a>
			</span>
			</header>
			<hr/>
			<blockquote className="quote speech-bubble">
			<p className="text-primary">
			The ECMAScript 6 (ES2015) standard was ratified in 2015 following years of work standardizing improvements to ECMAScript 3. The committee introduced a wide variety of improvements such as arrow functions, const declarations, and native Promises.
			</p>
			<footer>
			<a className="btn btn-light" href={ES6Link}>ECMAScript 6</a>
			</footer>
			</blockquote>
			<footer>
			<hr/>
			<em>
			If you have other helpful links to share, or find any of the links above no longer work, please 
			<a href={emptyLink}>let us know</a>
			.
			</em>
			</footer>
			</aside>
			<section className="todoapp">
			<header>
			<h1>TodoApp</h1>
			<input className="new-todo" placeholder="What needs to be done?"  value={this.state.newTodo} 
			onChange={event => this.handleNTDKeyChange(event)} 
			onKeyDown={event => this.handleNTDKeyDown(event)}
			/>
			</header>
			{main}
			{footer}
			</section>
			<footer className="info">
			<p>Footer line 1</p>
			<p>
			Written by
			<a href={emptyLink}>Vy Nguyen</a>
			</p>
			<p>
			Refactored by 
			<a href={emptyLink}>Vy Nguyen</a>
			</p>
			<p>
			Part of
			<a href={emptyLink}>Todo App</a>
			</p>
			</footer>
			</div>
			);
	}
}

export default App;