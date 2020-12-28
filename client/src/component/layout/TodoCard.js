import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { TodoContext } from '../../context/todo/TodoProvider';

const TodoCard = ({ title, description, tasks, todoId, reRender }) => {
  const [
    ,
    ,
    ,
    ,
    deleteTodo,
    updateTodo,
    addTask,
    deleteTask,
    updateTask,
  ] = useContext(TodoContext);
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [todoEditFlag, setTodoEditFlag] = useState(false);
  const [addTaskFlag, setAddTaskFlag] = useState(false);
  const [newTask, setNewTask] = useState('');

  const onEditTodoClick = (e) => {
    setTodoEditFlag(true);
  };

  const onAddTaskClick = (e) => {
    setAddTaskFlag(true);
  };

  const onDeleteTaskClick = async (e) => {
    try {
      await deleteTask(e.target.getAttribute('data-key'));
      reRender();
    } catch (err) {
      console.log(err);
    }
  };

  const onEditTodoDoneClick = async (e) => {
    if (newTitle !== '' && newDescription !== '') {
      try {
        await updateTodo(newTitle, newDescription, todoId);
        setNewTitle('');
        setNewDescription('');
        reRender();
      } catch (err) {
        console.log(err);
      }
    }
    setTodoEditFlag(false);
  };

  const onAddTodoDoneClick = async (e) => {
    if (newTask !== '') {
      try {
        await addTask(newTask, todoId);
        setNewTask('');
        reRender();
      } catch (err) {
        console.log(err);
      }
    }
    setAddTaskFlag(false);
  };

  const onDeleteClick = async (e) => {
    try {
      await deleteTodo(todoId);
      reRender();
    } catch (err) {
      console.log(err);
    }
  };

  const changeIsDone = async (e) => {
    try {
      await updateTask(
        e.target.getAttribute('data-key'),
        !e.target.getAttribute('checked')
      );
      reRender();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className='card'>
      <div className='card-content'>
        <p className='is-size-4'>
          <strong>{title}</strong>
        </p>
        <p className='is-size-6'>{description}</p>
        {tasks.map((t) => (
          <div id={t.id} key={t.id}>
            {EditText(t.isDone, t.task, changeIsDone, t.id)}
            <div className='is-pulled-right has-text-grey is-size-7'>
              <span
                className='is-clickable'
                onClick={onDeleteTaskClick}
                data-key={t.id}
              >
                Delete
              </span>
            </div>
          </div>
        ))}
        {todoEditFlag ? (
          <div>
            <div>
              <input
                className='input'
                type='text'
                placeholder='Title'
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
              />
            </div>
            <div>
              <input
                className='input'
                type='text'
                placeholder='Description'
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
              />
            </div>
            <div>
              <button
                className='button is-link is-fullwidth'
                onClick={onEditTodoDoneClick}
              >
                Done
              </button>
            </div>
          </div>
        ) : null}
        {addTaskFlag ? (
          <div>
            <div>
              <input
                className='input'
                type='text'
                placeholder='Task'
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
              />
            </div>
            <div>
              <button
                className='button is-link is-fullwidth'
                onClick={onAddTodoDoneClick}
              >
                Done
              </button>
            </div>
          </div>
        ) : null}
      </div>
      <footer className='card-footer'>
        <button
          className='card-footer-item button is-success'
          onClick={onAddTaskClick}
        >
          <strong>Add Task</strong>
        </button>
        <button
          className='card-footer-item button is-warning'
          onClick={onEditTodoClick}
        >
          <strong>Edit Todo</strong>
        </button>
        <button
          className='card-footer-item button is-danger'
          onClick={onDeleteClick}
        >
          <strong>Delete Todo</strong>
        </button>
      </footer>
    </div>
  );
};

const EditText = (isDone, task, changeIsDone, key) => {
  return (
    <label className='checkbox'>
      <input
        type='checkbox'
        checked={isDone}
        onChange={changeIsDone}
        data-key={key}
      />
      {' ' + task}
    </label>
  );
};

TodoCard.prototype = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  tasks: PropTypes.array.isRequired,
};

export default TodoCard;
