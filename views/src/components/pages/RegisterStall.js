import React, { useState, useContext } from 'react';
import img from '../../img/register.png';
import { Link, Redirect } from 'react-router-dom';
import url from '../../server';
import axios from 'axios';
import swal from 'sweetalert';
import AuthContext from '../../context/auth/authContext';
import EventContext from '../../context/event/eventContext';

const RegisterStall = (props) => {
  const initialState = {
    productName: { value: '', error: '' },
    productDescription: { value: '', error: '' },
    domain: { value: '', error: '' },
  };

  const [fields, setFields] = useState(initialState);
  const [submit, setSubmit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [regEvent, setregEvent] = useState(false);

  const authContext = useContext(AuthContext);
  const eventContext = useContext(EventContext);

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
      setregEvent(true);
      let data = {};
      let config = {
        headers: {
          'x-auth-token': localStorage.getItem('token'),
        },
      };
      let registerStallUrl =
        url + `stall/registerStall/${eventContext.selectedEvent}`;
      setLoading(true);
      console.log(url);
      axios
        .post(registerStallUrl, data, config)
        .then((res) => {
          swal('Congrats', 'Stall registered Successfully', 'success');
          // eventContext.setSelectedEvent('');
          console.log(res);
          setSubmit(true);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    }
  };

  return (
    <div>
      <div className='section-register'>
        {submit && <Redirect to='/' />}
        <img className='reg-img' src={img} alt='Register Stall' />
        <form onSubmit={handleSubmit}>
          <h2>Register Stall</h2>
          <div className='form_reg-group'>
            <label htmlFor='product'>Product Name</label>
            <input
              type='text'
              name='productName'
              id='product'
              className='reg-input'
              value={fields.productName.value}
              onChange={handleChange}
              placeholder='Product Name'
              required
            />
            <h6>{fields.productName.error}</h6>
          </div>
          <div className='form_reg-group'>
            <label htmlFor='domain'>Domain</label>
            <input
              type='text'
              name='domain'
              id='domain'
              className='reg-input'
              onChange={handleChange}
              value={fields.domain.value}
              placeholder='Domain'
              required
            />
            <h6>{fields.domain.error}</h6>
          </div>
          <div className='form_reg-group'>
            <label htmlFor='productDesc'>Product Description</label>
            <textarea
              type='text'
              name='productDescription'
              id='productDesc'
              className='reg-input'
              onChange={handleChange}
              value={fields.productDescription.value}
              rows='5'
              cols='50'
              required
              placeholder='Enter the product description'
            />
            <h6>{fields.productDescription.error}</h6>
          </div>
          {authContext.registeredStalls.includes(props.eventId) || regEvent ? (
            <div className='register-button'>Registered</div>
          ) : (
            <div className='register-button'>
              {loading ? (
                <button
                  id='link'
                  className='btn btn-primary btn-block can next'
                  disable={loading.toString()}
                >
                  Loading
                </button>
              ) : (
                <button
                  type='submit'
                  className='btn btn-primary btn-block can next'
                  id='link'
                >
                  Register
                </button>
              )}
            </div>
          )}

          <Link to='/'>
            <button type='button' className='btn btn-primary btn-block can'>
              Cancel
            </button>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default RegisterStall;