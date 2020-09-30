import React, { useContext, useState } from 'react';
import { Redirect, Link } from 'react-router-dom';
import swal from 'sweetalert';

import classes from '../Profile.module.css';
import btnclasses from '../../../Layout/button.module.css';

import AuthContext from '../../../context/auth/authContext';

const AddOrSwitch = () => {
  const profile = useContext(AuthContext);

  const [Redir, setRedir] = useState(false);
  const [loading, setLoading] = useState(false);

  let role = profile.role === 'Visitor' ? 'Exhibitor' : 'Visitor';

  const switchUser = () => {
    setLoading(true);
    localStorage.setItem('role', role);
    profile.updateUser({ role: role });
    swal('', `You switch to ${role}  succesfully`, 'success')
      .then((res) => {
        if (res) {
          setRedir(true);
          setLoading(false);
        }
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  if (profile.roles.length === 1) {
    return (
      <div className={classes.switch}>
        <Link to='/switchAccount'>
          <button
            type='button'
            className={[
              'btn btn-primary',
              btnclasses.next,
              btnclasses.link,
              btnclasses['btn-primary'],
            ].join(' ')}
            style={{ boxShadow: "3px 3px 3px rgba(0,0,0,0.50)" }}
          >
            Signup as {role}
          </button>
        </Link>
      </div>
    );
  } else {
    return (
      <div className={classes.switch}>
        {Redir && <Redirect to='/home' />}
        {
          loading ?
            <button
              type='button'
              className={[
                'btn btn-primary',
                btnclasses.next,
                btnclasses.link,
                btnclasses['btn-primary'],
              ].join(' ')}
              style={{ boxShadow: "3px 3px 3px rgba(0,0,0,0.50)" }}
            >
              Loading
            </button> :
            <button
              type='button'
              onClick={() => switchUser()}
              className={[
                'btn btn-primary',
                btnclasses.next,
                btnclasses.link,
                btnclasses['btn-primary'],
              ].join(' ')}
              style={{ boxShadow: "3px 3px 3px rgba(0,0,0,0.50)" }}

            >
              Switch to {role}
            </button>
        }
      </div>
    );
  }
};

export default AddOrSwitch;
