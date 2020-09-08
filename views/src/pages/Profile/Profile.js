import React from 'react'

import img from '../../img/picture.jpeg';
import classes from '../Profile/Profile.module.css'
const Profile = () => {
    return (
        <div className={classes.start}>
            <h4 className={classes.profile}>Profile</h4>
            <div className={classes.main}>
                
                <div className={classes.user}>
            <div className={classes.division}>

                <div className={classes.header}>
                    <div className={classes.info}>
                        <h5 className={classes.head}>Username</h5>
                        <p className={classes.body}>Poovarasan</p>
                    </div>
                    <div className={classes.info}>
                        <h5 className={classes.head}>Email</h5>
                        <p className={classes.body}>Poovarasan.17it@kct.ac.in</p>
                    </div>
                    <div className={classes.info}>
                        <h5 className={classes.head}>Contact</h5>
                        <p className={classes.body}>9876543210</p>
                    </div>
                </div> 
                <div className={classes.image}>
                    <img src={img}></img>
                    <h5 className={classes.picture}>Visitor</h5>
                </div>
            </div>    
            <div className={classes.part}>  
            
            <div className={classes.info}>
                <h5 className={classes.head}>FirstName</h5>
                <p className={classes.body}>Poovarasan</p>
            </div>
            <div className={classes.info}>
                <h5 className={classes.head}>LastName</h5>
                <p className={classes.body}>P</p>
            </div>
            <div className={classes.info}>
                <h5 className={classes.head}>Date of Birth</h5>
                <p className={classes.body}>10/10/1999</p>
            </div>
            <div className={classes.info}>
                <h5 className={classes.head}>Gender</h5>
                <p className={classes.body}>Male</p>
            </div>
            <div className={classes.info}>
                <h5 className={classes.head}>Areas of Interest</h5>
                <p className={classes.body}>IOT</p>
            </div>
            <div className={classes.info}>
                <h5 className={classes.head}>Designation</h5>
                <p className={classes.body}>student</p>
            </div>
            <div className={classes.info}>
                <h5 className={classes.head}>company</h5>
                <p className={classes.body}>Forge</p>
            </div>
            <div className={classes.info}>
                <h5 className={classes.head}>City</h5>
                <p className={classes.body}>Namakkal</p>
            </div>
            <div className={classes.info}>
                <h5 className={classes.head}>State</h5>
                <p className={classes.body}>Tamilnadu</p>
            </div>
            <div className={classes.info}>
                <h5 className={classes.head}>Country</h5>
                <p className={classes.body}>India</p>
            </div>
            <div className={classes.info}>
                <h5 className={classes.head}>Company Address</h5>
                <p className={classes.body}>KCT TECH PARK</p>
            </div>
            <div className={classes.info}>
                <h5 className={classes.head}>Zipcode</h5>
                <p className={classes.body}>637041</p>
            </div>
        </div>
        </div>
        

        </div>
    </div>
    )
}

export default Profile
