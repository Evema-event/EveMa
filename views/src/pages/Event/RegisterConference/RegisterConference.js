import React, { useState, useContext } from 'react';
import { Link, Redirect } from 'react-router-dom';
import swal from 'sweetalert';

import img from '../../../img/registerConference.png';
import classes from './registerConference.module.css';

import axios from 'axios';
import url from '../../../server';

import EventContext from '../../../context/event/eventContext';
import AuthContext from '../../../context/auth/authContext';

const RegisterConf = (props) => {
  const initialState = {
    confTitle: { value: '', error: '' },
    confDesc: { value: '', error: '' },
    conferenceTheme: { value: '', error: '' },
    stDate: { value: '', error: '' },
    stTime: { value: '', error: '' },
    edTime: { value: '', error: '' },
    seatLimit: { value: '', error: '' },
  };

  const [fields, setFields] = useState(initialState);
  const [submit, setSubmit] = useState(false);
  const [loading, setLoading] = useState(false);

  const eventContext = useContext(EventContext);
  const authContext = useContext(AuthContext);

  const handleChange = (event) => {
    const { name, value } = event.target;
    const updatedFields = {
      ...fields[name],
    };

    updatedFields.value = value;

    setFields({
      ...fields,
      [name]: updatedFields,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let isError = false;
    if (fields.confTitle.value.length < 2) {
      isError = true;
      fields.confTitle.error =
        'Conference Title must be greater than 2 characters';
    } else {
      fields.confTitle.error = '';
    }
    if (fields.conferenceTheme.value.length < 5) {
      isError = true;
      fields.conferenceTheme.error = 'Domain must be greater than 5 characters';
    } else {
      fields.conferenceTheme.error = '';
    }
    if (fields.confDesc.value.length < 15) {
      isError = true;
      fields.confDesc.error = 'Description must be greater than 15 characters';
    } else {
      fields.confDesc.error = '';
    }
    if (new Date(fields.stDate.value).getTime() < Date.now()) {
      isError = true;
      fields.stDate.error = 'Enter a valid date';
    } else {
      fields.stDate.error = '';
    }

    if (fields.seatLimit.value.length < 2) {
      isError = true;
      fields.seatLimit.error = 'Seat Limit must be greater than 2 characters';
    } else {
      fields.seatLimit.error = '';
    }

    setFields({ ...fields });

    if (!isError) {
      setLoading(true);
      let data = {
        title: fields.confTitle.value,
        description: fields.confDesc.value,
        theme: fields.conferenceTheme.value,
        date: fields.stDate.value,
        startTime: fields.stTime.value,
        endTime: fields.edTime.value,
        seatLimit: fields.seatLimit.value,
      };
      let config = {
        headers: {
          'x-auth-token': localStorage.getItem('token'),
        },
      };
      let registerConfUrl =
        url + `conference/registerConference/${eventContext.selectedEvent}`;
      setLoading(true);
      axios
        .post(registerConfUrl, data, config)
        .then((res) => {
          authContext.getProfile();
          swal('Congrats', 'Conference registered Successfully', 'success')
            .then((val) => {
              setSubmit(true);
            })
            .catch((err) => {
              throw err;
            });
          setLoading(false);
        })
        .catch((err) => {
          if (
            err &&
            err.response &&
            err.response.data &&
            err.response.data.error === 'You can only register 1 conference'
          ) {
            swal(
              'Cannot register',
              'You can only register for one conference',
              'error'
            );
          } else {
            swal('Something went wrong', 'Try again!', 'error');
          }
          setLoading(false);
          setSubmit(true);
        });
    }
  };

  return (
    <div>
      <div className={classes['section-conf']}>
        {submit && <Redirect to='/conferenceList' />}
        {!eventContext.selectedEvent && <Redirect to='/' />}
        <img
          className={classes['reg-img']}
          src={img}
          alt='Register Conference'
        />
        <form onSubmit={handleSubmit}>
          <h2>Register Conference</h2>
          <div className={classes['reg_grid']}>
            <div className={classes['form_reg-group']}>
              <label htmlFor='conference'>Title</label>
              <input
                type='text'
                name='confTitle'
                id='conference'
                className={classes['reg-input']}
                value={fields.confTitle.value}
                onChange={handleChange}
                placeholder='Title'
                required
              />
              <h6>{fields.confTitle.error}</h6>
            </div>
            <div className={classes['form_reg-group']}>
              <label htmlFor='domain'>Domain</label>
              <input
                type='text'
                name='conferenceTheme'
                id='domain'
                className={classes['reg-input']}
                value={fields.conferenceTheme.value}
                onChange={handleChange}
                placeholder='Domain'
                required
              />
              <h6>{fields.conferenceTheme.error}</h6>
            </div>
            <div className={classes['form_reg-group']}>
              <label htmlFor='seatLimit'>Seat Limit</label>
              <input
                className={classes['reg-input']}
                type='text'
                name='seatLimit'
                id='seatLimit'
                value={fields.seatLimit.value}
                onChange={handleChange}
                placeholder='Seat Limit'
                required
              />
              <h6>{fields.seatLimit.error}</h6>
            </div>
            <div className={classes['form_reg-group']}>
              <label htmlFor='Date'>Date</label>
              <input
                className={classes['reg-input']}
                type='date'
                name='stDate'
                id='Date'
                value={fields.stDate.value}
                onChange={handleChange}
                placeholder='Date of Conference'
                required
              />
              <h6>{fields.stDate.error}</h6>
            </div>
            <div className={classes['form_reg-group']}>
              <label htmlFor='startTime'>Start Time</label>
              <input
                className={classes['reg-input']}
                type='text'
                name='stTime'
                id='startTime'
                value={fields.stTime.value}
                onChange={handleChange}
                placeholder='Start Time'
                required
              />
              <h6>{fields.stTime.error}</h6>
            </div>
            <div className={classes['form_reg-group']}>
              <label htmlFor='endTime'>End Time</label>
              <input
                className={classes['reg-input']}
                type='text'
                name='edTime'
                id='endTime'
                value={fields.edTime.value}
                onChange={handleChange}
                placeholder='End Time'
                required
              />
              <h6>{fields.edTime.error}</h6>
            </div>
            <div
              className={[classes['form_reg-group'], classes['reg_text']].join(
                ' '
              )}
            >
              <label htmlFor='description'>Description</label>
              <textarea
                type='text'
                name='confDesc'
                id='description'
                className={classes['reg_txt']}
                rows='5'
                cols='50'
                value={fields.confDesc.value}
                onChange={handleChange}
                placeholder='Enter a Short Description'
                required
              />
              <h6>{fields.confDesc.error}</h6>
            </div>

            <Link to='/'>
              <button
                type='button'
                className={[
                  'btn btn-primary btn-block',
                  classes.can,
                  classes.next,
                  classes['btn-primary'],
                ].join(' ')}
              >
                Cancel
              </button>
            </Link>
            <div className={classes['reg']}>
              {authContext.registeredConferences.includes(props.eventId) ? (
                <div
                  className={[
                    'btn btn-primary btn-block',
                    classes.can,
                    classes.next,
                    classes['btn-primary'],
                  ].join(' ')}
                >
                  Registered
                </div>
              ) : (
                <div className={classes['register-button']}>
                  {loading ? (
                    <button
                      type='button'
                      className={[
                        'btn btn-primary btn-block',
                        classes.can,
                        classes.next,
                        classes['btn-primary'],
                      ].join(' ')}
                      disable={loading.toString()}
                    >
                      Loading
                    </button>
                  ) : (
                    <button
                      type='submit'
                      className={[
                        'btn btn-primary btn-block',
                        classes.can,
                        classes.next,
                        classes['btn-primary'],
                      ].join(' ')}
                    >
                      Register
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterConf;
