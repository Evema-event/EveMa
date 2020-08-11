import React, { useReducer } from 'react';
import axios from 'axios';
import AuthReducer from './AuthReducer';
import AuthContext from './AuthContext';
import { SIGN_UP_0 } from '../types';
import url from '../../server';

const AuthState = () => {
  const initialState = {
    signUpOne: [{}],
  };

  return <div></div>;
};

export default AuthState;
