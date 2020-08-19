import React, { useState, useContext, useEffect } from 'react';
import signup from '../../img/signup.jpg';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import url from '../../server';
import AuthContext from '../../context/auth/authContext';
import swal from 'sweetalert';

const Signup = () => {
  const authContext = useContext(AuthContext);

  const initialState = {
    username: { value: '', error: '' },
    password: { value: '', error: '' },
    cpassword: { value: '', error: '' },
    email: { value: '', error: '' },
    role: { value: '', error: '' },
  };

  useEffect(() => {
    setFields({
      ...fields,
      username: { value: authContext.username, error: '' },
      email: { value: authContext.email, error: '' },
      role: { value: authContext.role, error: '' },
    });
    // eslint-disable-next-line
  }, []);

  const [fields, setFields] = useState(initialState);
  const [isSubmit, setIsSubmit] = useState(false);
  const [loading, setLoading] = useState(false);

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

    setFields({
      ...fields,
    });

    if (!isError) {
      setLoading(true);
      authContext.updateUser({
        username: fields.username.value,
        password: fields.password.value,
        email: fields.email.value,
        role: fields.role.value,
      });

      let verifyUrl = url + 'user/verifyUser';
      let data = {
        userName: fields.username.value,
        emailId: fields.email.value,
      };

      axios
        .post(verifyUrl, data)
        .then((res) => {
          if (res.data.message === 'Success') {
            setIsSubmit(true);
            setLoading(false);
          }
        })
        .catch((err) => {
          swal('User or Email Address', 'already taken by a user', 'warning');
          setIsSubmit(false);
          setLoading(false);
        });
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
                data-testid='username'
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
                data-testid='email'
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
                data-testid='password'
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
                data-testid='cpassword'
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
                  value={fields.role.value}
                  name='role'
                  className='custom-select'
                  placeholder='Choose...'
                  id='role'
                  onChange={handleChange}
                >
                  <option value=''>Choose...</option>
                  <option value='Visitor'>Visitor</option>
                  <option value='Exhibitor'>Exhibitor</option>
                </select>
              </span>
            </div>
            <div>
              {loading ? (
                <button
                  id='link'
                  className='btn btn-primary btn-block next'
                  disable={loading}
                >
                  Loading
                </button>
              ) : (
                <button
                  data-testid='button'
                  type='submit'
                  className='btn btn-primary btn-block next'
                  id='link'
                >
                  Next
                </button>
              )}
            </div>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Signup;
