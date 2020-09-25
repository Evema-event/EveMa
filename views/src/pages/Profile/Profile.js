import React, { useState } from 'react';

import classes from './Profile.module.css';

import UserData from './UserData/UserData';
import ShowProfileData from './ProfileData/ShowProfileData';
import UpdateProfileData from './ProfileData/UpdateProfileData';
import AddOrSwitch from './AddOrSwitch/AddOrSwitch';
import { Link } from 'react-router-dom';

const Profile = () => {
  const [isEdit, setIsEdit] = useState(false);

  const toggleEdit = () => {
    setIsEdit(!isEdit);
  };

  return (
    <div className={classes.section}>
      <div className={classes.heads}>
        <h4 className={classes.profile}>{localStorage.getItem('role')}</h4>
        <div className={classes.main}>
          <div className={classes.user}>
            <UserData />
            {isEdit ? (
              <UpdateProfileData toggleEdit={toggleEdit} />
            ) : (
              <ShowProfileData toggleEdit={toggleEdit} />
            )}
          </div>
        </div>
        <div className={classes.grid}>
          <div className={classes.center}>
            <Link to='/changePassword'>
              <button
                style={{ width: '250px' }}
                className={[
                  'btn btn-primary',
                  classes.next,
                  classes.link,
                  classes['btn-primary'],
                ].join(' ')}
              >
                Change Password
              </button>
            </Link>
          </div>
          <AddOrSwitch />
        </div>
      </div>
    </div>
  );
};

export default Profile;
