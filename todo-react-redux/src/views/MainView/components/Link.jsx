import React from 'react';
import classnames from 'classnames';

const Link = (props) =>(
   <a
      className={classnames({ selected: props.filter === props.visibilityFilter ? true : false })}
      style={{ cursor: 'pointer' }}
      onClick={() => props.actions.setVisibilityFilter(props.filter)}
    >
      {props.children}
    </a>
  )
  export default Link;