import React, { useContext, useState } from 'react';
import { Redirect, Link } from 'react-router-dom';

import classes from '../Profile.module.css';
import btnclasses from '../../../Layout/button.module.css';

import AuthContext from '../../../context/auth/authContext';

const AddOrSwitch = () => {
  const profile = useContext(AuthContext);

  const [Redir, setRedir] = useState(false);

  let role = profile.role === 'Visitor' ? 'Exhibitor' : 'Visitor';

  const switchUser = () => {
    localStorage.setItem('role', role);
    profile.updateUser({ role: role });
    setRedir(true);
  };

  if (profile.roles.length === 1) {
    return (
      <div className={classes.switch}>
        <Link to='/switchAccount'>
          <button
            type='button'
            className={[
              'btn btn-primary btn-block',
              btnclasses.next,
              btnclasses.link,
              btnclasses['btn-primary'],
            ].join(' ')}
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
        <button
          type='button'
          onClick={() => switchUser()}
          className={[
            'btn btn-primary btn-block',
            btnclasses.next,
            btnclasses.link,
            btnclasses['btn-primary'],
          ].join(' ')}
        >
          Switch to {role}
        </button>
      </div>
    );
  }
};

export default AddOrSwitch;
