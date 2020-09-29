import React, { useState, useContext } from 'react';
import { Redirect, Link } from 'react-router-dom';
import swal from 'sweetalert';

import classes from '../Login/login.module.css';
import btnclasses from '../../../Layout/button.module.css';

import axios from 'axios';
import url from '../../../server.js';

import AuthContext from '../../../context/auth/authContext';

const ForgetPassword2 = () => {
  const authContext = useContext(AuthContext);

  const initialState = {
    password: { value: '', error: '' },
    cpassword: { value: '', error: '' },
    otp: { value: '', error: '' },
  };

  const [fields, setFields] = useState(initialState);
  const [loading, setLoading] = useState(false);
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

    if (fields.otp.value.length < 6) {
      isError = true;
      fields.otp.error = 'Invalid OTP ';
    } else {
      fields.otp.error = '';
    }

    setFields({
      ...fields,
    });

    if (!isError) {
      setLoading(true);
      const userData = {
        emailId: authContext.email,
        password: fields.password.value,
        otp: fields.otp.value,
      };

      let otpurl = url + 'user/resetPassword';

      axios
        .put(otpurl, userData)
        .then((res) => {
          setLoading(false);
          setIsSubmit(true);
          swal('Password reset', 'Your password reset succesfully', 'success');
        })
        .catch((err) => {
          setLoading(false);
          swal('Error', 'Check your password again', 'error');
        });
    }
  };

  return (
    <div className={classes['bg-login']}>
      {isSubmit && <Redirect to='/login' />}
      {!authContext.email && <Redirect to='/forgetpassword/0' />}
      <div className={classes['forget']}>
        <form className={classes['form-login']} onSubmit={handleSubmit}>
          <h5>Create New Password</h5>
          <span className={classes['inputs-login']}>
            <div>
              <div className={classes['form_group']}>
                <label htmlFor='password'>New Password</label>
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
              </div>
              <div className={classes['form_group']}>
                <label htmlFor='cpassword'>Confirm Password</label>
                <input
                  className={classes['form_input']}
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
              <div className={classes['form_group']}>
                <label htmlFor='otp'>OTP</label>
                <input
                  className={classes['form_input']}
                  type='text'
                  name='otp'
                  id='otp'
                  minLength='6'
                  value={fields.otp.value}
                  placeholder='Enter your OTP'
                  onChange={handleChange}
                  required
                />
                <h6>{fields.otp.error}</h6>
              </div>
              {loading ? (
                <button
                  type='button'
                  className={[
                    'btn btn-primary btn-block',
                    btnclasses.next,
                    btnclasses.link,
                    btnclasses['btn-primary'],
                  ].join(' ')}
                  disable='true'
                >
                  Loading
                </button>
              ) : (
                <button
                  type='submit'
                  className={[
                    'btn btn-primary btn-block',
                    btnclasses.next,
                    btnclasses.link,
                    btnclasses['btn-primary'],
                  ].join(' ')}
                style={{boxShadow: "3px 3px 3px rgba(0,0,0,0.50)"}}
                >
                  Submit
                </button>
              )}
              <Link to='/forgetpassword/0'>
                <button
                  type='submit'
                  className={[
                    'btn btn-primary btn-block',
                    btnclasses.next,
                    btnclasses.link,
                    btnclasses['btn-primary'],
                  ].join(' ')}
                style={{boxShadow: "3px 3px 3px rgba(0,0,0,0.50)"}}
                >
                  Cancel
                </button>
              </Link>
            </div>
          </span>
        </form>
      </div>
    </div>
  );
};

export default ForgetPassword2;
