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
              <label htmlFor='firstname'>First Name</label>
              <input
                className='form_input'
                type='text'
                name='firstname'
                id='firstname'
                placeholder='Firstname'
              />
            </div>
            <div className='form_group'>
              <label htmlFor='lastname'>Last Name</label>
              <input
                className='form_input'
                type='text'
                name='lastname'
                id='lastname'
                placeholder='Lastname'
              />
            </div>
            <div className='form_group'>
              <label htmlFor='username'>Username</label>
              <input
                className='form_input'
                type='text'
                name='username'
                id='username'
                placeholder='Username'
              />
            </div>
            <div className='form_group'>
              <label htmlFor='email'>Email Address</label>
              <input
                className='form_input'
                type='text'
                name='email'
                placeholder='Enter your email'
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
              />
            </div>
            <div className='form_group'>
              <label htmlFor='dob'>Date of Birth</label>
              <input type='date' name='date' id='dob' className='form_input' />
            </div>
            <div className='form_group'>
              <label htmlFor='gender'>Gender</label>
              <span className=''>
                <input type='radio' id='gender' name='gender' />
                Male
                <input type='radio' id='gender' name='gender' />
                Female
                <input type='radio' id='gender' name='gender' />
                Others
              </span>
            </div>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Signup;
