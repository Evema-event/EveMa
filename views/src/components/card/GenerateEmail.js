import React, { useState, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import swal from 'sweetalert';

import axios from 'axios';
import url from '../../server';

import EventContext from '../../context/event/eventContext';

const GenerateEmail = () => {

  const { selectedEvent, indivEvent } = useContext(EventContext);

  const initialState = {
    subject: { value: '', error: '' },
    body: { value: '', error: '' },
    visitor: false,
    exhibitor: false,
    error: ''
  };

  const [fields, setFields] = useState(initialState);
  const [isSubmit, setIsSubmit] = useState(false);
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
    let isError = false;
    if (fields.subject.value.length < 10) {
      isError = true;
      fields.subject.error = 'Subject must be atleast 10 characters in length';
    } else {
      fields.subject.error = '';
    }

    if (fields.body.value.length < 25) {
      isError = true;
      fields.body.error =
        'Body must be atleast 25 characters in length ';
    } else {
      fields.body.error = '';
    }

    if (!(fields.visitor || fields.exhibitor)) {
      isError = true;
      fields.error = 'At least one user must be checked';
    } else {
      fields.error = '';
    }

    setFields({
      ...fields,
    });

    if (!isError) {
      setLoading(true);

      let users = [];

      if (fields.visitor) {
        users.push("Visitor");
      }
      if (fields.exhibitor) {
        users.push("Exhibitor");
      }

      const data = {
        subject: fields.subject.value,
        body: fields.body.value,
        users: users
      };

      let config = {
        headers: {
          'x-auth-token': localStorage.getItem('token')
        }
      };

      let mailUrl = url + 'event/notifyUsers/' + selectedEvent;

      axios
        .post(mailUrl, data, config)
        .then((res) => {
          swal('', 'Email sent successfully', 'success');
          setLoading(false);
          setIsSubmit(true);
        })
        .catch((err) => {
          swal('Something Wrong', 'Try again!', 'error');
          setLoading(false);
        });
    }
  };

  return (
    <div>
      {!selectedEvent && !indivEvent && <Redirect to="/" />}
      {isSubmit && <Redirect to="/" />}
      <div className='email-card'>
        <div className='email-title'>
          <h4>Generate E-mail for {indivEvent && indivEvent.name}</h4>
        </div>
        <div className='email-item'>
          <h5>Subject to attach with E-mail</h5>
          <div className='details-bg'>
            <input
              type="text"
              name="subject"
              onChange={handleChange}
              value={fields.subject.value}
              style={{ width: "100%" }}
            />
          </div>
          <p style={{ color: "white" }}>{fields.subject.error}</p>
        </div>
        <div className='email-item'>
          <h5>Body of the email</h5>
          <div className='details-bg'>
            <textarea
              rows="5"
              name="body"
              value={fields.body.value}
              onChange={handleChange}
              style={{ width: "100%" }}>
            </textarea>
          </div>
          <p style={{ color: "white" }}>{fields.body.error}</p>
        </div>
        <div className='checkbox_send'>
          <div className='form-check form-check-inline'>
            <input
              className='form-check-input'
              type='checkbox'
              id='inlineCheckbox1'
              checked={fields.visitor}
              onChange={
                () => {
                  setFields({
                    ...fields,
                    visitor: !fields.visitor
                  });
                }
              }
            />
            <label className='form-check-label' htmlFor='inlineCheckbox1'>
              Visitor
            </label>
          </div>
          <div className='form-check form-check-inline'>
            <input
              className='form-check-input'
              type='checkbox'
              checked={fields.exhibitor}
              onChange={
                () => {
                  setFields({
                    ...fields,
                    exhibitor: !fields.exhibitor
                  });
                }
              }
              id='inlineCheckbox2'
              value='option2'
            />
            <label className='form-check-label' htmlFor='inlineCheckbox2'>
              Exhibitor
            </label>
          </div>
          <p style={{ marginTop: "5px" }}>{fields.error}</p>
        </div>

        {loading ? <button> Loading </button> : <button
          type='button'
          className='btn btn-primary btn-block next'
          id='link'
          onClick={handleSubmit}
        >
          Send E-mail
        </button>}
      </div>
    </div>
  );
};
export default GenerateEmail;
