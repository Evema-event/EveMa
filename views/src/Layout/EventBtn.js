import React, { useState, useContext } from 'react';
import { Link, Redirect } from 'react-router-dom';
import swal from 'sweetalert';

import url from '../server';
import axios from 'axios';

import EventContext from '../context/event/eventContext';
import AuthContext from '../context/auth/authContext';
import classes from '../pages/Event/EventDetails/eventDetails.module.css';
import btnclasses from './button.module.css';

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
        eventContext.setIndividualEvent(res.data.event, true);
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
    let deleteUrl = url + `event/deleteEvent/${props.eventId}`;
    let users = ['Visitor', 'Exhibitor'];
    const data = {
      subject: 'Regarding - Cancellation of an event',
      body: `${props.event.name} event has been cancelled. Sorry for the inconvenience.
             For further queries, please contact ${props.event.contactEmail}`,
      users: users,
    };
    let mailUrl = url + `event/notifyUsers/${props.eventId}`;
    swal({
      title: 'Are you sure?',
      text: 'You are about to delete an event!',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    })
      .then((res) => {
        if (res) {
          setLoading(true);
          axios
            .post(mailUrl, data, configuration)
            .then((res) => {
              return axios.delete(deleteUrl, configuration);
            })
            .then((res) => {
              if (res.data.message === 'Success') {
                swal('Event deleted successfully and users notified');
                eventContext.getUpcomingEvent();
                setisSubmit(true);
                setLoading(false);
              }
            })
            .catch((err) => {
              throw err;
            });
        } else {
          setisSubmit(true);
          setLoading(false);
        }
      })
      .catch((err) => {
        swal('Something went wrong', 'try again!', 'error');
        setisSubmit(true);
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
    borderRadius: '5px',
    marginLeft: '5px',
    padding: '2px 7px',
    backgroundColor: 'white',
    color: 'green',
  };

  const stallBtn = () => {
    let stallCount = 0;
    for (var stalls of authContext.registeredStalls) {
      if (stalls.eventId === props.eventId) {
        stallCount = stalls.stallId.length;
      }
    }

    if (stallCount < 2) {
      return (
        <>
          {loading ? (
            <div disabled>Loading</div>
          ) : (
              <div
                className={[
                  'btn btn-success pl-2 pr-2',
                  btnclasses['btn-success'],
                ].join(' ')}
                onClick={registerStall}
              >
                Register Stall <span style={stallCountCSS}>{2 - stallCount}</span>
              </div>
            )}
        </>
      );
    } else {
      return (
        <div
          className={[
            'btn btn-danger pl-2 pr-2',
            btnclasses['btn-danger'],
          ].join(' ')}
        >
          Registered{' '}
          <span
            style={{
              ...stallCountCSS,
              color: 'black',
              backgroundColor: 'white',
            }}
          >
            0
          </span>{' '}
        </div>
      );
    }
  };

  const conferenceBtn = () => {
    let registered = false;
    for (var conference of authContext.registeredConferences) {
      if (conference.eventId === props.eventId) {
        registered = true;
      }
    }
    if (registered) {
      return (
        <div
          className={[
            'btn btn-danger pl-2 pr-2',
            btnclasses['btn-danger'],
          ].join(' ')}
        >
          Registered
        </div>
      );
    } else {
      return (
        <>
          {loading ? (
            <div disabled>Loading</div>
          ) : (
              <div
                className={[
                  'btn btn-success pl-2 pr-2',
                  btnclasses['btn-success'],
                ].join(' ')}
                onClick={registerConference}
              >
                Register Conference
              </div>
            )}
        </>
      );
    }
  };

  if (
    localStorage.getItem('token') &&
    localStorage.getItem('role') === 'Visitor'
  ) {
    return (
      <div>
        {authContext.registeredEvents.includes(props.eventId) || regEvent ? (
          <div
            className={[
              'btn btn-success pl-5 pr-5',
              btnclasses['btn-success'],
            ].join(' ')}
          >
            Registered
          </div>
        ) : (
            <div
              className={[
                'btn btn-success pl-2 pr-2',
                btnclasses['btn-success'],
              ].join(' ')}
            >
              {loading ? (
                <div className='btn-warning' disabled>
                  Loading
                </div>
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
      <div className={classes.registerButton}>
        {stallRedir && <Redirect to='/registerStall' />}
        {confRedir && <Redirect to='/registerConference' />}
        <div>{stallBtn()}</div>
        <div>{conferenceBtn()}</div>
      </div>
    );
  } else if (
    localStorage.getItem('token') &&
    localStorage.getItem('role') === 'Organizer'
  ) {
    return (
      <div className={classes.registerButton}>
        {isSubmit && <Redirect to='/' />}
        <div>
          <Link
            to='/admin/notifyUser'
            className={['btn btn-success', btnclasses['btn-success']].join(' ')}
          >
            Notify Users
          </Link>
        </div>
        {
          (new Date(eventContext.indivEvent.startDate).getTime() - Date.now() > 2 * 24 * 3600 * 1000) &&
          <div>
            {loading ? (
              <div
                className='btn btn-warning'
                style={{ width: '250px' }}
                disabled
              >
                Loading
              </div>
            ) : (
                <div
                  className={['btn btn-danger', btnclasses['btn-danger']].join(' ')}
                  onClick={deleteEvent}
                >
                  Delete Event
                </div>
              )}
          </div>
        }
      </div>
    );
  }
  return (
    <Link to='/login'>
      <div
        className={[
          'btn btn-success pl-5 pr-5',
          btnclasses['btn-success'],
        ].join(' ')}
      >
        Register
      </div>
    </Link>
  );
};

export default RegisterBtn;
