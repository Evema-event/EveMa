import React, { useContext } from 'react';
import EventContext from '../../context/event/eventContext';

const Completed = () => {
  const eventContext = useContext(EventContext);
  const completedEvent = eventContext.completedEvents;

  return (
    <>
      {completedEvent.map((event) => (
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

export default Completed;
