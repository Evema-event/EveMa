import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';

import classes from './conferenceDetails.module.css';

import EventTab from '../../../../Layout/EventTab';
import ConferenceTab from '../../../../Layout/ConferenceTab';
import ConferenceBtn from '../../../../Layout/ConferenceBtn';

import ConferenceContext from '../../../../context/conference/conferenceContext';

const ConferenceDetails = () => {
  const conferenceContext = useContext(ConferenceContext);
  const conference = conferenceContext.individualConference;

  return (
    <div>
      <EventTab tab='conference' />
      {!conferenceContext.conferences && <Redirect to='/'></Redirect>}
      {conference && (
        <>
          <ConferenceTab tab="conference" />
          <div className={classes['conference-card']}>
            <div className={classes['conference-title']}>
              <h4>Conference Details</h4>
            </div>
            <div className={classes['conference-val']}>
              <div className={classes['conference-item']}>
                <h5>Title</h5>
                <div className={classes['indiv-value']}>
                  <h6>{conference.title}</h6>
                </div>
              </div>
              <div className={classes['conference-item']}>
                <h5>Start Time</h5>
                <div className={classes['indiv-value']}>
                  <h6>{conference.startTime}</h6>
                </div>
              </div>
              <div className={classes['conference-item']}>
                <h5>End time</h5>
                <div className={classes['indiv-value']}>
                  <h6>{conference.endTime}</h6>
                </div>
              </div>
              <div className={classes['conference-item']}>
                <h5>Organization Name</h5>
                <div className={classes['indiv-value']}>
                  <h6>{conference.user.companyName}</h6>
                </div>
              </div>
              <div className={classes['conference-item']}>
                <h5>Date</h5>
                <div className={classes['indiv-value']}>
                  <h6>{conference.date.slice(0, 10)}</h6>
                </div>
              </div>
              <div className={classes['conference-item']}>
                <h5>Name of the Exhibitor</h5>
                <div className={classes['indiv-value']}>
                  <h6>{conference.user.firstName}</h6>
                </div>
              </div>
              <div className={classes['conference-item']}>
                <h5>Contact</h5>
                <div className={classes['indiv-value']}>
                  <h6>{conference.user.contactNumber}</h6>
                </div>
              </div>
              <div className={classes['conference-item']}>
                <h5>E - mail</h5>
                <div className={classes['indiv-value']}>
                  <h6>{conference.userId.emailId}</h6>
                </div>
              </div>
              <div className={classes['conference-item']}>
                <h5>Seat Limit</h5>
                <div className={classes['indiv-value']}>
                  <h6>{conference.seatLimit}</h6>
                </div>
              </div>
              <div className={classes['conference-item']}>
                <h5>Available Seats</h5>
                <div className={classes['indiv-value']}>
                  <h6>{conference.seatLimit - (conference?.registeredVisitors?.length || 0)}</h6>
                </div>
              </div>
            </div>
            <div className={classes['conferenceAdd']}>
              <h5>Product Description</h5>
              <div className={classes['details-bg']}>
                <h6>{conference.description}</h6>
              </div>
            </div>
            <div className={classes['Del-btn']}>
              {
                <ConferenceBtn
                  confId={conference._id}
                  user={conference.userId._id}
                  limit={conference.seatLimit - (conference?.registeredVisitors?.length || 0)}
                />
              }
            </div>
          </div>
        </>
      )}
    </div>
  );
};
export default ConferenceDetails;
