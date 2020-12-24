import React, { useState, useContext } from 'react';
import Alert from '../layout/Alert';
import { AuthContext } from '../../context/auth/AuthProvider';
import { useHistory } from 'react-router-dom';

const Login = () => {
  const history = useHistory();
  const [, setAuthObj, , login] = useContext(AuthContext);
  const [user, setUser] = useState({
    email: '',
    password: '',
    errorMsg: '',
  });

  const { email, password, errorMsg } = user;

  const goTodos = () => {
    history.push('/todos');
  };

  const onChange = (e) => {
    setUser({ ...user, errorMsg: '', [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (email === '' || password === '') {
      setUser({ ...user, errorMsg: 'Please fill all fields' });
    } else {
      setUser({
        ...user,
        errorMsg: '',
      });
      try {
        const res = await login(email, password);
        if (res != null) {
          if (res.success === true) {
            console.log('Login');
            setAuthObj({
              isAuthenticated: true,
              token: res.token,
              username: email,
            });
            goTodos();
          } else {
            console.log('Login Error');
            setUser({
              ...user,
              errorMsg: res.error,
            });
          }
        }
      } catch (err) {
        console.log(err.response.data);
        setUser({
          ...user,
          errorMsg: err.response.data.error,
        });
      }
    }
  };
  return (
    <div className='hero is-white is-fullheight-with-navbar'>
      <div className='column is-half'>
        <section className='section'>
          <div className='container'>
            <h1 className='title'>Login to an existing account</h1>
            <h2 className='subtitle'>
              Enter required information for <strong>login</strong>.
            </h2>
          </div>
          <br />
          <form onSubmit={onSubmit}>
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

export default Login;
