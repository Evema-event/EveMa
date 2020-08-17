import React, { useState } from 'react';
import addImg from '../../img/createevent.png';
import { Link, Redirect } from 'react-router-dom';

const AddEvent = () => {
  const initialState = {
    lastDate: { value: '', error: '' },
    price: { value: '', error: '' },
    startTime: { value: '', error: '' },
    endTime: { value: '', error: '' },
    description: { value: '', error: '' },
  };

  const [fields, setFields] = useState(initialState);
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

    if (new Date(fields.lastDate.value.length).getTime < Date.now()) {
      isError = true;
      fields.lastDate.error = 'Enter a valid last date to register';
    } else {
      fields.lastDate.error = '';
    }

    if (fields.price.value < 500) {
      isError = true;
      fields.lastDate.error = 'Price must be atleast 500 rupees';
    } else {
      fields.lastDate.error = '';
    }

    if (fields.description.value.length < 10) {
      isError = true;
      fields.description.error = 'Description must be atleast 2 lines';
    } else {
      fields.description.error = '';
    }

    setFields({
      ...fields,
    });

    if (!isError) {
      setisSubmit(true);
      console.log(fields);
    }
  };
  return (
    <div className='event-bg'>
      {isSubmit && <Redirect to='/' />}
      <div className='event'>
        <div className='add-left'>
          <img src={addImg} alt='Add Event' />
        </div>
        <div className='add-right'>
          <form onSubmit={handleSubmit}>
            <h1>Create an Event</h1>
            <div className='event-inputs'>
              <div className='add-group'>
                <label htmlFor='lastDate'>Last Date To Register</label>
                <input
                  className='add-input'
                  type='date'
                  name='lastDate'
                  id='lastDate'
                  value={fields.lastDate.value}
                  onChange={handleChange}
                  placeholder='Last Date'
                  required
                />
              </div>
              <div className='add-group'>
                <label htmlFor='price'>Price</label>
                <input
                  className='add-input'
                  type='text'
                  name='price'
                  id='price'
                  value={fields.price.value}
                  onChange={handleChange}
                  placeholder='Price'
                  required
                />
              </div>
              <div className='add-group'>
                <label htmlFor='startTime'>Start Time</label>
                <input
                  className='add-input'
                  type='time'
                  name='startTime'
                  id='startTime'
                  value={fields.startTime.value}
                  onChange={handleChange}
                  placeholder='Start Time'
                  required
                />
              </div>
              <div className='add-group'>
                <label htmlFor='endTime'>End Time</label>
                <input
                  className='add-input'
                  type='time'
                  name='endTime'
                  id='endTime'
                  value={fields.endTime.value}
                  onChange={handleChange}
                  placeholder='End Time'
                  required
                />
              </div>

              <div className='description'>
                <label htmlFor='text-area'>Event Description</label>
                <textarea
                  className='add_text'
                  name='description'
                  id='text-area'
                  cols='5'
                  rows='5'
                  value={fields.description.value}
                  onChange={handleChange}
                  placeholder='Enter the event description'
                  required
                />
              </div>
              <Link to='/addEvent/0' id='link'>
                <button className='btn btn-primary btn-block next' id='link'>
                  Back
                </button>
              </Link>
              <button
                type='submit'
                className='btn btn-primary btn-block next'
                id='link'
              >
                Create Event
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddEvent;
