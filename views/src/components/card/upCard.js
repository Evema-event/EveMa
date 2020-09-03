import React, { useState, useContext, useEffect } from 'react';
import EventContext from '../../context/event/eventContext';
import StallContext from '../../context/stall/stallContext';
import ConferenceContext from '../../context/conference/conferenceContext';
import VisitorContext from '../../context/visitor/visitorContext';
import { Redirect } from 'react-router-dom';

const Upcoming = () => {
  const eventContext = useContext(EventContext);
  const upcomingEvent = eventContext.upcomingEvents;
  const stallContext = useContext(StallContext);
  const conferenceContext = useContext(ConferenceContext);
  const visitorContext = useContext(VisitorContext);

  const [viewMore, setViewMore] = useState(false);

  const onClick = (eventId) => {
    eventContext.setIndividualEvent(eventId, true);
    stallContext.getStalls(eventId);
    conferenceContext.getConferences(eventId);
    visitorContext.getVisitors(eventId);
    visitorContext.setIndividualVisitor(eventId, true);
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
              <div
                key={event._id}
                onClick={() => onClick(event._id)}
                className='cus-container cus-card'
              >
                <div className='rect main-card'>
                  <div className='name'>{event.name}</div>
                  <p className='description'>
                    {event.description.slice(0, 100)}
                    {event.description.length > 100 && ' ... '}
                  </p>
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
