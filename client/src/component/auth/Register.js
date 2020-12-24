import React, { useState, useContext } from 'react';
import Alert from '../layout/Alert';
import { AuthContext } from '../../context/auth/AuthProvider';
import { useHistory } from 'react-router-dom';

const Register = () => {
  const history = useHistory();
  const [, setAuthObj, register] = useContext(AuthContext);
  const [user, setUser] = useState({
    username: '',
    email: '',
    password: '',
    password2: '',
    errorMsg: '',
  });

  const { username, email, password, password2, errorMsg } = user;

  const goTodos = () => {
    history.push('/todos');
  };

  const onChange = (e) => {
    setUser({ ...user, errorMsg: '', [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (username === '' || email === '' || password === '') {
      setUser({ ...user, errorMsg: 'Please fill all fields' });
    } else if (password !== password2) {
      setUser({
        ...user,
        errorMsg: 'Password and Confirm Password does not match',
      });
    } else {
      setUser({
        ...user,
        errorMsg: '',
      });
      try {
        const res = await register(username, email, password);
        if (res != null) {
          if (res.success === true) {
            console.log('Register');
            setAuthObj({
              isAuthenticated: true,
              token: res.token,
              username: username,
            });
            localStorage.setItem('todoapp-token', res.token);
            localStorage.setItem('todoapp-username', username);
            goTodos();
          } else {
            console.log('Register Error');
            setUser({
              ...user,
              errorMsg: res.error,
            });
          }
        }
      } catch (err) {
        console.log(err.response.data);
        if (err.response.data.flag === 'duplicate-field') {
          setUser({
            ...user,
            errorMsg: 'Email id already in use',
          });
        } else {
          setUser({
            ...user,
            errorMsg: err.response.data.error,
          });
        }
      }
    }
  };
  return (
    <div className='hero is-white is-fullheight-with-navbar'>
      <div className='column is-half'>
        <section className='section'>
          <div className='container'>
            <h1 className='title'>Create New Account</h1>
            <h2 className='subtitle'>
              Enter required information to <strong>create</strong> account.
            </h2>
          </div>
          <br />
          <form onSubmit={onSubmit}>
            <div className='field'>
              <label className='label'>Username</label>
              <div className='control'>
                <input
                  id='username'
                  name='username'
                  className='input'
                  type='text'
                  placeholder='Enter username'
                  required
                  minLength='3'
                  maxLength='16'
                  pattern='^[a-zA-Z0-9]+$'
                  onChange={onChange}
                />
              </div>
              <p className='help is-link'>
                Username must be alphanumeric or alphabetic
              </p>
            </div>
            <div className='field'>
              <label className='label'>Email</label>
              <div className='control'>
                <input
                  id='email'
                  name='email'
                  className='input'
                  type='email'
                  placeholder='Enter email'
                  required
                  onChange={onChange}
                />
              </div>
            </div>
            <div className='field'>
              <label className='label'>Password</label>
              <div className='control'>
                <input
                  id='password'
                  name='password'
                  className='input'
                  type='password'
                  placeholder='Enter password'
                  required
                  minLength='6'
                  maxLength='16'
                  pattern='^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$'
                  onChange={onChange}
                />
              </div>
              <p className='help is-link'>
                Password must be alphanumeric and contain special
                character(!@#$%^&*)
              </p>
            </div>
            <div className='field'>
              <label className='label'>Confirm Password</label>
              <div className='control'>
                <input
                  id='password2'
                  name='password2'
                  className='input'
                  type='password'
                  placeholder='Enter confirm password'
                  required
                  minLength='6'
                  maxLength='16'
                  pattern='^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$'
                  onChange={onChange}
                />
              </div>
            </div>
            <div className='field is-grouped'>
              <div className='control'>
                <input
                  type='submit'
                  className='button is-link'
                  value='Submit'
                />
              </div>
              <div className='control'>
                <input
                  type='reset'
                  className='button is-link is-light'
                  value='Reset'
                />
              </div>
            </div>
          </form>
          <br />
          <Alert msg={errorMsg} />
        </section>
      </div>
    </div>
  );
};

export default Register;
