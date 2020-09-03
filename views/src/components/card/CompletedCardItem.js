import React, { useContext } from 'react';
import EventContext from '../../context/event/eventContext';
import { Redirect } from 'react-router-dom';
import EventTab from '../layout/eventTab';

const Completedindiv = () => {
  const eventContext = useContext(EventContext);
  const event = eventContext.indivEvent;

  if (event) {
    return (
      <div className='comp-card'>
        <div key={event._id}>
          <EventTab tab="event" />
          <div className='main-bg'>
            <div className='indiv-name'>{event.name}</div>
            <div className='indiv-name'>Event Description:</div>
            <br />
            {/* DESCRIPTION PART */}

            <div className='discription-row'>
              <div className='details-bg'>{event.description}</div>

              {/* LAST DAY FOR REGISTRATION PART */}

              <div className='last-bg'>
                <div>
                  Time: {event.startTime} A.M - {event.endTime} P.M
                </div>
                <div>
                  Date : {new Date(event.startDate).toISOString().slice(0, 10)}{' '}
                  -{' '}
                  <span>
                    {new Date(event.endDate).toISOString().slice(0, 10)}
                  </span>
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

              <div className='contact-bg'>
                <div>
                  Number of visitors attended: {event.registeredUsers.length}
                </div>
                <div>
                  Number of stalls exhibited: {event.registeredStalls.length}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return <Redirect to='/' />;
  }
};

export default Completedindiv;
