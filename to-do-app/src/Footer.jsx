import React from 'react';
import classNames from 'classnames';

const ALL_TODOS = 'all';
const ACTIVE_TODOS = 'active';
const COMPLETED_TODOS = 'completed';

class Footer extends React.Component{
	constructor (props){
			super(props);
			this.state = {
				
			}
		}
		
		pluralize(count, word){

		}

		render(){
              var activeTodoWord = this.pluralize(this.props.count, 'item');
			var clearButton = null;

			if (this.props.completedCount > 0) {
				clearButton = (
					<button
						className="clear-completed"
						onClick={this.props.onClearCompleted}>
						Clear completed
					</button>
				);
			}
              var nowShowing = this.props.nowShowing;

			return (
				<footer className="footer">
					<span className="todo-count">
						<strong>{this.props.count}</strong> {activeTodoWord} left
					</span>
					<ul className="filters">
						<li>
							<a
								href="#/"
								className={classNames({selected: nowShowing === ALL_TODOS})}
                            onClick={this.props.onClickShowAll}
								>
									All
							</a>
						</li>
						{' '}
						<li>
							<a
								href="#/active"
								className={classNames({selected: nowShowing === ACTIVE_TODOS})}
onClick={this.props.onClickShowActive}
								>
									Active
							</a>
						</li>
						{' '}
						<li>
							<a
								href="#/completed"
								className={classNames({selected: nowShowing === COMPLETED_TODOS})}
onClick={this.props.onClickShowCompleted}
								>
									Completed
							</a>
						</li>
					</ul>
					{clearButton}
				</footer>
			);
		}
}

export default Footer;