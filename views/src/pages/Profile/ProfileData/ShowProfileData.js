import React, { useContext } from 'react';

import classes from '../Profile.module.css';

import AuthContext from '../../../context/auth/authContext';


const ShowProfileData = (props) => {
    const profile = useContext(AuthContext);

    return (
        <div className={classes.part}>
            <div className={[classes.info, classes.extend].join(' ')}>
                <h3 style={{ display: "inline-block", marginRight: "12px", verticalAlign: "middle" }}>Personal and professional data</h3>
                <button className={classes.Button} style={{ background: "green" }}
                    onClick={props.toggleEdit}>Edit</button>
            </div>
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
                <h5 className={classes.head}>Zipcode</h5>
                <p className={classes.body}>{profile.zipcode}</p>
            </div>
            <div className={classes.info}>
                <h5 className={classes.head}>Contact</h5>
                <p className={classes.body}>{profile.contact}</p>
            </div>
            <div className={classes.info}>
                <h5 className={classes.head}>Company</h5>
                <p className={classes.body}>{profile.company}</p>
            </div>
            <div className={[classes.info, classes.extend].join(' ')}>
                <h5 className={classes.head}>Company Address</h5>
                <p className={classes.body}>{profile.address}</p>
            </div>
        </div>
    );
};

export default ShowProfileData;
