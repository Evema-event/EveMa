import React, { useState } from 'react';
import signup from '../../img/signup.jpg';
import { Redirect } from 'react-router-dom';

const Signup = () => {
  const initialState = {
    username: { value: '', error: '' },
    password: { value: '', error: '' },
    cpassword: { value: '', error: '' },
    email: { value: '', error: '' },
  };

  const [fields, setFields] = useState(initialState);
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    const updatedField = {
      ...fields[name],
    };

    updatedField.value = value;

    setFields({
      ...fields,
      [name]: updatedField,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let isError = false;
    if (fields.username.value.length < 5) {
      isError = true;
      fields.username.error = 'Username must be atleast 5 characters in length';
    } else {
      fields.username.error = '';
    }

    if (fields.email.value.length < 5) {
      isError = true;
      fields.email.error = 'Email is Invalid';
    } else {
      fields.email.error = '';
    }

    if (fields.password.value.length < 8) {
      isError = true;
      fields.password.error =
        'Password must be atleast 8 characters in length ';
    } else {
      fields.password.error = '';
    }

    if (fields.cpassword.value !== fields.password.value) {
      isError = true;
      fields.cpassword.error = 'Passwords do not match ';
    } else {
      fields.cpassword.error = '';
    }

    console.log(fields);

    setFields({
      ...fields,
    });

    if (!isError) {
      setIsSubmit(true);
    }
  };

  return (
    <div className='bg-signup'>
      {isSubmit && <Redirect to='/signup/1' />}
      <div className='signup'>
        <img src={signup} alt='signup' className='imgLeft' />
        <form className='form-signup' onSubmit={handleSubmit}>
          <h1>Sign Up</h1>
          <span className='inputs'>
            <div className='form_group'>
              <label htmlFor='username'>Username</label>
              <input
                className='form_input'
                type='text'
                name='username'
                id='username'
                value={fields.username.value}
                placeholder='Username'
                required
                onChange={handleChange}
              />
              <h6>{fields.username.error}</h6>
            </div>
            <div className='form_group'>
              <label htmlFor='email'>Email Address</label>
              <input
                className='form_input'
                type='email'
                name='email'
                value={fields.email.value}
                placeholder='Enter your email'
                onChange={handleChange}
                required
              />
              <h6>{fields.email.error}</h6>
            </div>
            <div className='form_group'>
              <label htmlFor='password'>Password</label>
              <input
                className='form_input'
                type='password'
                name='password'
                id='password'
                minLength='8'
                value={fields.password.value}
                placeholder='Enter your Password'
                onChange={handleChange}
                required
              />
              <h6>{fields.password.error}</h6>
            </div>
            <div className='form_group'>
              <label htmlFor='cpassword'>Confirm Password</label>
              <input
                className='form_input'
                type='password'
                name='cpassword'
                id='cpassword'
                minLength='8'
                value={fields.cpassword.value}
                placeholder='Re-enter your Password'
                onChange={handleChange}
                required
              />
              <h6>{fields.cpassword.error}</h6>
            </div>
            <div className='form_group'>
              <label htmlFor='role'>Role</label>
              <span>
                <select
                  required
                  defaultValue={'Default'}
                  name='section'
                  className='custom-select'
                  placeholder='Choose...'
                  id='role'
                >
                  <option value=''>Choose...</option>
                  <option onChange={handleChange} defaultValue='1'>
                    Visitor
                  </option>
                  <option onChange={handleChange} defaultValue='2'>
                    Exhibitor
                  </option>
                </select>
              </span>
            </div>
            <div>
              <button type='submit' className='btn btn-primary btn-block next'>
                Next
              </button>
            </div>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Signup;
