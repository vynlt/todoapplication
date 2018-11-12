import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as TodoActions from '../actions.js';
import TodoTextInput from '../components/TodoTextInput';



const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(TodoActions, dispatch),
})


export default connect(null, mapDispatchToProps)(TodoTextInput);