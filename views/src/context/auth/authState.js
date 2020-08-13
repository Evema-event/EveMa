import React, { useReducer } from 'react';
import AuthContext from './authContext';
import AuthReducer from './authReducer';

import { UPDATE_USER, AUTHENTICATE, LOGOUT } from '../types';

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
  };

  const [state, dispatch] = useReducer(AuthReducer, initialState);

  const updateUser = (userData) => {
    dispatch({ type: UPDATE_USER, payload: userData });
  };

  const logout = () => {
    dispatch({ type: LOGOUT });
  };

  const authentication = (response) => {
    const user = {
      usedId: response.data.user._id,
      username: response.data.user.userName,
      password: response.data.user.password,
      email: response.data.user.emailId,
      firstname: response.data.user.firstName,
      lastname: response.data.user.lastName,
      state: response.data.user.state,
      country: response.data.user.country,
      zipcode: response.data.user.zipCode,
      city: response.data.user.cityName,
      dob: response.data.user.dateOfBirth,
      gender: response.data.user.gender,
      destination: response.data.user.designation,
      areasOfInterest: response.data.user.areaOfInterest,
      company: response.data.user.companyName,
      contact: response.data.user.contactNumber,
      address: response.data.user.companyAddress,
    };
    dispatch({
      type: AUTHENTICATE,
      payload: { token: response.data.token, user: user },
    });
  };

  return (
    <AuthContext.Provider
      value={{
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
        updateUser,
        authentication,
        logout,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
