import React, { useState, useContext } from 'react';
import { Link, Redirect } from 'react-router-dom';
import url from '../../server';
import axios from 'axios';
import swal from 'sweetalert';
import EventContext from '../../context/event/eventContext';

const RegisterBtn = (props) => {
  const [loading, setLoading] = useState(false);
  const [isSubmit, setisSubmit] = useState(false);

  const eventContext = useContext(EventContext);

  const registerEvent = () => {
    let data = {};
    let config = {
      headers: {
        'x-auth-token': localStorage.getItem('token'),
      },
    };
    let registerUrl = url + `event/registerEvent/${props.eventId}`;
    setLoading(true);
    axios
      .put(registerUrl, data, config)
      .then((res) => {
        swal('Congrats', 'Event registered Successfully', 'success');
        console.log(res);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  const deleteEvent = () => {
    let configuration = {
      headers: {
        'x-auth-token': localStorage.getItem('token'),
      },
    };
    //let eventdata = {};

    let deleteUrl = url + `event/deleteEvent/${props.eventId}`;
    setLoading(true);
    axios
      .delete(deleteUrl, configuration)
      .then((res) => {
        if (res.data.message === 'Success') {
          swal('Congrats', 'Event deleted successfully', 'success');
          console.log(res);
          eventContext.getUpcomingEvent();

          setisSubmit(true);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  if (
    localStorage.getItem('token') &&
    localStorage.getItem('role') === 'Visitor'
  ) {
    return (
      <div className='register-button'>
        {loading ? (
          <button disabled>Loading</button>
        ) : (
          <button onClick={registerEvent}>Register Event</button>
        )}
      </div>
    );
  } else if (
    localStorage.getItem('token') &&
    localStorage.getItem('role') === 'Exhibitor'
  ) {
    return (
      <div>
        <div className='btn_exhibitor'>
          {loading ? <div disabled>Loading</div> : <div>Register Stall</div>}
        </div>
        <div className='btn_exhibitor'>
          {loading ? (
            <div disabled>Loading</div>
          ) : (
            <div>Register Conference</div>
          )}
        </div>
      </div>
    );
  } else if (
    localStorage.getItem('token') &&
    localStorage.getItem('role') === 'Organizer'
  ) {
    return (
      <>
        {isSubmit && <Redirect to='/admin' />}
        <div className='register-button' onClick={deleteEvent}>
          {loading ? <div disabled>Loading</div> : <div>Delete Event</div>}
        </div>
      </>
    );
  }
  return (
    <div>
      <Link to='/login'>Register</Link>
    </div>
  );
};

export default RegisterBtn;
