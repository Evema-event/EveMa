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
                <label htmlFor='lastDate'>Last Date</label>
                <input
                  className='add-input'
                  type='date'
                  name='lastDate'
                  id='lastDate'
                  placeholder='Last Date'
                />
              </div>
              <div className='add-group'>
                <label htmlFor='price'>Price</label>
                <input
                  className='add-input'
                  type='text'
                  name='price'
                  id='price'
                  placeholder='Price'
                />
              </div>
              <div className='add-group'>
                <label htmlFor='startTime'>Start Time</label>
                <input
                  className='add-input'
                  type='text'
                  name='startTime'
                  id='startTime'
                  placeholder='Start Time'
                />
              </div>
              <div className='add-group'>
                <label htmlFor='endTime'>End Time</label>
                <input
                  className='add-input'
                  type='text'
                  name='endTime'
                  id='endTime'
                  placeholder='End Time'
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
                  placeholder='Enter the event description'
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
