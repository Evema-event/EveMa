import React, { useContext, useEffect } from 'react';

import classes from './events.module.css';

import UpcomingEvents from './UpcomingEvents/UpcomingEvents';
import CompletedEvents from './CompletedEvents/CompltedEvents';

import EventContext from '../../../context/event/eventContext';

const Events = () => {
    const { getUpcomingEvent, getCompletedEvent } = useContext(EventContext);

    useEffect(() => {
        getUpcomingEvent();
        getCompletedEvent();
        // eslint-disable-next-line
    }, []);

    return (
        <div className={classes.about}>
            <h2>About Events</h2>
            <UpcomingEvents />
            <CompletedEvents />
        </div>
    );
}

export default Events;
