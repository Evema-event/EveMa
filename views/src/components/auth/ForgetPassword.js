import React, { useState, useContext, useEffect } from 'react';
import { Redirect, Link } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';
import axios from 'axios';
import url from '../../server.js';

const ForgetPassword = () => {
  const authContext = useContext(AuthContext);

  const initialState = {
    email: { value: '', error: '' },
  };

  const [fields, setFields] = useState(initialState);
  const [isSubmit, setisSubmit] = useState(false);
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
    if (fields.email.value.length < 5) {
      isError = true;
      fields.email.error = 'Email is Invalid';
    } else {
      fields.email.error = '';
    }

    setFields({
      ...fields,
    });
    if (!isError) {
      //console.log('hi');
      setLoading(true);
      authContext.forgetPassword({
        email: fields.email.value,
      });
      let forgetpwurl = url + 'user/forgetPassword';
      let data = {
        emailId: fields.email.value,
      };
      //console.log(data);
      axios
        .post(forgetpwurl, data)
        .then((res) => {
          console.log(res);
          setLoading(false);
          setisSubmit(true);
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
        });
    }
  };

  return (
    <div className='bg-login'>
      {isSubmit && <Redirect to='/forgetpassword/1' />}
      <div className='forget'>
        <form className='form-login' onSubmit={handleSubmit}>
          <h2>Forget Password</h2>
          <span className='inputs-login'>
            <div className='form_group'>
              <label htmlFor='email'>Email</label>
              <input
                className='form_input'
                type='text'
                name='email'
                id='email'
                value={fields.email.value}
                placeholder='Enter your Email'
                required
                onChange={handleChange}
              />
              <h6>{fields.email.error}</h6>
            </div>
            <div>
              <button
                type='submit'
                className='btn btn-primary btn-block next'
                //disable={loading}
              >
                Next
              </button>
            </div>
          </span>
        </form>
      </div>
    </div>
  );
};

export default ForgetPassword;
