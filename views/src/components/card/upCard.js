import React, { useContext, useEffect } from 'react';
import EventContext from '../../context/event/eventContext';

const Upcoming = () => {
  const eventContext = useContext(EventContext);
  const upcomingEvent = eventContext.upcomingEvents;

  useEffect(() => {
    eventContext.getUpcomingEvent();
  }, []);

  return (
    <>
      {upcomingEvent &&
        upcomingEvent.map((event) => (
          <div key={event._id} className='cus-container cus-card'>
            <div className='rect main-card'>
              <div className='name'>{event.name}</div>
              <div className='venue'>{event.venue}</div>
              <div className='time'>
                {new Date(event.startDate).toISOString().slice(0, 10)}
              </div>
            </div>
          </div>
        ))}
    </>
  );
};

export default Upcoming;
