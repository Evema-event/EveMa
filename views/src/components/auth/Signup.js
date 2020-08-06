import React from 'react';
import signup from '../../img/signup.jpg';

const Signup = () => {
  return (
    <div className='bg-signup'>
      <div className='signup'>
        <img src={signup} alt='signup' className='imgLeft' />
        <form className='form-signup'>
          <h1>Sign Up</h1>
          <span className='inputs'>
            <div className='form_group'>
              <label htmlFor='username'>Username</label>
              <input
                className='form_input'
                type='text'
                name='username'
                id='username'
                placeholder='Username'
                required
              />
            </div>
            <div className='form_group'>
              <label htmlFor='email'>Email Address</label>
              <input
                className='form_input'
                type='text'
                name='email'
                placeholder='Enter your email'
                required
              />
            </div>
            <div className='form_group'>
              <label htmlFor='password'>Password</label>
              <input
                className='form_input'
                type='password'
                name='password'
                id='password'
                placeholder='Enter your Password'
                required
              />
            </div>
            <div className='form_group'>
              <label htmlFor='cpassword'>Confirm Password</label>
              <input
                className='form_input'
                type='password'
                name='password'
                id='cpassword'
                placeholder='Re-enter your Password'
                required
              />
            </div>
          </span>

          <a href='/signupnext' id='link'>
            <button type='submit' className='btn btn-primary btn-block next'>
              Next
            </button>
          </a>
        </form>
      </div>
    </div>
  );
};

export default Signup;
