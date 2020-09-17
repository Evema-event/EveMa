import React, { useState } from 'react';

import classes from './Profile.module.css';

import UserData from './UserData/UserData';
import ShowProfileData from './ProfileData/ShowProfileData';
import UpdateProfileData from './ProfileData/UpdateProfileData';
import AddOrSwitch from './AddOrSwitch/AddOrSwitch';

const Profile = () => {
  const [isEdit, setIsEdit] = useState(false);

  const toggleEdit = () => {
    setIsEdit(!isEdit);
  }

  return (
    <div className={classes.section}>
      <div className={classes.heads}>
        <h4 className={classes.profile}>Profile</h4>
        <div className={classes.main}>
          <div className={classes.user}>
            <UserData />
            {isEdit ? <UpdateProfileData toggleEdit={toggleEdit} /> : <ShowProfileData toggleEdit={toggleEdit} />}
          </div>
        </div>
        <AddOrSwitch />
      </div>
    </div>
  );
};

export default Profile;
