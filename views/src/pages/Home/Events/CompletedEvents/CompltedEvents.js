import React, { useContext } from 'react';

import classes from './completedEvents.module.css';
import eventClasses from '../events.module.css';

import Loadmore from '../Loadmore/Loadmore';
import EventCard from '../../../EventList/EventCard/EventCard';

import EventContext from '../../../../context/event/eventContext';

const CompletedEvents = () => {
    const { completedEvents } = useContext(EventContext);
    if (completedEvents && completedEvents.length > 0) {
        return (
            <div className={classes.completed}>
                <div className={classes.left}>
                    <div className={[eventClasses.title, classes.title].join(' ')}>Completed Events</div>
                    <div className={classes.eventList}>
                        {completedEvents.map((event, i) => i < 6 ? <EventCard key={event._id} event={event} isUpcoming={false} /> : null
                        )}
                    </div>
                    {completedEvents.length > 2 && <Loadmore link='/completedList' />}
                </div>
            </div>
        );
    }
    else {
        return <></>
    }
}

export default CompletedEvents;
