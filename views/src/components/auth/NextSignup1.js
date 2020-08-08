import React from 'react';
import signup from '../../img/signup.jpg';
import { Link } from 'react-router-dom';

const NextSignup1 = () => {
  return (
    <div className='bg-signup-2'>
      <div className='signup'>
        <img src={signup} alt='signup' className='imgLeft' />
        <form className='form-signup'>
          <h1>Professional Details</h1>
          <span className='inputs'>
            <div className='form_group'>
              <label htmlFor='designation'>Designation</label>
              <input
                className='form_input'
                type='text'
                name='designation'
                id='designation'
                placeholder='Designation'
                required
              />
            </div>
            <div className='form_group'>
              <label htmlFor='area'>Areas of Interest</label>
              <input
                className='form_input'
                type='text'
                name='area'
                id='area'
                placeholder='Areas of Interest'
                required
              />
            </div>
            <div className='form_group'>
              <label htmlFor='company'>Company/Institution Name</label>
              <input
                className='form_input'
                type='text'
                name='company'
                id='company'
                placeholder='Name'
                required
              />
            </div>

            <div className='form_group text-area'>
              <label htmlFor='contact'>Contact</label>
              <input
                className='form_input '
                type='text'
                name='contact'
                id='contact'
                placeholder='Contact'
                required
              />
            </div>
          </span>
          <div className='form_group'>
            <label htmlFor='text-area'>Address</label>
            <textarea
              className='form_text'
              name='address'
              id='text-area'
              cols='10'
              rows='5'
              placeholder='Enter Your Address'
            />
          </div>
          <span className='inputs'>
            <Link to='/signup/1' id='link'>
              <button type='button' className='btn btn-primary btn-block next'>
                Back
              </button>
            </Link>
            <Link to='/' id='link'>
              <button type='submit' className='btn btn-primary btn-block next'>
                Submit
              </button>
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default NextSignup1;
