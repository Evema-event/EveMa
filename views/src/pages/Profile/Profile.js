import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';

import classes from './Profile.module.css';
import btnclasses from '../../Layout/button.module.css';

import Loading from '../../Layout/Loading';

import UserData from './UserData/UserData';
import AddOrSwitch from './AddOrSwitch/AddOrSwitch';
import ShowProfileData from './ProfileData/ShowProfileData';
import UpdateProfileData from './ProfileData/UpdateProfileData';

import AuthContext from '../../context/auth/authContext';

const Profile = () => {
  const authContext = useContext(AuthContext);

  const [isEdit, setIsEdit] = useState(false);

  const toggleEdit = () => {
    setIsEdit(!isEdit);
  };

  if (authContext.profileLoading) {
    return (
      <div className={classes.section}>
        <div className={classes.heads}>
          <h4 className={classes.profile}>{localStorage.getItem('role')}</h4>
          <center style={{ padding: '100px' }}>
            <Loading color='light'></Loading>
          </center>
        </div>
      </div>
    );
  }

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
      </div>
    </div>
  );
};

export default Profile;
