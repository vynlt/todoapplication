import {Item, ItemList, ItemQuery, ItemUpdate, emptyItemQuery} from './item';

export default class Store {
	/**
	 * @param {!string} dataBaseName
	 * @param {function()} [callback] 
	 */
	constructor(dataBaseName, callback) {
		/**
		 * @type {Storage}
		 */
		const localStorage = window.localStorage;

		/**
		 * @type {ItemList}
		 */
		let liveTodos;

		/**
		 * @returns {ItemList}
		 */
		this.getLocalStorage = () => {
			return liveTodos || JSON.parse(localStorage.getItem(dataBaseName) || '[]');
		};

		/**
		 * @param {ItemList} todos
		 */
		this.setLocalStorage = (todos) => {
			localStorage.setItem(dataBaseName, JSON.stringify(liveTodos = todos));
		};

		if (callback) {
			callback();
		}
	}

	/**
	 * @param {ItemQuery} query 
	 * @param {function(ItemList)} callback 
	 */
	find(query, callback) {
		const todos = this.getLocalStorage();
		let k;

		callback(todos.filter(todo => {
			for (k in query) {
				if (query[k] !== todo[k]) {
					return false;
				}
			}
			return true;
		}));
	}

	/**
	 * @param {ItemUpdate} update 
	 * @param {function()} [callback]
	 */
	update(update, callback) {
		const id = update.id;
		const todos = this.getLocalStorage();
		let i = todos.length;
		let k;

		while (i--) {
			if (todos[i].id === id) {
				for (k in update) {
					todos[i][k] = update[k];
				}
				break;
			}
		}

		this.setLocalStorage(todos);

		if (callback) {
			callback();
		}
	}

	/**
	 * @param {Item} item Item to insert
	 * @param {function()} [callback] Called when item is inserted
	 */
	insert(item, callback) {
		const todos = this.getLocalStorage();
		todos.push(item);
		this.setLocalStorage(todos);

		if (callback) {
			callback();
		}
	}

	/**
	 * @param {ItemQuery} query Query matching the items to remove
	 * @param {function(ItemList)|function()} [callback] Called when records matching query are removed
	 */
	remove(query, callback) {
		let k;

		const todos = this.getLocalStorage().filter(todo => {
			for (k in query) {
				if (query[k] !== todo[k]) {
					return true;
				}
			}
			return false;
		});

		this.setLocalStorage(todos);

		if (callback) {
			callback(todos);
		}
	}

	/**
	 * @param {function(number, number, number)} callback 
	 */
	count(callback) {
		this.find(emptyItemQuery, data => {
			const total = data.length;

			let i = total;
			let completed = 0;

			while (i--) {
				completed += data[i].completed;
			}
			callback(total, total - completed, completed);
		});
	}
}