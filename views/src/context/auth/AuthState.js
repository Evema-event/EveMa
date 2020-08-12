import React, { useReducer } from 'react';
import AuthContext from './authContext';
import AuthReducer from './authReducer';

const AuthState = (props) => {
    const initialState = {
        username: '',
        rollno: ''
    };

    const [state, dispatch] = useReducer(AuthReducer, initialState);

    const changeUsername = (value) => {
        dispatch({ type: 'CHANGE_USERNAME', value: value });
    }

    return <AuthContext.Provider
        value={{
            username: state.username,
            rollno: state.rollno,
            changeUsername
        }}
    >
        {props.children}
    </AuthContext.Provider>
}

export default AuthState;