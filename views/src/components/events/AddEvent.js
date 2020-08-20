import React, { useState, useContext, useEffect } from 'react';
import addImg from '../../img/createevent.png';
import { Link, Redirect } from 'react-router-dom';
import AdminContext from '../../context/event_admin/adminContext';

const AddEvent = () => {
  const adminContext = useContext(AdminContext);

  useEffect(() => {
    setFields({
      ...fields,
      eventName: { value: adminContext.eventName, error: '' },
      venue: { value: adminContext.venue, error: '' },
      contact: { value: adminContext.contact, error: '' },
      email: { value: adminContext.email, error: '' },
      startDate: { value: adminContext.startDate, error: '' },
      endDate: { value: adminContext.endDate, error: '' },
    });

    //eslint-disable-next-line
  }, []);
  const initialState = {
    eventName: { value: '', error: '' },
    venue: { value: '', error: '' },
    contact: { value: '', error: '' },
    email: { value: '', error: '' },
    startDate: { value: '', error: '' },
    endDate: { value: '', error: '' },
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
    //setLoading(true);
    let isError = false;

    if (fields.eventName.value.length < 4) {
      isError = true;
      fields.eventName.error =
        'The name of the event must atleast be 5 characters';
    } else {
      fields.eventName.error = '';
    }

    if (fields.venue.value.length < 5) {
      isError = true;
      fields.venue.error = 'The venue must atleast be 5 characters';
    } else {
      fields.venue.error = '';
    }

    if (fields.contact.value.length < 10) {
      isError = true;
      fields.contact.error = 'Enter a valid contact number';
    } else {
      fields.contact.error = '';
    }

    if (fields.email.value.length < 5) {
      isError = true;
      fields.email.error = 'Email is Invalid';
    } else {
      fields.email.error = '';
    }

    if (new Date(fields.startDate.value).getTime() < Date.now()) {
      isError = true;
      fields.startDate.error = 'Enter a valid date';
    } else {
      fields.startDate.error = '';
    }

    if (new Date(fields.endDate.value).getTime() < fields.startDate.value) {
      isError = true;
      fields.endDate.error = 'Enter a valid date';
    } else {
      fields.endDate.error = '';
    }

    setFields({
      ...fields,
    });
    //console.log(fields);

    if (!isError) {
      adminContext.addEvent({
        eventName: fields.eventName.value,
        venue: fields.venue.value,
        contact: fields.contact.value,
        email: fields.email.value,
        startDate: fields.startDate.value,
        endDate: fields.endDate.value,
      });
      setisSubmit(true);
      setLoading(false);
    }
  };

  return (
    <div className='event-bg'>
      {isSubmit && <Redirect to='/admin/addEvent/1' />}
      <div className='event'>
        <div className='add-left'>
          <img src={addImg} alt='Add Event' />
        </div>
        <div className='add-right'>
          <form onSubmit={handleSubmit}>
            <h1>Create an Event</h1>
            <div className='event-inputs'>
              <div className='add-group'>
                <label htmlFor='event'>Event Name</label>
                <input
                  className='add-input'
                  type='text'
                  name='eventName'
                  id='event'
                  value={fields.eventName.value}
                  placeholder='Event Name'
                  onChange={handleChange}
                  required
                />
                <h6>{fields.eventName.error}</h6>
              </div>
              <div className='add-group'>
                <label htmlFor='Venue'>Venue</label>
                <input
                  className='add-input'
                  type='text'
                  name='venue'
                  id='Venue'
                  value={fields.venue.value}
                  onChange={handleChange}
                  placeholder='Venue'
                  required
                />
                <h6>{fields.venue.error}</h6>
              </div>
              <div className='add-group'>
                <label htmlFor='Contact'>Contact</label>
                <input
                  className='add-input'
                  type='text'
                  name='contact'
                  id='Contact'
                  value={fields.contact.value}
                  onChange={handleChange}
                  placeholder='Contact'
                  required
                />
                <h6>{fields.contact.error}</h6>
              </div>
              <div className='add-group'>
                <label htmlFor='Email'>Email Address</label>
                <input
                  className='add-input'
                  type='text'
                  name='email'
                  id='Email'
                  value={fields.email.value}
                  onChange={handleChange}
                  placeholder='Email'
                  required
                />
                <h6>{fields.email.error}</h6>
              </div>
              <div className='add-group'>
                <label htmlFor='StartDate'>Start Date</label>
                <input
                  className='add-input'
                  type='date'
                  name='startDate'
                  id='StartDate'
                  value={fields.startDate.value}
                  onChange={handleChange}
                  placeholder='Start Date'
                  required
                />
                <h6>{fields.startDate.error}</h6>
              </div>
              <div className='add-group'>
                <label htmlFor='EndDate'>End Date</label>
                <input
                  className='add-input'
                  type='date'
                  name='endDate'
                  id='EndDate'
                  value={fields.endDate.value}
                  onChange={handleChange}
                  placeholder='End Date'
                  required
                />
                <h6>{fields.endDate.error}</h6>
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
              {loading ? (
                <button
                  id='link'
                  className='btn btn-primary btn-block next'
                  disable={loading.toString()}
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
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddEvent;
