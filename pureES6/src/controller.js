import {emptyItemQuery} from './item';
import Store from './store';
import View from './view';

export default class Controller {
	/**
	 * @param  {!Store} store 
	 * @param  {!View} view 
	 */
	constructor(store, view) {
		this.store = store;
		this.view = view;

		view.bindAddItem(this.addItem.bind(this));
		view.bindEditItemSave(this.editItemSave.bind(this));
		view.bindEditItemCancel(this.editItemCancel.bind(this));
		view.bindRemoveItem(this.removeItem.bind(this));
		view.bindToggleItem((id, completed) => {
			this.toggleCompleted(id, completed);
			this._filter();
		});
		view.bindRemoveCompleted(this.removeCompletedItems.bind(this));
		view.bindToggleAll(this.toggleAll.bind(this));

		this._activeRoute = '';
		this._lastActiveRoute = null;
	}

	/**
	 * @param {string} raw '' | '#/' | '#/active' | '#/completed'
	 */
	setView(raw) {
		const route = raw.replace(/^#\//, '');
		this._activeRoute = route;
		this._filter();
		this.view.updateFilterButtons(route);
	}

	/**
	 * @param {!string} title
	 */
	addItem(title) {
		this.store.insert({
			id: Date.now(),
			title,
			completed: false
		}, () => {
			this.view.clearNewTodo();
			this._filter(true);
		});
	}

	/**
	 * @param {number} id 
	 * @param {!string} title 
	 */
	editItemSave(id, title) {
		if (title.length) {
			this.store.update({id, title}, () => {
				this.view.editItemDone(id, title);
			});
		} else {
			this.removeItem(id);
		}
	}

	/**
	 * @param {!number} id 
	 */
	editItemCancel(id) {
		this.store.find({id}, data => {
			const title = data[0].title;
			this.view.editItemDone(id, title);
		});
	}

	/**
	 * @param {!number} id 
	 */
	removeItem(id) {
		this.store.remove({id}, () => {
			this._filter();
			this.view.removeItem(id);
		});
	}

	removeCompletedItems() {
		this.store.remove({completed: true}, this._filter.bind(this));
	}

	/**
	 * @param {!number} id
	 * @param {!boolean} completed 
	 */
	toggleCompleted(id, completed) {
		this.store.update({id, completed}, () => {
			this.view.setItemComplete(id, completed);
		});
	}

	/**
	 * @param {boolean} completed
	 */
	toggleAll(completed) {
		this.store.find({completed: !completed}, data => {
			for (let {id} of data) {
				this.toggleCompleted(id, completed);
			}
		});

		this._filter();
	}

	/**
	 * @param {boolean} [force]
	 */
	_filter(force) {
		const route = this._activeRoute;

		if (force || this._lastActiveRoute !== '' || this._lastActiveRoute !== route) {
			/* jscs:disable disallowQuotedKeysInObjects */
			this.store.find({
				'': emptyItemQuery,
				'active': {completed: false},
				'completed': {completed: true}
			}[route], this.view.showItems.bind(this.view));
			/* jscs:enable disallowQuotedKeysInObjects */
		}

		this.store.count((total, active, completed) => {
			this.view.setItemsLeft(active);
			this.view.setClearCompletedButtonVisibility(completed);

			this.view.setCompleteAllCheckbox(completed === total);
			this.view.setMainVisibility(total);
		});

		this._lastActiveRoute = route;
	}
}