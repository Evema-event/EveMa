import React, { useState, useContext, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import swal from 'sweetalert';

import signup from '../../../img/signup.jpg';
import classes from './signup.module.css';

import AuthContext from '../../../context/auth/authContext';

import axios from 'axios';
import url from '../../../server';

const Signup2 = () => {
  const authContext = useContext(AuthContext);

  const initialState = {
    destination: { value: '', error: '' },
    areasOfInterest: { value: [], error: '' },
    company: { value: '', error: '' },
    contact: { value: '', error: '' },
    address: { value: '', error: '' },
  };

  useEffect(() => {
    setFields({
      ...fields,
      destination: {
        value: authContext.destination,
        error: '',
      },
      areasOfInterest: { value: authContext.areasOfInterest, error: '' },
      company: { value: authContext.company, error: '' },
      contact: { value: authContext.contact, error: '' },
      address: { value: authContext.address, error: '' },
    });
    // eslint-disable-next-line
  }, []);

  const [fields, setFields] = useState(initialState);
  const [isSubmit, setIsSubmit] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    const updatedField = {
      ...fields[name],
    };
    if (name === 'areasOfInterest') {
      updatedField.value = value.split(',');
    } else {
      updatedField.value = value;
    }

    setFields({
      ...fields,
      [name]: updatedField,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let isError = false;
    if (fields.destination.value.length < 5) {
      isError = true;
      fields.destination.error = 'Destination must be atleast 5 character';
    } else {
      fields.destination.error = '';
    }

    if (fields.areasOfInterest.value.length < 2) {
      isError = true;
      fields.areasOfInterest.error =
        'Areas of interest must be atleast 2 fields';
    } else {
      fields.areasOfInterest.error = '';
    }

    if (fields.company.value.length < 3) {
      isError = true;
      fields.company.error = 'Company must be atleast 3 character';
    } else {
      fields.company.error = '';
    }

    if (fields.contact.value.length < 10) {
      isError = true;
      fields.contact.error = 'Contact is invalid';
    } else {
      fields.contact.error = '';
    }

    if (fields.address.value.length < 15) {
      isError = true;
      fields.address.error = 'Address is required';
    } else {
      fields.address.error = '';
    }

    setFields({
      ...fields,
    });

    if (!isError) {
      setLoading(true);
      authContext.updateUser({
        destination: fields.destination.value,
        areasOfInterest: fields.areasOfInterest.value,
        company: fields.company.value,
        contact: fields.contact.value,
        address: fields.address.value,
      });

      const userData = {
        userName: authContext.username,
        emailId: authContext.email,
        password: authContext.password,
        role: authContext.role,
        firstName: authContext.firstname,
        lastName: authContext.lastname,
        gender: authContext.gender,
        dateOfBirth: authContext.dob,
        country: authContext.country,
        state: authContext.state,
        cityName: authContext.city,
        zipCode: authContext.zipcode,
        areaOfInterest: fields.areasOfInterest.value,
        designation: fields.destination.value,
        companyName: fields.company.value,
        companyAddress: fields.address.value,
        contactNumber: fields.contact.value,
      };

      let signupUrl = url + 'user/signup';

      axios
        .post(signupUrl, userData)
        .then((res) => {
          authContext.authentication(res);
          swal('Congrats', 'You logged in successfully!', 'success');
          setLoading(false);
          setIsSubmit(true);
        })
        .catch((err) => {
          swal('Something Wrong', 'Invalid Signup Credentials', 'error');
          setLoading(false);
        });
    }
  };

  return (
    <div className={classes['bg-signup-2']}>
      {isSubmit && <Redirect to='/' />}
      {!authContext.username && <Redirect to='/signup/0' />}
      <div className={classes['signup']}>
        <img src={signup} alt='signup' className={classes['imgLeft']} />
        <form className={classes['form-signup']} onSubmit={handleSubmit}>
          <h1>Professional Details</h1>
          <span className={classes['inputs']}>
            <div className={classes['form_group']}>
              <label htmlFor='destination'>Designation</label>
              <input
                className={classes['form_input']}
                type='text'
                name='destination'
                id='destination'
                value={fields.destination.value}
                placeholder='Designation'
                required
                onChange={handleChange}
              />
              <h6>{fields.destination.error}</h6>
            </div>
            <div className={classes['form_group']}>
              <label htmlFor='areasOfInterest'>Areas of Interest</label>
              <input
                className={classes['form_input']}
                type='text'
                name='areasOfInterest'
                id='areasOfInterest'
                value={fields.areasOfInterest.value}
                onChange={handleChange}
                placeholder='IOT, ML, AI..'
                required
              />
              <h6>{fields.areasOfInterest.error}</h6>
            </div>
            <div className={classes['form_group']}>
              <label htmlFor='company'>Company/Institution Name</label>
              <input
                className={classes['form_input']}
                type='text'
                name='company'
                id='company'
                value={fields.company.value}
                onChange={handleChange}
                placeholder='Name'
                required
              />
              <h6>{fields.company.error}</h6>
            </div>

            <div className={[classes['form_group'], classes['text-area']].join(' ')}>
              <label htmlFor='contact'>Contact</label>
              <input
                className={classes['form_input']}
                type='text'
                name='contact'
                id='contact'
                value={fields.contact.value}
                onChange={handleChange}
                placeholder='Contact'
                required
              />
              <h6>{fields.contact.error}</h6>
            </div>
          </span>
          <div className={classes['form_group']}>
            <label htmlFor='text-area'>Address</label>
            <textarea
              className={classes['form_text']}
              name='address'
              id='text-area'
              value={fields.address.value}
              onChange={handleChange}
              cols='10'
              rows='5'
              placeholder='Enter Your Address'
            />
            <h6>{fields.address.error}</h6>
          </div>
          <span className={classes['inputs']}>
            <Link to='/signup/1'>
              <button type='button' className={['btn btn-primary btn-block', classes.next, classes.link, classes['btn-primary']].join(' ')}>
                Back
              </button>
            </Link>
            {loading ? (
              <button
                type="button"
                className={['btn btn-primary btn-block', classes.next, classes.link, classes['btn-primary']].join(' ')}
                disable='true'
              >
                Loading
              </button>
            ) : (
                <button
                  type='submit'
                  className={['btn btn-primary btn-block', classes.next, classes.link, classes['btn-primary']].join(' ')}
                >
                  Submit
                </button>
              )}
          </span>
        </form>
      </div>
    </div>
  );
};

export default Signup2;