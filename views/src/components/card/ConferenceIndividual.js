import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';

import EventTab from '../layout/eventTab';

import ConferenceContext from '../../context/conference/conferenceContext';

const ConferenceIndiv = () => {
  const conferenceContext = useContext(ConferenceContext);
  const conference = conferenceContext.individualConference;

  return (
    <div>
      <EventTab tab='conference' />
      {!conferenceContext.conferences && <Redirect to='/'></Redirect>}
      {
        conference &&
        <div className='conference-card'>
          <div className='conference-title'>
            <h4>Conference Details</h4>
          </div>
          <div className='conference-val'>
            <div className='conference-item'>
              <h5>Title of the Conference</h5>
              <div className='card-value'>
                <h6>{conference.title}</h6>
              </div>
            </div>
            <div className='conference-item'>
              <h5>Start Time</h5>
              <div className='indiv-value'>
                <h6>{conference.startTime}</h6>
              </div>
            </div>
            <div className='conference-item'>
              <h5>End time</h5>
              <div className='indiv-value'>
                <h6>{conference.endTime}</h6>
              </div>
            </div>
            <div className='conference-item'>
              <h5>Organization Name</h5>
              <div className='indiv-value'>
                <h6>{conference.user.companyName}</h6>
              </div>
            </div>
            <div className='conference-item'>
              <h5>Date</h5>
              <div className='indiv-value'>
                <h6>{conference.date}</h6>
              </div>
            </div>
            <div className='conference-item'>
              <h5>Name of the Exhibitor</h5>
              <div className='indiv-value'>
                <h6>{conference.user.firstName}</h6>
              </div>
            </div>
            <div className='conference-item'>
              <h5>Contact</h5>
              <div className='indiv-value'>
                <h6>{conference.user.contactNumber}</h6>
              </div>
            </div>
            <div className='conference-item'>
              <h5>E - mail</h5>
              <div className='indiv-value'>{conference.userId.emailId}</div>
            </div>
            <div className='conferenceAdd'>
              <h5>Product Description</h5>
              <div className='details-bg'>
                <h6>{conference.description}</h6>
              </div>
            </div>
          </div>
        </div>
      }
    </div>
  );
};
export default ConferenceIndiv;
