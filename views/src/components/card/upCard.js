import React, { useContext } from 'react';
import EventContext from '../../context/event/eventContext';

const Upcoming = () => {
  const eventContext = useContext(EventContext);
  const upcomingEvent = eventContext.upcomingEvents;

  return (
    <>
      {upcomingEvent.map((event) => (
        <div className='cus-container cus-card'>
          <div className='rect main-card'>
            <div className='name'>{event.name}</div>
            <div className='venue'>{event.venue}</div>
            <div className='time'>{event.time}</div>
          </div>
        </div>
      ))}
    </>
  );
};

export default Upcoming;
