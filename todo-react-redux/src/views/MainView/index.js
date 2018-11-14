import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as TodoActions from './actions.js';
import MainSection from './index.jsx';
import {getCompletedTodoCount, getVisibleTodos} from './selector.js';
import {SHOW_ALL} from './constants/TodoFilters';

const mapStateToProps = (state, ownProps)=>  ({
	filteredTodos: getVisibleTodos(state),
	todosCount: state.todos.length,
	completedCount: getCompletedTodoCount(state),
	visibilityFilter: state.visibilityFilter,
})
const mapDispatchToProps = (dispatch) => ({
	actions: bindActionCreators(TodoActions, dispatch),
})
export default connect(
	mapStateToProps,
	mapDispatchToProps
	)(MainSection);