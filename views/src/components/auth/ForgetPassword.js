import React, { useState, useContext, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';
import axios from 'axios';
import url from '../../server.js';
import swal from 'sweetalert';

const ForgetPassword = () => {
  const authContext = useContext(AuthContext);

  const initialState = {
    email: { value: '', error: '' },
  };

  const [fields, setFields] = useState(initialState);
  const [isSubmit, setisSubmit] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setFields({
      ...fields,
      email: { value: authContext.email, error: '' },
    });
    // eslint-disable-next-line
  }, []);

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
      setLoading(true);
      authContext.forgetPassword({
        email: fields.email.value,
      });
      let forgetpwurl = url + 'user/forgetPassword';
      let data = {
        emailId: fields.email.value,
      };
      axios
        .post(forgetpwurl, data)
        .then((res) => {
          setisSubmit(true);
          setLoading(false);
          swal('OTP Sent', 'Check your registered Email Address', 'success');
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
          swal('Something Wrong', 'You not signed up', 'error');
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
                type='email'
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

export default ForgetPassword;
