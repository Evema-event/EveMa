import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';

import img from '../../img/picture.jpeg';
import classes from '../Profile/Profile.module.css';

import AuthContext from '../../context/auth/authContext';

const Profile = () => {
  const profile = useContext(AuthContext);

  return (
    <div className={classes.heads}>
      {!localStorage.getItem('token') && profile.role !== 'Organizer' && (
        <Redirect to='/' />
      )}
      <h4 className={classes.profile}>Profile</h4>
      <div className={classes.main}>
        <div className={classes.user}>
          <div className={classes.division}>
            <div className={classes.header}>
              <div className={classes.info}>
                <h5 className={classes.head}>Username</h5>
                <p className={classes.body}>{profile.username}</p>
              </div>
              <div className={classes.info}>
                <h5 className={classes.head}>Email</h5>
                <p className={classes.body}>{profile.email}</p>
              </div>
              <div className={classes.info}>
                <h5 className={classes.head}>Contact</h5>
                <p className={classes.body}>{profile.contact}</p>
              </div>
            </div>
            <div className={classes.image}>
              <img src={img} alt='Profile'></img>
              <h5 className={classes.picture}>{profile.role}</h5>
            </div>
          </div>

          <div className={classes.part}>
            <div className={classes.info}>
              <h5 className={classes.head}>FirstName</h5>
              <p className={classes.body}>{profile.firstname}</p>
            </div>
            <div className={classes.info}>
              <h5 className={classes.head}>LastName</h5>
              <p className={classes.body}>{profile.lastname}</p>
            </div>
            <div className={classes.info}>
              <h5 className={classes.head}>Date of Birth</h5>
              <p className={classes.body}>{profile.dob.slice(0, 10)}</p>
            </div>
            <div className={classes.info}>
              <h5 className={classes.head}>Gender</h5>
              <p className={classes.body}>{profile.gender}</p>
            </div>
            <div className={classes.info}>
              <h5 className={classes.head}>Areas of Interest</h5>
              <p className={classes.body}>{profile.areasOfInterest}</p>
            </div>
            <div className={classes.info}>
              <h5 className={classes.head}>Designation</h5>
              <p className={classes.body}>{profile.destination}</p>
            </div>
            <div className={classes.info}>
              <h5 className={classes.head}>Company</h5>
              <p className={classes.body}>{profile.company}</p>
            </div>
            <div className={classes.info}>
              <h5 className={classes.head}>City</h5>
              <p className={classes.body}>{profile.city}</p>
            </div>
            <div className={classes.info}>
              <h5 className={classes.head}>State</h5>
              <p className={classes.body}>{profile.state}</p>
            </div>
            <div className={classes.info}>
              <h5 className={classes.head}>Country</h5>
              <p className={classes.body}>{profile.country}</p>
            </div>
            <div className={classes.info}>
              <h5 className={classes.head}>Company Address</h5>
              <p className={classes.body}>{profile.address}</p>
            </div>
            <div className={classes.info}>
              <h5 className={classes.head}>Zipcode</h5>
              <p className={classes.body}>{profile.zipcode}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
