import React, { Fragment, useState, useEffect, useContext } from 'react';
import Logo from '../../img/Logo.png';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';

const Navbar = () => {
  const authContext = useContext(AuthContext);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      authContext.updateUser({ token: localStorage.getItem('token') });
    }
    // eslint-disable-next-line
  }, []);

  const guestLinks = (
    <Fragment>
      <li>
        <Link className='nav-link' to='/'>
          Home
        </Link>
      </li>
      {
        authContext.token ?
          <li className='nav-item'>
            <span className='nav-link' onClick={authContext.logout}>
              Logout
        </span>
          </li>
          :
          <>
            <li className='nav-item'>
              <Link className='nav-link' to='/signup/0'>
                Sign Up
        </Link>
            </li>
            <li className='nav-item'>
              <Link className='nav-link' to='/login'>
                Login
        </Link>
            </li> </>}
    </Fragment>
  );

  return (
    <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
      <Link className='nav-link' to='/'>
        <img
          src={Logo}
          width='80'
          height='35'
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
          <i className='fas fa-bars' />
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
