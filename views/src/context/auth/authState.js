import React, { useReducer } from 'react';
import AuthContext from './authContext';
import AuthReducer from './authReducer';

import { UPDATE_USER, AUTHENTICATE, LOGOUT, FORGET_PASSWORD } from '../types';

const AuthState = (props) => {
  const initialState = {
    usedId: '',
    username: '',
    password: '',
    email: '',
    role: '',
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
  };

  const [state, dispatch] = useReducer(AuthReducer, initialState);

  const updateUser = (userData) => {
    dispatch({ type: UPDATE_USER, payload: userData });
  };

  const forgetPassword = (data) => {
    console.log(data);
    dispatch({ type: FORGET_PASSWORD, payload: data });
  };

  const logout = () => {
    dispatch({ type: LOGOUT, payload: initialState });
  };

  const authentication = (response) => {
    let user;
    if (response.data.user.role == 'Organizer') {
      user = {
        userId: response.data.user._id,
        username: response.data.user.userName,
        password: response.data.user.password,
        email: response.data.user.emailId,
        role: '',
      };
    } else {
      user = {
        userId: response.data.user._id,
        username: response.data.user.userName,
        password: response.data.user.password,
        email: response.data.user.emailId,
        role: '',
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
      };
    }
    if (response.data.user.role.length === 1) {
      user.role = response.data.user.role[0];
    } else {
      user.role = 'Exhibitor';
    }
    localStorage.setItem('role', user.role);
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
        updateUser,
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
