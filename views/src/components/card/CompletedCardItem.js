import React, { useContext } from 'react';
import EventContext from '../../context/event/eventContext';

const Completed = () => {
  const eventContext = useContext(EventContext);
  const indivEvent = eventContext.indivEvent;

  return (
    <>
      {indivEvent &&
        indivEvent.map((event) => (
          // TITLE PART
          <div className='main-bg'>
            <div className='event-name'>
              <p>{event.name}</p>
              <p>Event Description</p>
            </div>

            {/* DESCRIPTION PART */}

            <div className='discription-row'>
              <div className='details-bg'>
                <div className='details'>
                  <>{event.details}</>
                </div>
              </div>

              {/* LAST DAY FOR REGISTRATION PART */}

              <div className='last-bg'>
                <div className='last'>
                  <p>Last Date for the Registration</p>
                  <p>{event.time}</p>
                  <p>{event.date}</p>
                  <p>Venue :{event.venue}</p>
                </div>
              </div>
            </div>

            {/* CONTACT PART */}

            <div className='contact-name'>
              <p>Contact Details</p>
            </div>
            <div className='contact-row'>
              <div className='contact-bg'>
                <div className='contact'>
                  <p>Mail Address: {event.mail}</p>
                  <p>Phone:{event.phone}</p>
                </div>
              </div>

              {/* REGISTER BUTTON */}

              <div className='register-button'>
                <div className='register'>
                  <p>Register</p>
                </div>
              </div>
            </div>
          </div>
        ))}
    </>
  );
};

export default Completed;
