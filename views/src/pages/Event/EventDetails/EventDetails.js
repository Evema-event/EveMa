import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';

import classes from './eventDetails.module.css';

import EventButton from '../../../Layout/EventBtn';
import EventTab from '../../../Layout/EventTab';

import EventContext from '../../../context/event/eventContext';

const EventDetails = () => {
  const eventContext = useContext(EventContext);
  const event = eventContext.indivEvent;

  if (event) {
    return (
      <div className={classes['comp-card']}>
        <div key={event._id}>
          <EventTab tab='event' />
          <div className={classes['main-bg']}>
            <div
              style={{ textTransform: 'uppercase', textAlign: 'center' }}
              className={classes['indiv-name']}
            >
              {event.name}
            </div>

            <div className={classes['indiv-name']}>Event Description</div>
            <br />

            <div className={classes['discription-row']}>
              <div className={classes['details-bg']}>{event.description}</div>

              <div className={classes['last-bg']}>
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
              <div className={classes['indiv-name']}>Contact Details</div>
            </div>

            <div className={classes['contact-part']}>
              <div className={classes['contact-bg']}>
                <div>Mail Address: {event.contactEmail}</div>
                <div>Phone:{event.contactNumber}</div>
              </div>

              <div className={classes['contact-bg']}>
                <div>
                  Number of visitors{' '}
                  {eventContext.isUpcoming ? 'Registered' : 'attended'}:{' '}
                  {event.registeredUsers.length}
                </div>
                <div>
                  Number of stalls{' '}
                  {eventContext.isUpcoming ? 'Registered' : 'exhibited'}:{' '}
                  {event.registeredStalls.length}
                </div>
              </div>
            </div>
            <div className={classes.registerButton}>
              {eventContext.isUpcoming && (
                <EventButton eventId={event._id} event={event} />
              )}
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return <Redirect to='/' />;
  }
};

export default EventDetails;
