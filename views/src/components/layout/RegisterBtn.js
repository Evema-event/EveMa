import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import url from '../../server';
import axios from 'axios';
import swal from 'sweetalert';

const RegisterBtn = (props) => {
  const [loading, setLoading] = useState(false);

  const registerEvent = () => {
    let config = {
      headers: {
        'x-auth-token': localStorage.getItem('token'),
      },
    };

    let data = {};

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

  if (
    localStorage.getItem('token') &&
    localStorage.getItem('role') === 'Visitor'
  ) {
    return (
      <div>
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
        {loading ? (
          <button disabled>Loading</button>
        ) : (
          <button>Register Stall</button>
        )}
        {loading ? (
          <button disabled>Loading</button>
        ) : (
          <button>Register Conference</button>
        )}
      </div>
    );
  }
  return (
    <div>
      <Link to='/login'>Register</Link>
    </div>
  );
};

export default RegisterBtn;
