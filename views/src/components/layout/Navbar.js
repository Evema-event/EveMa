import React, { Fragment } from 'react';
import Logo from '../../img/Logo.png';

const Navbar = () => {
  const guestLinks = (
    <Fragment>
      <li>
        <a className='nav-link' data-target='.navbar-collapse.show' href='/'>
          Home
        </a>
      </li>
      <li className='nav-item'>
        <a
          className='nav-link'
          data-target='.navbar-collapse.show'
          href='/signup'
        >
          Sign Up
        </a>
      </li>
      <li className='nav-item'>
        <a
          className='nav-link'
          data-target='.navbar-collapse.show'
          href='/login'
        >
          Login
        </a>
      </li>
    </Fragment>
  );

  return (
    <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
      <img
        src={Logo}
        width='80'
        height='35'
        className='d-inline-block align-top'
        alt='Logo'
      ></img>
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

      <div className='collapse navbar-collapse' id='navbarSupportedContent'>
        <ul className='navbar-nav ml-auto'>{guestLinks}</ul>
      </div>
    </nav>
  );
};

export default Navbar;
