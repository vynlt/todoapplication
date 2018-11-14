import React from 'react';
import Footer from './components/Footer';
import Header from './components/Header';
import TodoList from './components/TodoList';
import 'bootstrap/dist/css/bootstrap.css';
import './css/index.css';
import './css/base.css';

const MainSection = ({filteredTodos, todosCount, completedCount, visibilityFilter, actions, model, }) => 
  (
    <div>
      <Header addTodo={actions.addTodo} />
      <section className="main">
        {
          !!todosCount && 
          <span>
            <input
            className="toggle-all"
            type="checkbox"
            checked={completedCount === todosCount}
            readOnly
            />
            <label onClick={actions.completeAllTodos}/>
          </span>
        }
      <TodoList actions={actions} filteredTodos={filteredTodos} />
        {
          !!todosCount &&
          <Footer
          completedCount={completedCount}
          activeCount={todosCount - completedCount}
          onClearCompleted={actions.clearCompleted}
          actions={actions}
          visibilityFilter={visibilityFilter}
          />
        }
      </section>
    </div>
  )

export default MainSection;