import React from 'react';
import { useHistory } from 'react-router-dom';

const Home = () => {
  const history = useHistory();

  const goRegister = () => {
    history.push('/register');
  };
  const goLogin = () => {
    history.push('/login');
  };
  return (
    <div className='hero is-info is-fullheight-with-navbar'>
      <div className='column is-half'>
        <section className='section'>
          <div className='container'>
            <h1 className='title'>Welcome to Todo app</h1>
            <h2 className='subtitle'>
              A simple application that allows to manage a list of{' '}
              <strong>tasks</strong> to do.
            </h2>
            <br />
            <div className='columns'>
              <div className='column'>
                <div className='is-size-5 mb-1'>New user ? Create account.</div>
                <div className='buttons'>
                  <button className='button is-warning' onClick={goRegister}>
                    <strong>Create New Account</strong>
                  </button>
                </div>
              </div>
              <div className='column'>
                <div className='is-size-5 mb-1'>
                  Login to your existing account.
                </div>
                <div className='buttons'>
                  <button className='button is-warning' onClick={goLogin}>
                    <strong>LogIn</strong>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
