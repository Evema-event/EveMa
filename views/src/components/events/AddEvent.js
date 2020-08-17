import React from 'react';
import addImg from '../../img/createevent.png';
import { Link } from 'react-router-dom';

const AddEvent = () => {
  return (
    <div className='event-bg'>
      <div className='event'>
        <div className='add-left'>
          <img src={addImg} alt='Add Event' />
        </div>
        <div className='add-right'>
          <form>
            <h1>Create an Event</h1>
            <div className='event-inputs'>
              <div className='add-group'>
                <label htmlFor='eventName'>Event Name</label>
                <input
                  className='add-input'
                  type='text'
                  name='event'
                  id='eventName'
                  placeholder='Event Name'
                />
              </div>
              <div className='add-group'>
                <label htmlFor='venue'>Venue</label>
                <input
                  className='add-input'
                  type='text'
                  name='venue'
                  id='venue'
                  placeholder='Venue'
                />
              </div>
              <div className='add-group'>
                <label htmlFor='contact'>Contact</label>
                <input
                  className='add-input'
                  type='text'
                  name='contact'
                  id='contact'
                  placeholder='Contact'
                />
              </div>
              <div className='add-group'>
                <label htmlFor='email'>Email Address</label>
                <input
                  className='add-input'
                  type='text'
                  name='email'
                  id='email'
                  placeholder='Email'
                />
              </div>
              <div className='add-group'>
                <label htmlFor='startDate'>Start Date</label>
                <input
                  className='add-input'
                  type='date'
                  name='startDate'
                  id='startDate'
                  placeholder='Start Date'
                />
              </div>
              <div className='add-group'>
                <label htmlFor='endDate'>End Date</label>
                <input
                  className='add-input'
                  type='date'
                  name='endDate'
                  id='endDate'
                  placeholder='End Date'
                />
              </div>
              <Link to='/'>
                <button
                  type='button'
                  className='btn btn-primary btn-block next'
                  id='link'
                >
                  Cancel
                </button>
              </Link>

              <button
                type='submit'
                className='btn btn-primary btn-block next'
                id='link'
              >
                Next
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddEvent;
