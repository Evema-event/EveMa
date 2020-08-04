import React, { useState, useContext, useEffect } from 'react';
import EventContext from '../../context/event/eventContext';
import { Redirect } from 'react-router-dom';

const Upcoming = () => {
  const eventContext = useContext(EventContext);
  const upcomingEvent = eventContext.upcomingEvents;

  const [viewMore, setViewMore] = useState(false);

  const onClick = (eventId) => {
    eventContext.setIndividualEvent(eventId, true);
    setViewMore(true);
  };

  useEffect(() => {
    eventContext.getUpcomingEvent();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      {viewMore && <Redirect to='/upcomingEvents' />}
      {upcomingEvent &&
        upcomingEvent.map((event, i) => {
          if (i < 2)
            return (
              <div key={event._id} onClick={() => onClick(event._id)} className='cus-container cus-card'>
                <div className='rect main-card'>
                  <div className='name'>{event.name}</div>
                  <p className='description'>{event.description.slice(0, 100)}{event.description.length > 100 && ' ... '}</p>
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
          return null;
        })}
    </>
  );
};

export default Upcoming;
