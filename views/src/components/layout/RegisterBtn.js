import React, { useState, useContext } from 'react';
import { Link, Redirect } from 'react-router-dom';
import url from '../../server';
import axios from 'axios';
import swal from 'sweetalert';
import EventContext from '../../context/event/eventContext';
import AuthContext from '../../context/auth/authContext';

const RegisterBtn = (props) => {
  const [loading, setLoading] = useState(false);
  const [isSubmit, setisSubmit] = useState(false);
  const [regEvent, setregEvent] = useState(false);
  const [stallRedir, setStallRedir] = useState(false);
  const [confRedir, setConfRedir] = useState(false);

  const eventContext = useContext(EventContext);
  const authContext = useContext(AuthContext);

  const registerEvent = () => {
    setregEvent(true);
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
          swal('Event deleted successfully');
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

  const registerStall = () => {
    eventContext.setSelectedEvent(props.eventId);
    setStallRedir(true);
  };

  const registerConference = () => {
    eventContext.setSelectedEvent(props.eventId);
    setConfRedir(true);
  };

  if (
    localStorage.getItem('token') &&
    localStorage.getItem('role') === 'Visitor'
  ) {
    return (
      <div>
        {authContext.registeredEvents.includes(props.eventId) || regEvent ? (
          <div className='register-button'>Registered</div>
        ) : (
          <div className='register-button'>
            {loading ? (
              <div disabled>Loading</div>
            ) : (
              <div onClick={registerEvent}>Register Event</div>
            )}
          </div>
        )}
      </div>
    );
  } else if (
    localStorage.getItem('token') &&
    localStorage.getItem('role') === 'Exhibitor'
  ) {
    return (
      <div className='reg-btn'>
        {stallRedir && <Redirect to='/registerStall' />}
        {confRedir && <Redirect to='/registerConference' />}
        <div onClick={registerStall}>
          <div className='btn_exhibitor'>
            {loading ? <div disabled>Loading</div> : <div>Register Stall</div>}
          </div>
        </div>
        <div onClick={registerConference}>
          <div className='btn_exhibitor'>
            {loading ? (
              <div disabled>Loading</div>
            ) : (
              <div>Register Conference</div>
            )}
          </div>
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
    <Link to='/login' className='register-button'>
      <div>Register</div>
    </Link>
  );
};

export default RegisterBtn;
