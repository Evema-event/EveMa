import React, { useState, useContext } from 'react';
import login from '../../img/login.jpg';
import { Redirect, Link } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';
import { useAlert } from 'react-alert';
import axios from 'axios';
import url from '../../server';

const Login = () => {
  const authContext = useContext(AuthContext);

  const alert = useAlert();

  const initialState = {
    username: { value: '', error: '' },
    password: { value: '', error: '' },
  };

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
      setLoading(true);
      authContext.updateUser({
        username: fields.username.value
      });

      const userData = {
        userName: fields.username.value,
        password: fields.password.value,
      };

      let loginUrl = url + 'user/login';

      axios
        .post(loginUrl, userData)
        .then((res) => {
          console.log(res);
          alert.success('You have logged in successfully');
          authContext.authentication(res);
          setLoading(false);
          setIsSubmit(true);
        })
        .catch((err) => {
          alert.error('Invalid Login Credentials');
          setLoading(false);
          console.log(err);
        });
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
            <div>
              <button
                type='submit'
                className='btn btn-primary btn-block next'
                disable={loading.toString()}
              >
                {loading ? 'Loading' : 'Login'}
              </button>
              <Link id='link' to='/forgetpassword/0'>
                <small>Forget Password?</small>
              </Link>
            </div>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Login;
