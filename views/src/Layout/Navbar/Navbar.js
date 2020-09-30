import React, { Fragment, useEffect, useContext, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';

import Logo from '../../img/Logo.png';
import './navbar.css';

import AuthContext from '../../context/auth/authContext';
import EventContext from '../../context/event/eventContext';

const Navbar = () => {
  const authContext = useContext(AuthContext);
  const eventContext = useContext(EventContext);

  useEffect(() => {
    let token = localStorage.getItem('token');
    if (token) {
      authContext.updateUser({ token: token });
      authContext.getProfile();
    }
    // eslint-disable-next-line
  }, [eventContext.upcomingEvents]);

  const [redirect, setRedirect] = useState(false);

  const logout = () => {
    setRedirect(true);
    authContext.logout();
  };

  const guestLinks = (
    <Fragment>
      {localStorage.getItem('token') &&
        localStorage.getItem('role') === 'Organizer' ? (
          <li data-toggle='collapse' data-target='#navbarSupportedContent'>
            <Link className={'nav-link'} to='/admin'>
              Admin
          </Link>
          </li>
        ) : (
          <li data-toggle='collapse' data-target='#navbarSupportedContent'>
            <Link className='nav-link' to='/'>
              Home
          </Link>
          </li>
        )}
      <li data-toggle='collapse' data-target='#navbarSupportedContent'>
        <Link className='nav-link' to='/eventList'>
          Events
        </Link>
      </li>
      {authContext.token ? (
        <>
          {authContext.role !== 'Organizer' && (
            <li className='nav-item' data-toggle='collapse' data-target='#navbarSupportedContent'>
              <Link to='/profile' className='nav-link'>
                Profile
              </Link>
            </li>
          )}
          <li className='nav-item' data-toggle='collapse' data-target='#navbarSupportedContent'>
            <span
              style={{ cursor: 'pointer' }}
              className='nav-link'
              onClick={logout}
            >
              Logout
            </span>
          </li>
        </>
      ) : (
          <>
            {redirect && <Redirect to='/' />}
            <li className='nav-item' data-toggle='collapse' data-target='#navbarSupportedContent'>
              <Link className='nav-link' to='/signup/0'>
                Sign Up
            </Link>
            </li>
            <li className='nav-item' data-toggle='collapse' data-target='#navbarSupportedContent'>
              <Link className='nav-link' to='/login'>
                Log In
            </Link>
            </li>{' '}
          </>
        )}
    </Fragment>
  );

  return (
    <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
      <Link className='nav-link' to='/'>
        <img
          src={Logo}
          width='100'
          height='39'
          className='d-inline-block align-top'
          alt='Logo'
        ></img>
      </Link>
      <button
        className='navbar-toggler'
        type='button'
        data-toggle='collapse'
        data-target='#navbarSupportedContent'
        aria-controls='navbarSupportedContent'
        aria-expanded='false'
        aria-label='Toggle navigation'
      >
        <span>
          <i className='fa fa-bars' />
        </span>
      </button>

      <div
        className='collapse navbar-collapse'
        data-target='.navbar-collapse.show'
        id='navbarSupportedContent'
      >
        <ul className='navbar-nav ml-auto'>{guestLinks}</ul>
      </div>
    </nav>
  );
};

export default Navbar;
