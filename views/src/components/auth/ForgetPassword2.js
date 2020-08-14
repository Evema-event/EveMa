import React, { useState, useContext } from 'react';
import { Redirect, Link } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';
import axios from 'axios';
import swal from 'sweetalert';
import url from '../../server.js';

const ForgetPassword2 = () => {
  const authContext = useContext(AuthContext);

  const initialState = {
    password: { value: '', error: '' },
    cpassword: { value: '', error: '' },
    otp: { value: '', error: '' },
  };

  const [fields, setFields] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [isSubmit, setisSubmit] = useState(false);

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

    //console.log(fields);

    setFields({
      ...fields,
    });

    if (!isError) {
      let otpurl = url + 'user/resetPassword';
      setLoading(true);
      authContext.updateUser({
        password: fields.password.value,
        otp: fields.otp.value,
      });
      const userData = {
        emailId: authContext.email,
        password: fields.password.value,
        otp: fields.otp.value,
      };
      console.log(userData.otp);
      axios
        .post(otpurl, userData)
        .then((res) => {
          console.log(res);
          setisSubmit(true);
          setLoading(false);
          swal('Password reset', 'Your password reset succesfully', 'success');
        })
        .catch((err) => {
          console.log(err);
          swal('Error', 'Check your password again', 'error');
        });
    }
  };

  return (
    <div className='bg-login'>
      {isSubmit && <Redirect to='/login' />}
      <div className='forget'>
        <form className='form-login' onSubmit={handleSubmit}>
          <h5>Create New Password</h5>
          <span className='inputs-login'>
            <div>
              <div className='form_group'>
                <label htmlFor='password'>New Password</label>
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
                <label htmlFor='otp'>OTP</label>
                <input
                  className='form_input'
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
              <button type='submit' className='btn btn-primary btn-block next'>
                Submit
              </button>
              <Link to='/forgetpassword/0'>
                <button
                  type='submit'
                  className='btn btn-primary btn-block next'
                >
                  Back
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
