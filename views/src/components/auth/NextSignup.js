import React, { useState } from 'react';
import signup from '../../img/signup.jpg';
import { Redirect, Link } from 'react-router-dom';

const NextSignup = () => {
  const initialState = {
    firstname: { value: '', error: '' },
    lastname: { value: '', error: '' },
    state: { value: '', error: '' },
    country: { value: '', error: '' },
    zipcode: { value: '', error: '' },
    city: { value: '', error: '' },
    dob: { value: '', error: '' }
  };

  const [fields, setFields] = useState(initialState);
  const [isSubmit, setIsSubmit] = useState(false);

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
    if (fields.firstname.value.length < 3) {
      isError = true;
      fields.firstname.error = 'firstname is atleast 5 character';
    } else {
      fields.firstname.error = '';
    }

    if (fields.lastname.value.length < 3) {
      isError = true;
      fields.lastname.error = 'lastname is atleast 5 character';
    } else {
      fields.lastname.error = '';
    }

    if (fields.state.value.length < 3) {
      isError = true;
      fields.state.error = 'State is required';
    } else {
      fields.state.error = '';
    }

    if (fields.country.value.length < 3) {
      isError = true;
      fields.country.error = 'Country is required';
    } else {
      fields.country.error = '';
    }

    if (fields.city.value.length < 3) {
      isError = true;
      fields.city.error = 'city is required';
    } else {
      fields.city.error = '';
    }

    if (fields.zipcode.value.length < 6) {
      isError = true;
      fields.zipcode.error = 'zipcode is required';
    } else {
      fields.zipcode.error = '';
    }

    if (new Date(fields.dob.value).getTime() > Date.now()) {
      isError = true;
      fields.dob.error = 'Enter a valid Date of birth';
    } else {
      fields.dob.error = '';
    }

    setFields({
      ...fields,
    });

    console.log(fields);

    if (!isError) {
      setIsSubmit(true);
    }
  };
  return (
    <div className='bg-signup-2'>
      {isSubmit && <Redirect to='/signup/2' />}
      <div className='signup'>
        <img src={signup} alt='signup' className='imgLeft' />
        <form className='form-signup' onSubmit={handleSubmit}>
          <h1>Personal Details</h1>
          <span className='inputs'>
            <div className='form_group'>
              <label htmlFor='firstname'>First Name</label>
              <input
                className='form_input'
                type='text'
                name='firstname'
                id='firstname'
                value={fields.firstname.value}
                placeholder='Firstname'
                required
                onChange={handleChange}
              />
              <h6>{fields.firstname.error}</h6>
            </div>
            <div className='form_group'>
              <label htmlFor='lastname'>Last Name</label>
              <input
                className='form_input'
                type='text'
                name='lastname'
                id='lastname'
                value={fields.lastname.value}
                placeholder='Lastname'
                required
                onChange={handleChange}
              />
              <h6>{fields.lastname.error}</h6>
            </div>
            <div className='form_group'>
              <label htmlFor='state'>State</label>
              <input
                className='form_input'
                type='text'
                name='state'
                id='state'
                value={fields.state.value}
                placeholder='State'
                required
                onChange={handleChange}
              />
              <h6>{fields.state.error}</h6>
            </div>

            <div className='form_group'>
              <label htmlFor='country'>Country</label>
              <input
                className='form_input'
                type='text'
                name='country'
                id='country'
                value={fields.country.value}
                placeholder='Country'
                required
                onChange={handleChange}
              />
              <h6>{fields.country.error}</h6>
            </div>
            <div className='form_group' id='check'>
              <label htmlFor='city'>City</label>
              <input
                className='form_input'
                type='text'
                name='city'
                id='city'
                value={fields.city.value}
                placeholder='City'
                required
                onChange={handleChange}
              />
              <h6>{fields.city.error}</h6>
            </div>
            <div className='form_group'>
              <label htmlFor='zipcode'>Zipcode</label>
              <input
                className='form_input'
                type='text'
                name='zipcode'
                id='zipcode'
                value={fields.zipcode.value}
                placeholder='Zipcode'
                required
                onChange={handleChange}
              />
              <h6>{fields.zipcode.error}</h6>
            </div>
            <div className='form_group'>
              <label htmlFor='dob'>Date of Birth</label>
              <input
                type='date'
                name='dob'
                id='dob'
                required
                value={fields.dob.value}
                className='form_input'
                onChange={handleChange}
              />
              <h6>{fields.dob.error}</h6>
            </div>
            <div className='form_group'>
              <label htmlFor='gender'>Gender</label>
              <span>
                <select
                  required
                  defaultValue={'DEFAULT'}
                  className='custom-select'
                  id='gender'
                >
                  <option value=''>Choose...</option>
                  <option defaultValue='1'>Male</option>
                  <option defaultValue='2'>Female</option>
                  <option defaultValue='3'>Others</option>
                </select>
              </span>
            </div>

            <Link to='/signup/0' id='link'>
              <button type='button' className='btn btn-primary btn-block next'>
                Back
              </button>
            </Link>
            <button type='submit' className='btn btn-primary btn-block next'>
              Next
            </button>
          </span>
        </form>
      </div>
    </div>
  );
};

export default NextSignup;
