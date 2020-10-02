import React, { useState, useContext, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';

import classes from './tab.module.css';

import AuthContext from '../context/auth/authContext'
import EventContext from '../context/event/eventContext'

const EventTab = (props) => {

    const { registeredEvents } = useContext(AuthContext)
    const { indivEvent } = useContext(EventContext)

    const [redirectStall, setRedirectStall] = React.useState(false);
    const [redirectConference, setRedirectConference] = React.useState(false);

    const [styleClass, setStyleClass] = useState([]);

    useEffect(() => {
        if (localStorage.getItem('token')) {
            if (localStorage.getItem('role') === 'Visitor' && !registeredEvents.includes(indivEvent._id)) {
                setStyleClass([classes.Disabled, classes.DisabledRegister]);
                console.log("Called");
            }
        } else {
            setStyleClass([classes.Disabled, classes.DisabledLogin]);
            console.log("Called 1")
        }
    }, [registeredEvents, indivEvent]);

    const onClickStall = () => {
        if (localStorage.getItem('token') && !(localStorage.getItem('role') === 'Visitor' && !registeredEvents.includes(indivEvent._id))) {
            setRedirectStall(true);
        }
    }

    const onClickConference = () => {
        if (localStorage.getItem('token') && !(localStorage.getItem('role') === 'Visitor' && !registeredEvents.includes(indivEvent._id))) {
            setRedirectConference(true);
        }
    }
    return (
        <ul className="nav nav-tabs" style={{ margin: "10px 50px 0px 50px" }}>
            {redirectStall && <Redirect to='/stallList'></Redirect>}
            {redirectConference && <Redirect to='/conferenceList'></Redirect>}
            <li className="nav-item">
                <Link className={props.tab === "event" ? "nav-link active" : "nav-link"} to='/eventdetails'>Event Details</Link>
            </li>
            <li className="nav-item">
                <Link className={[props.tab === "stall" ? "nav-link active" : "nav-link", ...styleClass].join(' ')} to='#' onClick={onClickStall} >Stalls</Link>
            </li>
            <li className="nav-item">
                <Link className={[props.tab === "conference" ? "nav-link active" : "nav-link", ...styleClass].join(" ")} to='#' onClick={onClickConference}>Conferences</Link>
            </li>
            {
                localStorage.getItem('role') === 'Organizer' &&
                <li className="nav-item">
                    <Link to='/admin/visitorsList' className={props.tab === "visitor" ? "nav-link active" : "nav-link"}>
                        Visitors
                </Link>
                </li>
            }
        </ul>
    );
}

export default EventTab;