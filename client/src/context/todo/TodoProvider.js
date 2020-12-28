import React, { createContext, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/auth/AuthProvider';

export const TodoContext = createContext();

export const TodoProvider = (props) => {
  const [authObj, ,] = useContext(AuthContext);
  const [todoObject, setTodoObject] = useState({
    todos: null,
  });

  const { isAuthenticated, token } = authObj;
  const getTodos = async () => {
    if (isAuthenticated) {
      axios.defaults.headers.common['x-auth-token'] = token;
      try {
        const res = await axios.get('/api/v1/todos');
        if (res !== null) {
          console.log(res.data);
          setTodoObject({ todos: res.data });
        }
      } catch (err) {
        throw err;
      }
    }
  };

  const addTodo = async (title, description) => {
    if (isAuthenticated) {
      axios.defaults.headers.common['x-auth-token'] = token;
      try {
        const res = await axios.post('/api/v1/todos', {
          title,
          description,
        });
        if (res !== null) {
          console.log(res.data);
        }
      } catch (err) {
        throw err;
      }
    }
  };

  const deleteTodo = async (todoId) => {
    if (isAuthenticated) {
      axios.defaults.headers.common['x-auth-token'] = token;
      try {
        const res = await axios.delete(`/api/v1/todos/${todoId}`);
        if (res !== null) {
          console.log(res.data);
        }
      } catch (err) {
        throw err;
      }
    }
  };

  const updateTodo = async (newTitle, newDescription, todoId) => {
    if (isAuthenticated) {
      axios.defaults.headers.common['x-auth-token'] = token;
      try {
        const res = await axios.put(`/api/v1/todos/${todoId}`, {
          title: newTitle,
          description: newDescription,
        });
        if (res !== null) {
          console.log(res.data);
        }
      } catch (err) {
        throw err;
      }
    }
  };

  const addTask = async (newTask, todoId) => {
    if (isAuthenticated) {
      axios.defaults.headers.common['x-auth-token'] = token;
      try {
        const res = await axios.post(`/api/v1/todos/${todoId}`, {
          task: newTask,
        });
        if (res !== null) {
          console.log(res.data);
        }
      } catch (err) {
        throw err;
      }
    }
  };

  const deleteTask = async (taskId) => {
    if (isAuthenticated) {
      axios.defaults.headers.common['x-auth-token'] = token;
      try {
        const res = await axios.delete(`/api/v1/todos/todoaction/${taskId}`);
        if (res !== null) {
          console.log(res.data);
        }
      } catch (err) {
        throw err;
      }
    }
  };

  return (
    <TodoContext.Provider
      value={[
        todoObject,
        setTodoObject,
        getTodos,
        addTodo,
        deleteTodo,
        updateTodo,
        addTask,
        deleteTask,
      ]}
    >
      {props.children}
    </TodoContext.Provider>
  );
};
