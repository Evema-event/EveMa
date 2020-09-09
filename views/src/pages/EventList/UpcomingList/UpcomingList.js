import React, { useContext, useEffect } from 'react';

import classes from '../eventList.module.css';

import EventCard from '../EventCard/EventCard';

import EventContext from '../../../context/event/eventContext';

const UpcomingList = () => {
    const { getUpcomingEvent, upcomingEvents } = useContext(EventContext);

    useEffect(() => {
        getUpcomingEvent();
        // eslint-disable-next-line
    }, []);

    if (upcomingEvents && upcomingEvents.length > 0) {
        return (
            <>
                <div className={classes.title}>Upcoming Events</div>
                <div className={classes.view}>
                    {
                        upcomingEvents.map((event, i) => <EventCard key={event._id} event={event} isUpcoming={true} />)
                    }
                </div>
            </>
        );
    } else {
        return (
            <>
                <div className={classes.title}>Upcoming Events</div>
                <center className="h2">No upcoming events yet!</center>
            </>
        );
    }
}

export default UpcomingList;