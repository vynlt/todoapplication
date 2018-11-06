/**
 * @param {string} selector 
 * @param {Element} [scope] 
 */
export function qs(selector, scope) {
	return (scope || document).querySelector(selector);
}

/**
 * @param {Element|Window} target 
 * @param {string} type 
 * @param {Function} callback 
 * @param {boolean} [capture] 
 */
export function $on(target, type, callback, capture) {
	target.addEventListener(type, callback, !!capture);
}

/**
 * @param {Element} target
 * @param {string} selector 
 * @param {string} type 
 * @param {Function} handler 
 * @param {boolean} [capture] 
 */
export function $delegate(target, selector, type, handler, capture) {
	const dispatchEvent = event => {
		const targetElement = event.target;
		const potentialElements = target.querySelectorAll(selector);
		let i = potentialElements.length;

		while (i--) {
			if (potentialElements[i] === targetElement) {
				handler.call(targetElement, event);
				break;
			}
		}
	};

	$on(target, type, dispatchEvent, !!capture);
}

/**
 * @param {string} s 
 *
 * @returns {string} 
 */
export const escapeForHTML = s => s.replace(/[&<]/g, c => c === '&' ? '&amp;' : '&lt;');