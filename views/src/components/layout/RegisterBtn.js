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
        setLoading(false);
      })
      .catch((err) => {
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
          eventContext.getUpcomingEvent();
          setisSubmit(true);
          setLoading(false);
        }
      })
      .catch((err) => {
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

  const stallCountCSS = {
    borderRadius: "5px",
    marginLeft: "5px",
    padding: "5px 10px",
    backgroundColor: "green",
    opacity: '0.8',
    color: "white"
  }

  const stallBtn = () => {
    let stallCount = 0;
    for (var stalls of authContext.registeredStalls) {
      if (stalls.eventId === props.eventId) {
        stallCount = stalls.stallId.length;
      }
    }

    if (stallCount < 2) {
      return <div className='btn_exhibitor' onClick={registerStall}>
        {loading ? <div disabled>Loading</div> : <div>Register Stall <span style={stallCountCSS}>{2 - stallCount}</span> </div>}
      </div>;
    } else {
      return <div className='btn_exhibitor'> <div> Registered <span style={{ ...stallCountCSS, backgroundColor: "red" }}>0</span> </div> </div >;
    }
  }

  const conferenceBtn = () => {
    let registered = false;
    for (var conference of authContext.registeredConferences) {
      if (conference.eventId === props.eventId) {
        registered = true;
      }
    }
    if (registered) {
      return <div className='btn_exhibitor'>Registered</div>;
    } else {
      return <div className='btn_exhibitor' onClick={registerConference}>
        {loading ? (
          <div disabled>Loading</div>
        ) : (
            <div>Register Conference</div>
          )}
      </div>;
    }
  }

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
        <div style={{ position: "relative" }}>
          {stallBtn()}
        </div>
        <div>
          {conferenceBtn()}
        </div>
      </div>
    );
  } else if (
    localStorage.getItem('token') &&
    localStorage.getItem('role') === 'Organizer'
  ) {
    return (
      <div className="reg-btn">
        {isSubmit && <Redirect to='/admin' />}
        <div className='btn_exhibitor' onClick={deleteEvent}>
          {loading ? <div disabled>Loading</div> : <div>Delete Event</div>}
        </div>
        <div className='btn_exhibitor'>
          <Link to='/admin/generateEmail' style={{ color: "black" }}>Notify Users</Link>
        </div>
      </div>
    );
  }
  return (
    <Link to='/login' className='register-button'>
      <div>Register</div>
    </Link>
  );
};

export default RegisterBtn;
