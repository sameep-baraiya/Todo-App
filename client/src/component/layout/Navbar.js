import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/auth/AuthProvider';
import axios from 'axios';

const Navbar = () => {
  const [authObj, ,] = useContext(AuthContext);

  const [isActive, setActive] = useState(false);

  const toggleClass = () => {
    setActive(!isActive);
  };
  return (
    <nav
      className='navbar is-link'
      role='navigation'
      aria-label='main navigation'
    >
      <div className='navbar-brand'>
        <a className='navbar-item' href='/#'>
          <span className='is-size-4 has-text-weight-bold'>
            TodoApp<small className='is-size-6'>.com</small>
          </span>
        </a>

        <span
          role='button'
          className={isActive ? 'navbar-burger is-active' : 'navbar-burger'}
          aria-label='menu'
          aria-expanded='false'
          data-target='navbar'
          onClick={toggleClass}
        >
          <span aria-hidden='true'></span>
          <span aria-hidden='true'></span>
          <span aria-hidden='true'></span>
        </span>
      </div>

      <div
        id='navbar'
        className={isActive ? 'navbar-menu is-active' : 'navbar-menu'}
      >
        <div className='navbar-start'>
          <Link to='/' className='navbar-item'>
            Home
          </Link>
          <Link to='/about' className='navbar-item'>
            About
          </Link>
        </div>

        <div className='navbar-end'>
          <div className='navbar-item'>
            {authObj.isAuthenticated
              ? NavbarUser(true, authObj.username)
              : NavbarUser(false)}
          </div>
        </div>
      </div>
    </nav>
  );
};

const NavbarUser = (flag, username = '') => {
  const [, setAuthObj] = useContext(AuthContext);
  const logout = async () => {
    try {
      const res = await axios.get('/api/v1/auth/logout');
      if (res.data !== null) {
        setAuthObj({
          isAuthenticated: false,
          token: null,
          username: '',
        });
      }
    } catch (err) {
      console.log(err);
    }
  };
  if (flag) {
    return (
      <div className='buttons'>
        <button className='button is-warning' onClick={logout}>
          <strong>Log Out {username}</strong>
        </button>
      </div>
    );
  } else {
    return <div></div>;
  }
};

export default Navbar;
