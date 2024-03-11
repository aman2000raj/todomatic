import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import Form from './components/Form';
import TodoList from './components/TodoList';
import { useSelector } from 'react-redux';

function App() {
  const todos = useSelector((state) => state.todos);

  const [editTodo, setEditTodo] = useState(null);
  const [todoStatus, setTodostatus] = useState('All');

  useEffect(() => {
    localStorage.setItem('ITEMS', JSON.stringify(todos));
  }, [todos]);

  /**
   * @function handleEditTodo
   * @param {object} todo - The todo object to be edited
   * @description Sets the editTodo state to the given todo object
   */
  function handleEditTodo({ id }) {
    const findTodo = todos.find((todo) => todo.id === id);

    setEditTodo(findTodo);
  }

  /**
   * @function toggleDisplay
   * @param {string} taskStatus - The status of the todos to be displayed
   * @description Sets the todoStatus state to the given task status
   */
  function toggleDisplay(taskStatus) {
    setTodostatus(taskStatus);
  }

  return (
    <div className='container'>
      <div className='app-wrapper'>
        <div>
          <Header />
        </div>
        <div>
          <Form editTodo={editTodo} setEditTodo={setEditTodo} />
        </div>
        <div className='form-row'>
          <button className='button-row' onClick={() => toggleDisplay('All')}>
            All Task
          </button>
          <button
            className='button-row'
            onClick={() => toggleDisplay('Active')}
          >
            Active Task
          </button>
          <button
            className='button-row'
            onClick={() => toggleDisplay('Completed')}
          >
            Completed Task
          </button>
        </div>
        <div>
          <TodoList todoStatus={todoStatus} handleEditTodo={handleEditTodo} />
        </div>
      </div>
    </div>
  );
}

export default App;

