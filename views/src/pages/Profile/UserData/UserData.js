import React, { useContext, useState } from 'react';
import { Redirect } from 'react-router-dom';
import swal from 'sweetalert';

import classes from '../Profile.module.css';

import url, { fileUrl } from '../../../server';
import axios from 'axios';

import AuthContext from '../../../context/auth/authContext';

const UserData = () => {
  const profile = useContext(AuthContext);

  const [image, setImage] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [err, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const onUploadPicture = (event) => {
    if (event.target.files.length !== 0) {
      if (event.target.files[0].size < 1000000) {
        setError('');
        setImage(event.target.files[0]);
        let reader = new FileReader();
        reader.onload = () => {
          setImageUrl(reader.result);
        };
        reader.readAsDataURL(event.target.files[0]);
      } else {
        setError('Please upload an image smaller than 1MB');
      }
    } else {
      setImage('');
      setImageUrl('');
    }
  };

  const uploadImage = () => {
    if (image === '') {
      setError('Please upload an image');
    } else {
      const config = {
        headers: {
          'content-type': 'multipart/form-data',
          'x-auth-token': localStorage.getItem('token'),
        },
      };
      const formData = new FormData();
      formData.append('file', image);
      setIsLoading(true);
      axios
        .put(url + '/user/updateProfileImage', formData, config)
        .then((res) => {
          profile.updateUser({ image: res.data.profile.image });
          setIsLoading(false);
          setImage('');
          setImageUrl('');
          swal('Success', 'Profile image uploaded', 'success');
        })
        .catch((err) => {
          setIsLoading(false);
          swal('Failed', 'Try again', 'error');
        });
    }
  };

  return (
    <div className={classes.division}>
      {!localStorage.getItem('token') && <Redirect to='/' />}
      {profile.role === 'Organizer' && <Redirect to='/' />}
      <div className={classes.header}>
        <div className={classes.info}>
          <h5 className={classes.head}>Username</h5>
          <p className={classes.body}>{profile.username}</p>
        </div>
        <div className={classes.info}>
          <h5 className={classes.head}>Email</h5>
          <p className={classes.body}>{profile.email}</p>
        </div>
      </div>
      <div className={classes.image}>
        <img
          src={imageUrl === '' ? fileUrl + profile.image : imageUrl}
          alt='Profile'
        ></img>
        <div className={classes.file}>
          <input
            type='file'
            className={classes.fileInput}
            accept='image/*'
            name='file'
            id='profile'
            onChange={onUploadPicture}
          />
          {imageUrl === '' ? (
            <label
              className={classes.fileButton}
              htmlFor='profile'
              datatitle='Upload'
            >
              <i className='fa fa-upload'></i>{' '}
            </label>
          ) : isLoading ? (
            <button className={classes.fileButton} type='button'>
              ...
            </button>
          ) : (
            <button
              className={classes.fileButton}
              dataTitle='Save'
              type='button'
              onClick={uploadImage}
            >
              <i className='fa fa-save'></i>
            </button>
          )}
        </div>
        <p>{err}</p>
      </div>
    </div>
  );
};

export default UserData;
