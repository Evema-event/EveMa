import React, { useState, useContext, useEffect } from 'react';
import EventContext from '../../context/event/eventContext';
import { Redirect } from 'react-router-dom';

const Completed = () => {
  const eventContext = useContext(EventContext);
  const completedEvent = eventContext.completedEvents;

  const [viewMore, setViewMore] = useState(false);

  const onClick = (eventId) => {
    eventContext.setIndividualEvent(eventId, false);
    setViewMore(true);
  };

  useEffect(() => {
    eventContext.getCompletedEvent();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      {viewMore && <Redirect to='/completedEvents' />}
      {completedEvent &&
        completedEvent.map((event, i) => {
          if (i < 6)
            return (
              <div
                key={event._id}
                onClick={() => onClick(event._id)}
                className='cus-container cus-card'
              >
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
          return null;
        })}
    </>
  );
};

export default Completed;
