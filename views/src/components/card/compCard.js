import React, { useContext, useEffect } from 'react';
import EventContext from '../../context/event/eventContext';

const Completed = () => {
  const eventContext = useContext(EventContext);
  const completedEvent = eventContext.completedEvents;

  useEffect(() => {
    eventContext.getCompletedEvent();
  }, []);

  return (
    <>
      {completedEvent &&
        completedEvent.map((event) => (
          <div className='cus-container cus-card'>
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

export default Completed;
