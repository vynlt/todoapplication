	import React from 'react';

	class Item extends React.Component{
		constructor (props){
			super(props);
			this.state = {
				
			}
		}

		render = () => {
			return(
				<li>
				<div className="view">
				<input
				className="toggle"
				type="checkbox"
				checked={this.props.todo.completed}
				onChange={this.props.onToggle}
				/>
				<label >
				{this.props.todo.title}
				</label>
				<button className="destroy" onClick={this.props.onDestroy} />
				</div>
				<input
				ref="editField"
				className="edit"
				
				/>
				</li>
				);
		}

	}
	export default Item;