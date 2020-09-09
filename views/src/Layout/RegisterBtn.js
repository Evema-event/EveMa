import React, { useState, useContext } from 'react';
import { Link, Redirect } from 'react-router-dom';
import swal from 'sweetalert';

import url from '../server';
import axios from 'axios';

import EventContext from '../context/event/eventContext';
import AuthContext from '../context/auth/authContext';

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
        authContext.getProfile();
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
    padding: "2px 7px",
    backgroundColor: "white",
    color: "green"
  }

  const stallBtn = () => {
    let stallCount = 0;
    for (var stalls of authContext.registeredStalls) {
      if (stalls.eventId === props.eventId) {
        stallCount = stalls.stallId.length;
      }
    }

    if (stallCount < 2) {
      return <>
        {
          loading ? <div disabled>Loading</div> :
            <div className='btn btn-success pl-2 pr-2' style={{ width: "200px" }} onClick={registerStall}>
              Register Stall <span style={stallCountCSS}>{2 - stallCount}</span>
            </div>
        }
      </>;
    } else {
      return <div className='btn btn-success' style={{ width: "150px" }}>Registered <span style={{ ...stallCountCSS, backgroundColor: "red" }}>0</span> </div>;
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
      return <div className='btn btn-success pl-5 pr-5'>Registered</div>;
    } else {
      return < >
        {loading ? (
          <div disabled>Loading</div>
        ) : (
            <div className='btn btn-success' style={{ width: "200px" }} onClick={registerConference}>Register Conference
            </div>
          )}
      </>;
    }
  }

  if (
    localStorage.getItem('token') &&
    localStorage.getItem('role') === 'Visitor'
  ) {
    return (
      <div className="ml-auto">
        {authContext.registeredEvents.includes(props.eventId) || regEvent ? (
          <div className='btn btn-success pl-5 pr-5'>Registered</div>
        ) : (
            <div className='btn btn-success pl-5 pr-5'>
              {loading ? (
                <div className='btn-warning' disabled>Loading</div>
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
      <div className='ml-auto row'>
        {stallRedir && <Redirect to='/registerStall' />}
        {confRedir && <Redirect to='/registerConference' />}
        <div className='col-6' style={{ position: "relative" }}>
          {stallBtn()}
        </div>
        <div className='col-6'>
          {conferenceBtn()}
        </div>
      </div>
    );
  } else if (
    localStorage.getItem('token') &&
    localStorage.getItem('role') === 'Organizer'
  ) {
    return (
      <div className="ml-auto row">
        {isSubmit && <Redirect to='/admin' />}
        <div className='col'>
          {loading ? <div className="btn btn-warning" disabled>Loading</div> : <div className="btn btn-danger" style={{ width: "200px" }} onClick={deleteEvent}>Delete Event</div>}
        </div>
        <div className='col'>
          <Link to='/admin/notifyUser' className="btn btn-success" style={{ width: "200px" }}>Notify Users</Link>
        </div>
      </div>
    );
  }
  return (
    <Link to='/login'>
      <div className='btn btn-success pl-5 pr-5'>Register</div>
    </Link>
  );
};

export default RegisterBtn;