import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addTodo, changeTodo } from '../features/todo/todoSlice';

function Form({ editTodo, setEditTodo }) {
  const [input, setInput] = useState('');
  const dispatch = useDispatch();

  /**
   * Updates the todo with the given title
   * @param {string} title - new title of the todo
   * @param {number} id - id of the todo
   * @param {boolean} completed - completion status of the todo
   */
  function updateTodo(title, id, completed) {
    dispatch(changeTodo({ id, title, completed }));
    setEditTodo(null);
  }

  useEffect(() => {
    if (editTodo) {
      setInput(editTodo.title);
    } else {
      setInput('');
    }
  }, [setInput, editTodo]);

  /**
   * Submits the form by adding a new todo or updating an existing one
   * @param {Event} e - submit event
   */

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input === '') return;
    if (!editTodo) {
      dispatch(addTodo(input));
      setInput('');
    } else {
      updateTodo(input, editTodo.id, editTodo.completed);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder='Add a new task'
          className='task-input'
        />
        <button className='button-add' type='submit'>
          {editTodo ? 'OK' : 'Add'}
        </button>
      </form>
    </div>
  );
}

export default Form;
