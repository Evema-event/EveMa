import React, { useState, useContext, useEffect } from 'react';
import login from '../../img/login.jpg';
import { Redirect, Link } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';
import { useAlert } from 'react-alert';

const ForgetPassword = () => {
  const authContext = useContext(AuthContext);

  const alert = useAlert();

  const initialState = {
    email: { value: '', error: '' },
  };

  const [fields, setFields] = useState(initialState);
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

    //console.log(fields);

    setFields({
      ...fields,
    });

    if (!isError) {
      setLoading(true);
      authContext.updateUser({
        email: fields.email.value,
      });
    }
  };

  return (
    <div className='bg-login'>
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
              <Link to='/forgetpassword/1'>
                <button
                  type='submit'
                  className='btn btn-primary btn-block next'
                  disable={loading}
                >
                  Next
                </button>
              </Link>
            </div>
          </span>
        </form>
      </div>
    </div>
  );
};

export default ForgetPassword;
