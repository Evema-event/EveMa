import React, { useContext, useEffect } from 'react';
import EventContext from '../../context/event/eventContext';

const Completedindiv = () => {
  const eventContext = useContext(EventContext);
  const completedEvent = eventContext.completedEvents;

  useEffect(() => {
    eventContext.getCompletedEvent();
  }, []);

  return (
    <div className='comp-card'>
      {completedEvent &&
        completedEvent.map((event, i) => {
          if (i < 1)
            return (
              // TITLE PART
              <div key={event._id}>
                <div className='main-bg'>
                  <div className='indiv-name'>{event.name}</div>
                  <div className='indiv-name'>Event Description:</div>
                  <br />
                  {/* DESCRIPTION PART */}

                  <div className='discription-row'>
                    <div className='details-bg'>{event.description}</div>

                    {/* LAST DAY FOR REGISTRATION PART */}

                    <div className='last-bg'>
                      <div>Last Date for the Registration</div>
                      <div>
                        Time: {event.startTime} A.M - {event.endTime} P.M
                      </div>
                      <div>
                        Last Date :
                        {new Date(event.registrationLastdate)
                          .toISOString()
                          .slice(0, 10)}
                      </div>
                      <div>Venue :{event.venue}</div>
                    </div>
                  </div>
                  <br />
                  <div>
                    <div className='indiv-name'>Contact Details:</div>
                  </div>

                  <div className='contact-part '>
                    {/* CONTACT PART */}

                    <div className='contact-bg'>
                      <div>Mail Address: {event.contactEmail}</div>
                      <div>Phone:{event.contactNumber}</div>
                    </div>

                    {/* REGISTER BUTTON */}

                    <div className='register-button '>
                      <div>Register</div>
                    </div>
                  </div>
                </div>
              </div>
            );
        })}
    </div>
  );
};

export default Completedindiv;
