import React, { useState, useContext, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import swal from 'sweetalert';

import addImg from '../../../img/createevent.png';
import classes from './addEvent.module.css';

import axios from 'axios';
import url from '../../../server';

import AdminContext from '../../../context/event_admin/adminContext';

const AddEvent = () => {
  const initialState = {
    lastDate: { value: '', error: '' },
    price: { value: '', error: '' },
    startTime: { value: '', error: '' },
    endTime: { value: '', error: '' },
    description: { value: '', error: '' },
  };
  const adminContext = useContext(AdminContext);

  useEffect(() => {
    setFields({
      ...fields,
      lastDate: { value: adminContext.lastDate, error: '' },
      price: { value: adminContext.price, error: '' },
      description: { value: adminContext.description, error: '' },
      startTime: { value: adminContext.startTime, error: '' },
      endTime: { value: adminContext.endTime, error: '' },
    });
    // eslint-disable-next-line
  }, []);
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

  const updateState = () => {
    adminContext.addEvent({
      lastDate: fields.lastDate.value,
      price: fields.price.value,
      description: fields.description.value,
      startTime: fields.startTime.value,
      endTime: fields.endTime.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let isError = false;

    if (
      new Date(fields.lastDate.value).getTime() >
      new Date(adminContext.startDate).getTime() ||
      new Date(fields.lastDate.value).getTime() <= Date.now()
    ) {
      isError = true;
      fields.lastDate.error =
        'Last date must be before the start of the event and after today';
    } else {
      fields.lastDate.error = '';
    }

    if (fields.description.value.length < 15) {
      isError = true;
      fields.description.error = 'Description must be atleast 2 lines';
    } else {
      fields.description.error = '';
    }

    setFields({
      ...fields,
    });

    if (!isError) {
      setLoading(true);
      let addeventUrl = url + 'event/addEvent';
      updateState();
      let config = {
        headers: {
          'x-auth-token': localStorage.getItem('token'),
        },
      };
      let data = {
        name: adminContext.eventName,
        venue: adminContext.venue,
        contactNumber: adminContext.contact,
        contactEmail: adminContext.email,
        startDate: adminContext.startDate,
        endDate: adminContext.endDate,
        registrationLastdate: fields.lastDate.value,
        price: fields.price.value,
        description: fields.description.value,
        startTime: fields.startTime.value,
        endTime: fields.endTime.value,
      };
      axios
        .post(addeventUrl, data, config)
        .then((res) => {
          swal('Congrats', 'Event added', 'success');
          setisSubmit(true);
          adminContext.addEvent();
          setLoading(false);
        })
        .catch((err) => {
          swal('Oops...', 'Something Wrong', 'error');
        });
    }
  };
  return (
    <div className={classes['event-bg']}>
      {isSubmit && <Redirect to='/admin' />}
      {!adminContext.eventName && <Redirect to='/admin/addEvent/0' />}
      <div className={classes['event']}>
        <div className={classes['add-left']}>
          <img src={addImg} alt='Add Event' />
        </div>
        <div className={classes['add-right']}>
          <form onSubmit={handleSubmit}>
            <h1>Create an Event</h1>
            <div className={classes['event-inputs']}>
              <div className={classes['add-group']}>
                <label htmlFor='lastDate'>Last Date To Register</label>
                <input
                  className={classes['add-input']}
                  type='date'
                  name='lastDate'
                  id='lastDate'
                  value={fields.lastDate.value}
                  onChange={handleChange}
                  placeholder='Last Date'
                  required
                />
                <h6>{fields.lastDate.error}</h6>
              </div>
              <div className={classes['add-group']}>
                <label htmlFor='price'>Price</label>
                <input
                  className={classes['add-input']}
                  type='text'
                  name='price'
                  id='price'
                  value={fields.price.value}
                  onChange={handleChange}
                  placeholder='Price'
                  required
                />
              </div>
              <div className={classes['add-group']}>
                <label htmlFor='startTime'>Start Time</label>
                <input
                  className={classes['add-input']}
                  type='text'
                  name='startTime'
                  id='startTime'
                  value={fields.startTime.value}
                  onChange={handleChange}
                  placeholder='eg: 9:00'
                  required
                />
              </div>
              <div className={classes['add-group']}>
                <label htmlFor='endTime'>End Time</label>
                <input
                  className={classes['add-input']}
                  type='text'
                  name='endTime'
                  id='endTime'
                  value={fields.endTime.value}
                  onChange={handleChange}
                  placeholder='eg: 5:30'
                  required
                />
              </div>

              <div className={classes['description']}>
                <label htmlFor='text-area'>Event Description</label>
                <textarea
                  className={classes['add_text']}
                  name='description'
                  id='text-area'
                  cols='5'
                  rows='5'
                  value={fields.description.value}
                  onChange={handleChange}
                  placeholder='Enter the event description'
                  required
                />
                <h6>{fields.description.error}</h6>
              </div>
              <Link to='/admin/addEvent/0' id='link'>
                <button
                  type="button"
                  className={['btn btn-primary btn-block', classes.next, classes.link, classes['btn-block'], classes['btn'], classes['btn-primary']].join(' ')}
                  onClick={updateState}
                >
                  Back
                </button>
              </Link>
              {loading ? (
                <button
                  type="button"
                  className={['btn btn-primary btn-block', classes.next, classes.link, classes['btn-block'], classes['btn'], classes['btn-primary']].join(' ')}
                  disable={loading.toString()}
                >
                  Loading
                </button>
              ) : (
                  <button
                    type='submit'
                    className={['btn btn-primary btn-block', classes.next, classes.link, classes['btn-block'], classes['btn'], classes['btn-primary']].join(' ')}
                  >
                    Create Event
                  </button>
                )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddEvent;
