import React, { useState, useContext } from 'react';
import { Link, Redirect } from 'react-router-dom';
import swal from 'sweetalert';

import img from '../../../img/registerStall.png';
import classes from './registerStall.module.css';

import url from '../../../server';
import axios from 'axios';

import EventContext from '../../../context/event/eventContext';
import AuthContext from '../../../context/auth/authContext';
import StallContext from '../../../context/stall/stallContext';

const RegisterStall = (props) => {
  const initialState = {
    productName: { value: '', error: '' },
    productDescription: { value: '', error: '' },
    domain: { value: '', error: '' },
  };

  const [fields, setFields] = useState(initialState);
  const [submit, setSubmit] = useState(false);
  const [loading, setLoading] = useState(false);

  const eventContext = useContext(EventContext);
  const authContext = useContext(AuthContext);
  const stallContext = useContext(StallContext);

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
    if (fields.productName.value.length < 2) {
      isError = true;
      fields.productName.error =
        'Product Name must be greater than 2 character';
    } else {
      fields.productName.error = '';
    }
    if (fields.domain.value.length < 5) {
      isError = true;
      fields.domain.error = 'Domain must be greater than 5 character';
    } else {
      fields.domain.error = '';
    }
    if (fields.productDescription.value.length < 15) {
      isError = true;
      fields.productDescription.error =
        'Product Name must be greater than 15 character';
    } else {
      fields.productDescription.error = '';
    }

    setFields({ ...fields });

    if (!isError) {
      setLoading(true);
      let data = {
        productName: fields.productName.value,
        description: fields.productDescription.value,
        productDomain: fields.domain.value,
      };
      let config = {
        headers: {
          'x-auth-token': localStorage.getItem('token'),
        },
      };
      let registerStallUrl =
        url + `stall/registerStall/${eventContext.selectedEvent}`;
      axios
        .post(registerStallUrl, data, config)
        .then((res) => {
          eventContext.indivEvent.registeredStalls.push(res.data.stall._id);
          eventContext.setIndividualEvent(eventContext.indivEvent, true);
          stallContext.getStalls(eventContext.selectedEvent);
          authContext.getProfile();
          swal('Congrats', 'Stall registered Successfully', 'success')
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
            err.response.data.error ===
            'You can only register 2 stalls in an event'
          ) {
            swal(
              'Cannot register',
              'You can only register for two stalls',
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
      <div className={classes['section-register']}>
        {submit && <Redirect to='/stallList' />}
        {!eventContext.selectedEvent && <Redirect to='/' />}
        <img className={classes['reg-img']} src={img} alt='Register Stall' />
        <form onSubmit={handleSubmit}>
          <h2>Register Stall</h2>
          <div className={classes['form_reg-group']}>
            <label htmlFor='product'>Product Name</label>
            <input
              type='text'
              name='productName'
              id='product'
              className={classes['reg-input']}
              value={fields.productName.value}
              onChange={handleChange}
              placeholder='Product Name'
              required
            />
            <h6>{fields.productName.error}</h6>
          </div>
          <div className={classes['form_reg-group']}>
            <label htmlFor='domain'>Domain</label>
            <input
              type='text'
              name='domain'
              id='domain'
              className={classes['reg-input']}
              onChange={handleChange}
              value={fields.domain.value}
              placeholder='Domain'
              required
            />
            <h6>{fields.domain.error}</h6>
          </div>
          <div className={classes['form_reg-group']}>
            <label htmlFor='productDesc'>Product Description</label>
            <textarea
              type='text'
              name='productDescription'
              id='productDesc'
              className={classes['reg-input']}
              onChange={handleChange}
              value={fields.productDescription.value}
              rows='5'
              cols='50'
              required
              placeholder='Enter the product description'
            />
            <h6>{fields.productDescription.error}</h6>
          </div>
          {authContext.registeredStalls.includes(props.eventId) ? (
            <div
              className={
                classes['register-button btn btn-primary btn-block can next']
              }
            >
              Registered
            </div>
          ) : (
              <div className={classes['register-button']}>
                {loading ? (
                  <button
                    className={[
                      'btn btn-primary btn-block',
                      classes.can,
                      classes.next,
                      classes['btn-primary'],
                    ].join(' ')}
                    type='button'
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
        </form>
      </div>
    </div>
  );
};

export default RegisterStall;
