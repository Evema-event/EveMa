import React, { useState, useContext } from 'react';
import { Redirect, Link } from 'react-router-dom';
import swal from 'sweetalert';

import login from '../../../img/login.jpg';
import classes from './login.module.css';

import axios from 'axios';
import url from '../../../server';

import AuthContext from '../../../context/auth/authContext';

const Login = () => {
  const authContext = useContext(AuthContext);

  const initialState = {
    username: { value: '', error: '' },
    password: { value: '', error: '' },
    link: '/',
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

    setFields({
      ...fields,
    });

    if (!isError) {
      setLoading(true);
      authContext.updateUser({
        username: fields.username.value,
      });

      const userData = {
        userName: fields.username.value,
        password: fields.password.value,
      };

      let loginUrl = url + 'user/login';

      axios
        .post(loginUrl, userData)
        .then((res) => {
          let role
          if (res.data.user.role.length === 1) {
            role = res.data.user.role[0];
          } else {
            role = 'Exhibitor';
          }
          localStorage.setItem('role', role)
          if (res.data.user.role[0] === 'Organizer') {
            setFields({
              ...fields,
              link: '/admin',
            });
            swal('Congrats', 'You logged in admin!', 'success');
          } else {
            swal('Congrats', 'You logged in successfully!', 'success');
          }

          authContext.authentication(res);
          setLoading(false);
          setIsSubmit(true);
        })
        .catch((err) => {
          swal('Something Wrong', 'Invalid Login Credentials', 'error');
          setLoading(false);
        });
    }
  };

  return (
    <div className={classes['bg-login']}>
      {localStorage.getItem('token') && <Redirect to='/' />}
      {localStorage.getItem('token') &&
        localStorage.getItem('role') === 'Organizer' && (
          <Redirect to='/admin' />
        )}
      {isSubmit && <Redirect to={fields.link} />}
      <div className={classes['login']}>
        <img src={login} alt='login' className={classes['imgLogin']} />
        <form className={classes['form-login']} onSubmit={handleSubmit}>
          <h1>Login</h1>
          <span className={classes['inputs-login']}>
            <div className={classes['form_group']}>
              <label htmlFor='username'>Username</label>
              <input
                className={classes['form_input']}
                type='text'
                name='username'
                id='username'
                value={fields.username.value}
                placeholder='Username or Email'
                required
                onChange={handleChange}
              />
              <h6>{fields.username.error}</h6>
            </div>
            <div className={classes['form_group']}>
              <label htmlFor='password'>Password</label>
              <input
                className={classes['form_input']}
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
              <Link className={classes['link']} to='/forgetpassword/0'>
                <small>Forget Password?</small>
              </Link>
            </div>
            <div>
              <button
                type='submit'
                className={[
                  'btn btn-primary btn-block',
                  classes.next,
                  classes['btn-primary'],
                ].join(' ')}
                disable={loading.toString()}
              >
                {loading ? 'Loading' : 'Login'}
              </button>
              <Link className={classes['link']} to='/signup/0'>
                <small>
                  Need an account?
                  <span
                    style={{
                      color: 'whitesmoke',
                      marginLeft: '10px',
                    }}
                  >
                    Sign up
                  </span>
                </small>
              </Link>
            </div>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Login;
