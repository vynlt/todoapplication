import React from 'react';
import Link from './Link';
import { SHOW_ALL, SHOW_COMPLETED, SHOW_ACTIVE } from '../constants/TodoFilters';
 
 const FILTER_TITLES = {
  [SHOW_ALL]: 'All',
  [SHOW_ACTIVE]: 'Active',
  [SHOW_COMPLETED]: 'Completed'
}

const Footer = (props) => {
  const { activeCount, completedCount, onClearCompleted } = props;
  const itemWord = activeCount === 1 ? 'item' : 'items';
  return (
    <footer className="footer">
      <span className="todo-count">
        <strong>{activeCount || 'No'}</strong> {itemWord} left
      </span>
      <ul className="filters">
        {Object.keys(FILTER_TITLES).map(filter =>
          <li key={filter}>
            <Link filter={filter} 
            setFilter={props.setFilter}
             actions={props.actions} 
             visibilityFilter={props.visibilityFilter} >
              {FILTER_TITLES[filter]}
            </Link>
          </li>
        )}
      </ul>
      {
        !!completedCount &&
        <button
          className="clear-completed"
          onClick={onClearCompleted}
        >Clear completed</button>
      }
    </footer>
  )
}
export default Footer;