import React from 'react';
import signup from '../../img/signup.jpg';
import { Link } from 'react-router-dom';

const NextSignup = () => {
  return (
    <div className='bg-signup-2'>
      <div className='signup'>
        <img src={signup} alt='signup' className='imgLeft' />
        <form className='form-signup'>
          <h1>Personal Details</h1>
          <span className='inputs'>
            <div className='form_group'>
              <label htmlFor='firstname'>First Name</label>
              <input
                className='form_input'
                type='text'
                name='firstname'
                id='firstname'
                placeholder='Firstname'
                required
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
                required
              />
            </div>
            <div className='form_group'>
              <label htmlFor='address'>State</label>
              <input
                className='form_input'
                type='text'
                name='address'
                id='address'
                placeholder='State'
                required
              />
            </div>

            <div className='form_group'>
              <label htmlFor='desgnation'>Country</label>
              <input
                className='form_input'
                type='text'
                name='Desgnation'
                id='desgnation'
                placeholder='Country'
                required
              />
            </div>
            <div className='form_group' id='check'>
              <label htmlFor='cname'>City</label>
              <input
                className='form_input'
                type='text'
                name='cname'
                id='cname'
                placeholder='City'
                required
              />
            </div>
            <div className='form_group'>
              <label htmlFor='area'>Zipcode</label>
              <input
                className='form_input'
                type='text'
                name='area'
                id='area'
                placeholder='Zipcode'
                required
              />
            </div>
            <div className='form_group'>
              <label htmlFor='dob'>Date of Birth</label>
              <input
                type='date'
                name='date'
                id='dob'
                required
                className='form_input'
              />
            </div>
            <div className='form_group'>
              <label htmlFor='gender'>Gender</label>
              <span>
                <select
                  required
                  defaultValue={'DEFAULT'}
                  className='custom-select'
                  id='gender'
                >
                  <option defaultValue='DEFAULT'>Choose...</option>
                  <option defaultValue='1'>Male</option>
                  <option defaultValue='2'>Female</option>
                  <option defaultValue='3'>Others</option>
                </select>
              </span>
            </div>

            <Link to='/signup/0' id='link'>
              <button type='button' className='btn btn-primary btn-block next'>
                Back
              </button>
            </Link>
            <Link to='/signup/2' id='link'>
              <button type='button' className='btn btn-primary btn-block next'>
                Next
              </button>
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default NextSignup;
