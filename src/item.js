/**
 * @typedef {!{id: number, completed: boolean, title: string}}
 */
export var Item;

/**
 * @typedef {!Array<Item>}
 */
export var ItemList;

/**
 * @enum {Object}
 */
const Empty = {
	Record: {}
};

/**
 * @typedef {Empty}
 */
export var EmptyItemQuery;

/**
 * @type {EmptyItemQuery}
 */
export const emptyItemQuery = Empty.Record;

/**
 * @typedef {!({id: number}|{completed: boolean}|EmptyItemQuery)}
 */
export var ItemQuery;

/**
 * @typedef {!({id: number, title: string}|{id: number, completed: boolean})}
 */
export var ItemUpdate;