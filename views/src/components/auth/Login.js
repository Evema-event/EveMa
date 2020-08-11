import React, { useState } from 'react';
import login from '../../img/login.jpg';
import { Redirect } from 'react-router-dom';

const Login = () => {
  const initialState = {
    username: { value: '', error: '' },
    password: { value: '', error: '' },
    role: { value: '', error: '' },
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

    if (fields.password.value.length < 8) {
      isError = true;
      fields.password.error =
        'Password must be atleast 8 characters in length ';
    } else {
      fields.password.error = '';
    }

    //console.log(fields);

    setFields({
      ...fields,
    });

    if (!isError) {
      setIsSubmit(true);
    }
  };

  return (
    <div className='bg-login'>
      {isSubmit && <Redirect to='/' />}
      <div className='login'>
        <img src={login} alt='login' className='imgLogin' />
        <form className='form-login' onSubmit={handleSubmit}>
          <h1>Login</h1>
          <span className='inputs-login'>
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
                  <option value='Visitor'>
                    Visitor
                  </option>
                  <option value='Exhibitor'>
                    Exhibitor
                  </option>
                </select>
              </span>
            </div>
            <div>
              <button type='submit' className='btn btn-primary btn-block next'>
                Login
              </button>
              <small>Forget Password?</small>
            </div>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Login;
