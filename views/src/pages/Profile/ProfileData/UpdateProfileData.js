import React, { useContext } from 'react';

import classes from '../Profile.module.css';

import AuthContext from '../../../context/auth/authContext';


const UpdateProfileData = (props) => {
    const profile = useContext(AuthContext);

    return (
        <form className={classes.part}>
            <div className={[classes.info, classes.extend].join(' ')}>
                <h3 style={{ display: "inline-block", marginRight: "5px", verticalAlign: "middle" }}>Personal and professional data</h3>
                <button className={classes.fileButton}
                    onClick={props.toggleEdit}>Cancel</button>
                <button type="submit" className={classes.fileButton} style={{ background: "green" }}>Save</button>
            </div>
            <div className={classes.info}>
                <h5 className={classes.head}>FirstName</h5>
                <input type="text" required className={classes.body} value={profile.firstname} />
            </div>
            <div className={classes.info}>
                <h5 className={classes.head}>LastName</h5>
                <input type="text" required className={classes.body} value={profile.lastname} />
            </div>
            <div className={classes.info}>
                <h5 className={classes.head}>Date of Birth</h5>
                <input type="date" required className={classes.body} value={profile.dob.slice(0, 10)} />
            </div>
            <div className={classes.info}>
                <h5 className={classes.head}>Gender</h5>
                <select className={classes.body} value={profile.gender}>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Others">Others</option>
                </select>
            </div>
            <div className={classes.info}>
                <h5 className={classes.head}>Areas of Interest</h5>
                <input type="text" required className={classes.body} value={profile.areasOfInterest} />
            </div>
            <div className={classes.info}>
                <h5 className={classes.head}>Designation</h5>
                <input type="text" required className={classes.body} value={profile.destination} />
            </div>
            <div className={classes.info}>
                <h5 className={classes.head}>City</h5>
                <input type="text" required className={classes.body} value={profile.city} />
            </div>
            <div className={classes.info}>
                <h5 className={classes.head}>State</h5>
                <input type="text" required className={classes.body} value={profile.state} />
            </div>
            <div className={classes.info}>
                <h5 className={classes.head}>Country</h5>
                <input type="text" required className={classes.body} value={profile.country} />
            </div>
            <div className={classes.info}>
                <h5 className={classes.head}>Zipcode</h5>
                <input type="text" required className={classes.body} value={profile.zipcode} />
            </div>
            <div className={classes.info}>
                <h5 className={classes.head}>Contact</h5>
                <input type="text" required className={classes.body} value={profile.contact} />
            </div>
            <div className={classes.info}>
                <h5 className={classes.head}>Company</h5>
                <input type="text" required className={classes.body} value={profile.company} />
            </div>
            <div className={[classes.info, classes.extend].join(' ')}>
                <h5 className={classes.head}>Company Address</h5>
                <input type="text" required className={classes.body} value={profile.address} />
            </div>
        </form>
    );
};

export default UpdateProfileData;
