import React, { useContext, useEffect } from 'react';


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
        <div>
            <UpcomingEvents />
            <CompletedEvents />
        </div>
    );
}

export default Events;
