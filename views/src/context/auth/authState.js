import React, { useReducer } from 'react';
import AuthContext from './authContext';
import AuthReducer from './authReducer';

import axios from 'axios';
import url from '../../server';

import {
  UPDATE_USER,
  AUTHENTICATE,
  LOGOUT,
  FORGET_PASSWORD,
  PROFILE_LOADING
} from '../types';

const AuthState = (props) => {
  const initialState = {
    userId: '',
    username: '',
    password: '',
    email: '',
    role: '',
    roles: [],
    image: '',
    firstname: '',
    lastname: '',
    state: '',
    country: '',
    zipcode: '',
    city: '',
    dob: '',
    gender: '',
    destination: '',
    areasOfInterest: [],
    company: '',
    contact: '',
    address: '',
    token: '',
    otp: '',
    registeredEvents: [],
    registeredStalls: [],
    visitedStalls: [],
    visitorConferences: [],
    registeredConferences: [],
    profileLoading: false,
  };

  const [state, dispatch] = useReducer(AuthReducer, initialState);

  const getProfile = () => {
    dispatch({ type: PROFILE_LOADING });
    const profileUrl = url + 'user/getProfile';

    const config = {
      headers: {
        'x-auth-token': localStorage.getItem('token'),
      },
    };
    axios
      .get(profileUrl, config)
      .then((response) => {
        response.data.token = localStorage.getItem('token');
        authentication(response);
      })
      .catch((err) => {
        logout();
      });
  };

  const updateUser = (userData) => {
    dispatch({ type: UPDATE_USER, payload: userData });
  };

  const forgetPassword = (data) => {
    dispatch({ type: FORGET_PASSWORD, payload: data });
  };

  const logout = () => {
    dispatch({ type: LOGOUT, payload: initialState });
  };

  const authentication = (response) => {
    let user;
    if (response.data.user.role.includes('Organizer')) {
      user = {
        userId: response.data.user._id,
        username: response.data.user.userName,
        password: response.data.user.password,
        email: response.data.user.emailId,
        role: localStorage.getItem('role'),
        roles: response.data.user.role,
      };
    } else {
      user = {
        userId: response.data.user._id,
        username: response.data.user.userName,
        password: response.data.user.password,
        email: response.data.user.emailId,
        role: localStorage.getItem('role'),
        roles: response.data.user.role,
        image: response.data.profile.image,
        firstname: response.data.profile.firstName,
        lastname: response.data.profile.lastName,
        state: response.data.profile.state,
        country: response.data.profile.country,
        zipcode: response.data.profile.zipCode,
        city: response.data.profile.cityName,
        dob: response.data.profile.dateOfBirth,
        gender: response.data.profile.gender,
        destination: response.data.profile.designation,
        areasOfInterest: response.data.profile.areaOfInterest,
        company: response.data.profile.companyName,
        contact: response.data.profile.contactNumber,
        address: response.data.profile.companyAddress,
        registeredEvents: response.data.profile.registeredEvents,
        registeredStalls: response.data.profile.registeredStalls,
        visitedStalls: response.data.profile.visitedStalls,
        visitorConferences: response.data.profile.visitorConferences,
        registeredConferences: response.data.profile.registeredConferences,
      };
    }

    dispatch({
      type: AUTHENTICATE,
      payload: { token: response.data.token, user: user },
    });
  };

  return (
    <AuthContext.Provider
      value={{
        userId: state.userId,
        username: state.username,
        email: state.email,
        password: state.password,
        role: state.role,
        roles: state.roles,
        image: state.image,
        firstname: state.firstname,
        lastname: state.lastname,
        state: state.state,
        country: state.country,
        zipcode: state.zipcode,
        city: state.city,
        dob: state.dob,
        gender: state.gender,
        destination: state.destination,
        areasOfInterest: state.areasOfInterest,
        company: state.company,
        contact: state.contact,
        address: state.address,
        token: state.token,
        registeredStalls: state.registeredStalls,
        registeredEvents: state.registeredEvents,
        visitedStalls: state.visitedStalls,
        visitorConferences: state.visitorConferences,
        registeredConferences: state.registeredConferences,
        profileLoading: state.profileLoading,
        updateUser,
        getProfile,
        authentication,
        logout,
        forgetPassword,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
