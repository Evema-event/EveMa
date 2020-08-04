import React, { useContext } from 'react';
import EventContext from '../../context/event/eventContext';
import { Redirect } from 'react-router-dom';

const Upcomingindiv = () => {
  const eventContext = useContext(EventContext);
  const event = eventContext.indivEvent;

  if (event) {
    return (
      <div className='up-card'>
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
      </div>
    );
  }
  else {
    return (
      <Redirect to='/' />
    );
  }
};

export default Upcomingindiv;
