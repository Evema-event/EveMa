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
            <div style={{background: "#3AAFA9", marginTop:"30px", padding: "10px"}}>
            <UpcomingEvents />    
            </div>
            <div style={{background: "#3AAFA9",marginTop:"30px", padding: "10px"}}>
            <CompletedEvents />   
            </div>
        </div>
    );
}

export default Events;
