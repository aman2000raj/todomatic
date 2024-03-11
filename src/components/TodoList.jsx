import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteTodo, toggleTodo } from '../features/todo/todoSlice';

function TodoList({ todoStatus, handleEditTodo }) {
  const todosOriginal = useSelector((state) => state.todos);

  const dispatch = useDispatch();

  /**
   *
   * @param {string} todoStatus
   * @returns {Array}
   */

  const displayTodo = (todoStatus) => {
    let filteredTodos = [...todosOriginal];
    if (todoStatus === 'Active')
      filteredTodos = todosOriginal.filter((todo) => !todo.completed);
    else if (todoStatus === 'Completed') {
      filteredTodos = todosOriginal.filter((todo) => todo.completed);
    }
    return filteredTodos;
  };
  const todos = displayTodo(todoStatus);

  return (
    <div>
      <h2 className='header'>{todosOriginal.length} tasks remaining</h2>
      {todos.map((todo) => {
        return (
          <li className='list-item' key={todo.id}>
            <input
              type='text'
              value={todo.title}
              className={`list ${todo.completed ? 'complete' : ''}`}
              onChange={(event) => event.preventDefault()}
            />
            <div>
              <button
                className='button-complete task-button'
                onClick={() => dispatch(toggleTodo(todo.id))}
              >
                <i className='fa fa-check-circle'></i>
              </button>
              <button
                className='button-edit task-button'
                onClick={() => handleEditTodo(todo)}
              >
                <i className='fa fa-edit'></i>
              </button>
              <button
                className='button-delete task-button'
                onClick={() => dispatch(deleteTodo(todo.id))}
              >
                <i className='fa fa-trash'></i>
              </button>
            </div>
          </li>
        );
      })}
    </div>
  );
}

export default TodoList;
