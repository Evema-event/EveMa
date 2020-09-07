import React, { useContext, useEffect } from 'react';

import classes from '../eventList.module.css';

import EventCard from '../EventCard/EventCard';

import EventContext from '../../../context/event/eventContext';

const CompletedList = () => {
    const { getCompletedEvent, completedEvents } = useContext(EventContext);

    useEffect(() => {
        getCompletedEvent();
        // eslint-disable-next-line
    }, []);

    if (completedEvents && completedEvents.length > 0) {
        return (
            <>
                <div className={classes.title}>Completed Events</div>
                <div className={classes.view}>
                    {
                        completedEvents.map((event, i) => <EventCard key={event._id} event={event} isUpcoming={false} />)

                    }
                </div>
            </>
        );
    } else {
        return (
            <>
                <div className={classes.title}>Completed Events</div>
                <center className="h2">No completed events yet!</center>
            </>
        )
    }
}

export default CompletedList;
