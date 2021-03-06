import {ItemList} from './item';

import {escapeForHTML} from './helpers';

export default class Template {
	/**
	 * @param {ItemList} items 
	 * @returns {!string} 
	 */
	itemList(items) {
		return items.reduce((a, item) => a + `
<li data-id="${item.id}" ${item.completed ? ' class="completed"' : ''} >
	<div class="view">
		<input class="toggle" type="checkbox" ${item.completed ? 'checked' : ''}>
		<label>${escapeForHTML(item.title)}</label>
		<button class="destroy"></button>
	</div>
</li>`, '');
	}

	/**
	 * @param {number} activeTodos
	 *
	 * @returns {!string}
	 */
	itemCounter(activeTodos) {
		return `${activeTodos} item${activeTodos !== 1 ? 's' : ''} left`;
	}
}