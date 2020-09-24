import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import AuthContext from '../context/auth/authContext';
import ConferenceContext from '../context/conference/conferenceContext';

const ConferenceTab = (props) => {
    const authContext = useContext(AuthContext);
    const { individualConference } = useContext(ConferenceContext);
    return (
        <ul className="nav nav-tabs" style={{ margin: "10px 50px 0px 50px" }}>
            <li className="nav-item">
                <Link className={props.tab === "conference" ? "nav-link active" : "nav-link"} to='/conferenceDetails'>Conference Details</Link>
            </li>
            {
                (localStorage.getItem('role') === 'Organizer' || (localStorage.getItem('role') === 'Exhibitor' && individualConference?.userId._id === authContext.userId)) &&
                <li className="nav-item">
                    <Link to='/conferencevisitorList' className={props.tab === "visitor" ? "nav-link active" : "nav-link"}>
                        Visitors
                </Link>
                </li>
            }
        </ul >
    );
};
 
export default ConferenceTab;