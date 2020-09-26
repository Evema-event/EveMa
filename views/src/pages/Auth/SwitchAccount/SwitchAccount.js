import React, { useContext, useState } from 'react';
import { Redirect } from 'react-router-dom';
import swal from 'sweetalert';

import classes from '../Login/login.module.css';
import btnclasses from '../../../Layout/button.module.css';

import axios from 'axios';
import url from '../../../server.js';
import AuthContext from '../../../context/auth/authContext';

const SwitchAccount = () => {
  const authContext = useContext(AuthContext);
  const initialState = {
    password: { value: '', error: '' },
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
    if (fields.password.value.length < 8) {
      isError = true;
      fields.password.error = 'Password Must be 8 characters long';
    } else {
      fields.password.error = '';
    }

    setFields({
      ...fields,
    });
    if (!isError) {
      setLoading(true);
      let config = {
        headers: {
          'x-auth-token': localStorage.getItem('token'),
        },
      };
      let switchAccountUrl = url + 'user/switchUser';
      let data = {
        password: fields.password.value,
      };
      axios
        .post(switchAccountUrl, data, config)
        .then((res) => {
          let role =
            localStorage.getItem('role') === 'Visitor'
              ? 'Exhibitor'
              : 'Visitor';
          localStorage.setItem('role', role);
          authContext.authentication(res);
          setisSubmit(true);
          setLoading(false);
          swal(
            'Account added',
            'You have successfully created a new account',
            'success'
          );
        })
        .catch((err) => {
          setLoading(false);
          swal('Something Wrong', 'error');
        });
    }
  };

  return (
    <div className={classes['bg-login']}>
      {!localStorage.getItem('token') && <Redirect to='/' />}
      {isSubmit && <Redirect to='/' />}
      <div className={classes['forget']}>
        <form className={classes['form-login']} onSubmit={handleSubmit}>
          <h2 style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>
            Password
          </h2>
          <span className={classes['inputs-login']}>
            <div className={classes['form_group']}>
              <input
                className={classes['form_input']}
                type='password'
                name='password'
                value={fields.password.value}
                placeholder='Enter your Password'
                required
                onChange={handleChange}
              />
              <h6>{fields.password.error}</h6>
            </div>
            <div>
              {loading ? (
                <button
                  type='button'
                  className={[
                    'btn btn-primary btn-block',
                    btnclasses.next,
                    btnclasses.link,
                    btnclasses['btn-primary'],
                  ].join(' ')}
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
                >
                  Verify
                </button>
              )}
            </div>
          </span>
        </form>
      </div>
    </div>
  );
};

export default SwitchAccount;
