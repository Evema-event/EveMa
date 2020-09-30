import React, { useState, useContext } from 'react';
import { Redirect, Link } from 'react-router-dom';
import swal from 'sweetalert';

import url from '../server';
import axios from 'axios';

import AuthContext from '../context/auth/authContext';
import EventContext from '../context/event/eventContext';
import StallContext from '../context/stall/stallContext';
import btnclasses from './button.module.css';

const ExhibitorBtn = (props) => {
  const authContext = useContext(AuthContext);
  const eventContext = useContext(EventContext);
  const stallContext = useContext(StallContext);

  const [deleteStallRedir, setDeleteStallRedir] = useState(false);
  const [loading, setLoading] = useState(false);

  const deleteStall = () => {
    let configuration = {
      headers: {
        'x-auth-token': localStorage.getItem('token'),
      },
    };

    let delStallUrl = url + `stall/deleteStall/${props.stallId}`;
    swal({
      title: 'Are you sure?',
      text: 'You are about to delete a stall!',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then((res) => {
      if (res) {
        setLoading(true);
        axios
          .delete(delStallUrl, configuration)
          .then((res) => {
            if (res.data.message === 'Success') {
              eventContext.indivEvent.registeredStalls.pop(res.data.stall._id);
              eventContext.setIndividualEvent(eventContext.indivEvent, true);
              stallContext.getStalls(eventContext.indivEvent._id);
              authContext.getProfile();
              setLoading(false);
              swal('Stall deleted successfully')
                .then((res) => {
                  setDeleteStallRedir(true);
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

  if (
    localStorage.getItem('token') &&
    localStorage.getItem('role') === 'Exhibitor' &&
    props.user === authContext.userId
  ) {
    return (
      <>
        {deleteStallRedir && <Redirect to='/eventDetails' />}

        <Link
          className={['btn btn-success', btnclasses['btn-success']].join(' ')}
          to='/addStallDetails'
          style={{
            textAlign: 'center',
            margin: '10px',
          }}
        >
          <div>Add More Information</div>
        </Link>
        {
          (new Date(eventContext.indivEvent.startDate).getTime() - Date.now() > 2 * 24 * 3600 * 1000) &&
          <div
            className={['btn btn-danger', btnclasses['btn-danger']].join(' ')}
            onClick={deleteStall}
          >
            {loading ? 'Loading' : 'Delete Stall'}
          </div>
        }
      </>
    );
  }
  return <></>;
};

export default ExhibitorBtn;
