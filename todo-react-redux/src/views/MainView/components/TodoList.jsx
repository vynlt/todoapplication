import React from 'react';
import TodoItem from './TodoItem';

const TodoList = (props) => (
		<ul className="todo-list">
		{props.filteredTodos.map(todo =>
			<TodoItem key={todo.id} todo={todo} {...props.actions} />
			)}
		</ul>
	)
export default TodoList;