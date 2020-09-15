import React, { useContext, useState } from 'react';
import { Redirect, Link } from 'react-router-dom';

import classes from '../Profile/Profile.module.css';

import { fileUrl } from '../../server';

import AuthContext from '../../context/auth/authContext';

const Profile = () => {
  const profile = useContext(AuthContext);
  const [image, setImage] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [err, setError] = useState('');
  
  const onUploadPicture = (event)=>{
    if(event.target.files.length !== 0){
     if(event.target.files[0].size < 1000000){
      setError('');
      setImage(event.target.files[0]);
      let reader = new FileReader();
     reader.onload = ()=>{
       setImageUrl(reader.result);
     }
     reader.readAsDataURL(event.target.files[0]);
   }
   else{
     setError('Please upload an image smaller than 1MB');
   }
  }
  
   else{
    setImage(''); 
    setImageUrl('');
   }
  }

  const uploadImage = () => {
    if(image === ''){
      setError('Please upload an image');
    }
    else{
    const config = {
      headers: {
          'content-type': 'multipart/form-data',
          'x-auth-token': localStorage.getItem('token')
      }
    }
    const formData = new FormData();
    formData.append('file', image);
    console.log(formData,config);
  }
 }
  const addOrSwitch = () => {
    if (profile.roles.length === 1) {
      return (
        <div className={classes.switch}>
          <Link to='/switchAccount'>
            <button
              type="button"
              className={['btn btn-primary btn-block', classes.next, classes.link, classes['btn-primary']].join(' ')}
            >
              Signup as {profile.role === 'Visitor' ? 'Exhibitor' : 'Visitor'}
            </button>
          </Link>
        </div>)
    } else {
      return (
        <div className={classes.switch}>
          <button
            type="button"
            className={['btn btn-primary btn-block', classes.next, classes.link, classes['btn-primary']].join(' ')}
          >
            Switch as {profile.role === 'Visitor' ? 'Exhibitor' : 'Visitor'}
          </button>
        </div>)
    }

  }
  return (
    <div className={classes.section}>
      <div className={classes.heads}>
        {!localStorage.getItem('token') && (
          <Redirect to='/' />
        )}
        {profile.role === 'Organizer' && (
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
              <div>
              <div className={classes.image}>
                <img src={imageUrl===''? (fileUrl + profile.image): imageUrl} alt='Profile'></img>  
              </div>
                    <input type="file" className={classes["custom-file-input"]}  accept='image/*' name='File' onChange={onUploadPicture}/>
                    <button className="btn btn-outline-secondary" type="button" onClick={uploadImage}>Save</button>
                 <p>{err}</p>
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
        {addOrSwitch()}
      </div>
    </div>
  );
};

export default Profile;
