import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isActive, setActive] = useState(false);

  const toggleClass = () => {
    setActive(!isActive);
  };
  return (
    <nav className='navbar' role='navigation' aria-label='main navigation'>
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
            <div className='buttons'>
              <button className='button is-link'>
                <strong>Log out</strong>
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
