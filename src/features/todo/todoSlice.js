import { createSlice, nanoid } from '@reduxjs/toolkit';

const localValue =
  localStorage.getItem('ITEMS') != null
    ? JSON.parse(localStorage.getItem('ITEMS'))
    : [];
const initialState = {
  todos: localValue,
};

export const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, action) => {
      state.todos.push({
        id: nanoid(),
        title: action.payload,
        completed: false,
      });
    },
    deleteTodo: (state, action) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
    toggleTodo: (state, action) => {
      state.todos = state.todos.map((todo) => {
        if (todo.id === action.payload) {
          return {
            ...todo,
            completed: !todo.completed,
          };
        } else {
          return todo;
        }
      });
    },
    changeTodo: (state, action) => {
      state.todos = state.todos.map((todo) => {
        if (todo.id === action.payload.id) {
          return {
            ...todo,
            title: action.payload.title,
            completed: action.payload.completed,
          };
        } else {
          return todo;
        }
      });
    },
  },
});

export const { addTodo, deleteTodo, toggleTodo, changeTodo } =
  todoSlice.actions;

export default todoSlice.reducer;
