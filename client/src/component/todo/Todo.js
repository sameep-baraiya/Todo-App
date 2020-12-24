import React, { useState, useEffect, useContext } from 'react';
import Alert from '../layout/Alert';
import { TodoContext } from '../../context/todo/TodoProvider';
import TodoCard from '../layout/TodoCard';

const Todo = () => {
  const [todoObject, , getTodos, addTodo] = useContext(TodoContext);
  const [changeFlag, setChangeFlag] = useState(false);
  const [errorMsg] = useState('');
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');

  const reRender = () => {
    setChangeFlag(!changeFlag);
  };

  const onAddNewTodo = async (e) => {
    if (newTitle !== '' && newDescription !== '') {
      try {
        await addTodo(newTitle, newDescription);
        setNewTitle('');
        setNewDescription('');
        setChangeFlag(!changeFlag);
      } catch (err) {
        console.log(err);
      }
    }
  };

  useEffect(() => {
    const test = async () => {
      try {
        await getTodos();
      } catch (err) {
        console.log(err);
      }
    };
    test();
    // eslint-disable-next-line
  }, [changeFlag]);
  return (
    <div className='hero is-light is-fullheight-with-navbar'>
      <div className='box'>
        <div className='columns'>
          <div className='column is-4'>
            <div className='field'>
              <div className='control'>
                <input
                  className='input'
                  type='text'
                  placeholder='Title'
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className='column is-6'>
            <div className='field'>
              <div className='control'>
                <input
                  className='input'
                  type='text'
                  placeholder='Description'
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className='column is-2'>
            <button
              className='button is-success is-outlined is-fullwidth'
              onClick={onAddNewTodo}
            >
              Add Todo
            </button>
          </div>
        </div>
      </div>
      <div className='custom-flex-row-container'>
        {todoObject.todos != null
          ? todoObject.todos.data.map((t) => (
              <div className='column custom-flex-row-item m-1' key={t.id}>
                <TodoCard
                  title={t.title}
                  description={t.description}
                  tasks={t.tasks}
                  todoId={t.id}
                  reRender={reRender}
                />
              </div>
            ))
          : null}
      </div>
      <br />
      <Alert msg={errorMsg} />
      {/* <div className='modal is-active'>
        <div className='modal-background'></div>
        <div className='modal-card'>
          <header className='modal-card-head'>
            <p className='modal-card-title'>{modelTitle}</p>
            <button className='delete' aria-label='close'></button>
          </header>
          <section className='modal-card-body'>{modelData}</section>
          <footer className='modal-card-foot'>
            <button className='button is-success'>Save changes</button>
            <button className='button'>Cancel</button>
          </footer>
        </div>
      </div> */}
    </div>
  );
};

export default Todo;
