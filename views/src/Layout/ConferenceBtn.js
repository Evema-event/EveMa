import React, { useState, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import swal from 'sweetalert';
import btnclasses from './button.module.css';

import url from '../server';
import axios from 'axios';

import AuthContext from '../context/auth/authContext';
import EventContext from '../context/event/eventContext';
import ConferenceContext from '../context/conference/conferenceContext';

const ConferenceBtn = (props) => {
  const authContext = useContext(AuthContext);
  const eventContext = useContext(EventContext);
  const conferenceContext = useContext(ConferenceContext);

  const [deleteConfRedir, setDeleteConfRedir] = useState(false);
  const [loading, setLoading] = useState(false);

  const deleteConference = () => {
    let configuration = {
      headers: {
        'x-auth-token': localStorage.getItem('token'),
      },
    };
    let delConfUrl = url + `conference/deleteConference/${props.confId}`;
    swal({
      title: 'Are you sure?',
      text: 'You are about to delete a Conference!',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then((res) => {
      if (res) {
        setLoading(true);
        axios
          .delete(delConfUrl, configuration)
          .then((res) => {
            if (res.data.message === 'Success') {
              conferenceContext.getConferences(eventContext.indivEvent._id);
              authContext.getProfile();
              setLoading(false);
              swal('Conference deleted successfully')
                .then((res) => {
                  setDeleteConfRedir(true);
                })
                .catch((err) => {
                  throw err;
                });
            }
          })
          .catch((err) => {
            setLoading(false);
          });
      }
    });
  };

  const onRegisterConf = () => {
    let data = {};
    let config = {
      headers: {
        'x-auth-token': localStorage.getItem('token'),
      },
    };
    let registerUrl = url + `conference/visitorConference/${props.confId}`;
    setLoading(true);
    axios
      .put(registerUrl, data, config)
      .then((res) => {
        authContext.getProfile();
        swal('Congrats', 'Conference registered Successfully', 'success');
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  if (
    localStorage.getItem('token') &&
    localStorage.getItem('role') === 'Exhibitor' &&
    props.user === authContext.userId &&
    (new Date(eventContext.indivEvent.startDate).getTime() - Date.now() > 2 * 24 * 3600 * 1000)
  ) {
    return (
      <>
        {deleteConfRedir && <Redirect to='/eventDetails' />}
        <div
          className={['btn btn-danger', btnclasses['btn-danger']].join(' ')}
          onClick={deleteConference}
        >
          {loading ? 'Loading' : 'Delete Conference'}
        </div>
      </>
    );
  } else if (
    localStorage.getItem('token') &&
    localStorage.getItem('role') === 'Visitor' &&
    props.user !== authContext.userId
  ) {
    if (authContext.visitorConferences.includes(props.confId)) {
      return (
        <button
          className={['btn btn-success', btnclasses['btn-success']].join(' ')}
        >
          Registered
        </button>
      );
    } else if (props.limit > 0) {
      if (loading) {
        return (
          <button
            className={['btn btn-success', btnclasses['btn-success']].join(' ')}
          >
            Loading
          </button>
        );
      } else {
        return (
          <button
            className={['btn btn-success', btnclasses['btn-success']].join(' ')}
            onClick={onRegisterConf}
          >
            Register
          </button>
        );
      }
    } else {
      return (
        <button className='btn btn-danger' style={{ width: '200px' }}>
          House full
        </button>
      );
    }
  }
  return <></>;
};

export default ConferenceBtn;
