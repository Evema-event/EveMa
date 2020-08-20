import React, { useContext } from 'react';
import EventContext from '../../context/event/eventContext';
import { Redirect } from 'react-router-dom';
import RegisterBtn from '../layout/RegisterBtn';

const Upcomingindiv = () => {
  const eventContext = useContext(EventContext);
  const event = eventContext.indivEvent;

  if (event) {
    return (
      <div className='up-card'>
        <div className='up_title'>Upcoming Event Details</div>
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
                <p>
                  Time:{' '}
                  <>
                    {event.startTime} A.M - {event.endTime} P.M{' '}
                  </>
                </p>
                <p>
                  Date :
                  <>
                    {' '}
                    {new Date(event.startDate)
                      .toISOString()
                      .slice(0, 10)} -{' '}
                    <span>
                      {new Date(event.endDate).toISOString().slice(0, 10)}
                    </span>
                  </>
                </p>
                <p>
                  Last Date:
                  <span>
                    {' '}
                    {new Date(event.registrationLastdate)
                      .toISOString()
                      .slice(0, 10)}
                  </span>
                </p>
                <p>
                  Venue:<span>{event.venue}</span>
                </p>
                <p>
                  Price: <span>{event.price}</span>
                </p>
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

              <RegisterBtn eventId={event._id} />
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return <Redirect to='/' />;
  }
};

export default Upcomingindiv;
