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
        upcomingEvent.map((event, i) => {
          if (i < 4)
            // console.log(i);
            return (
              <div key={event._id} className='cus-container cus-card'>
                <div className='rect main-card'>
                  <div className='name'>{event.name}</div>
                  <p className='description'>{event.description}</p>
                  <div className='details'>
                    <span>
                      {new Date(event.startDate).toISOString().slice(0, 10)}
                    </span>
                    <span>{event.startTime} </span>
                    <span>{event.venue} </span>
                  </div>
                </div>
              </div>
            );
        })}
    </>
  );
};

export default Upcoming;
