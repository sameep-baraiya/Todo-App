import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { TodoContext } from '../../context/todo/TodoProvider';

const TodoCard = ({ title, description, tasks, todoId, reRender }) => {
  const [, , , , deleteTodo, updateTodo] = useContext(TodoContext);
  const [editFlag, setEditFlag] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [todoEditFlag, setTodoEditFlag] = useState(false);

  const onEditClick = (e) => {
    setEditFlag(!editFlag);
  };

  const onEditTodoClick = (e) => {
    setTodoEditFlag(true);
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

  const onDeleteClick = async (e) => {
    try {
      await deleteTodo(todoId);
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
            {EditText(t.isDone, t.task, editFlag)}
            <div className='is-pulled-right has-text-grey is-size-7'>
              <span className='is-clickable' onClick={onEditClick}>
                Edit
              </span>{' '}
              <span className='is-clickable'>Delete</span>
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
      </div>
      <footer className='card-footer'>
        <button className='card-footer-item button is-success'>
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

const EditText = (isDone, task, editFlag) => {
  if (editFlag === false) {
    return (
      <label className='checkbox'>
        <input type='checkbox' defaultChecked={isDone} />
        {' ' + task}
      </label>
    );
  } else {
    return <input className='input' type='text' placeholder='Text input' />;
  }
};

TodoCard.prototype = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  tasks: PropTypes.array.isRequired,
};

export default TodoCard;
