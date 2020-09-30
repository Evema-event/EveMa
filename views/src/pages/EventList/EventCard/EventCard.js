import React, { useState, useContext } from 'react';
import { Redirect } from 'react-router-dom';

import classes from './eventCard.module.css';

import EventContext from '../../../context/event/eventContext';
import StallContext from '../../../context/stall/stallContext';
import ConferenceContext from '../../../context/conference/conferenceContext';
import VisitorContext from '../../../context/visitor/visitorContext';

const EventCard = (props) => {
    const { setIndividualEvent } = useContext(EventContext);
    const { getStalls } = useContext(StallContext);
    const { getConferences } = useContext(ConferenceContext);
    const { getVisitors } = useContext(VisitorContext);
    const [redirect, setRedirect] = useState(false);

    const onClickEvent = () => {
        setIndividualEvent(props.event, props.isUpcoming);
        if (localStorage.getItem('token')) {
            getStalls(props.event._id);
            getConferences(props.event._id);
            if (localStorage.getItem('role') === 'Organizer') {
                getVisitors(props.event._id);
            }
        }
        setRedirect(true);
    }

    return (
        <div onClick={onClickEvent} className={classes.fullView}>
            {redirect && <Redirect to='/eventdetails' />}
            <div className={classes.card}>
                <div className={classes.rect}>
                    <div className={classes.grad}>
                        <div className={classes.name}>{props.event.name}</div>
                    </div>
                    <span className={classes.pad}>
                        <p className={classes.description}>
                            {props.event.description.slice(0, 100)}
                            {props.event.description.length > 100 && ' ... '}
                        </p>
                    </span>
                    <div className={classes.details}>
                        <span>
                            {new Date(props.event.startDate).toISOString().slice(0, 10)}
                        </span>
                        <span>{props.event.startTime} </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EventCard
