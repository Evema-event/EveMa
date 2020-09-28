import React from 'react';
import { Link } from 'react-router-dom';

import AddOrSwitch from '../AddOrSwitch/AddOrSwitch';
import classes from '../Profile.module.css';
import btnclasses from '../../../Layout/button.module.css';

const ChangePassword = () => {
  return (
    <>
      <div className={classes.grid}>
        <div className={classes.center}>
          <Link to='/changePassword'>
            <button
              style={{ width: '250px' }}
              className={[
                'btn btn-primary',
                btnclasses.next,
                btnclasses.link,
                btnclasses['btn-primary'],
              ].join(' ')}
            >
              Change Password
            </button>
          </Link>
        </div>
        <AddOrSwitch />
      </div>
    </>
  );
};

export default ChangePassword;
