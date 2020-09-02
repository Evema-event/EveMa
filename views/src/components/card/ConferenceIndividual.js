import React, { useContext } from 'react';
// import { Redirect } from 'react-router-dom';

// import conferenceContext from '../../context/conference/conferenceContext';

const ConferenceIndiv = () => {
  //   const conferenceContext = useContext(conferenceContext);
  //   const conference = conferenceContext.individualconference;

  return (
    <div>
      {/* {!stallContext.stalls && <Redirect to='/'></Redirect>}
        {
          stall && */}
      <div className='conference-card'>
        <div className='conference-title'>
          <h4>Conference Details</h4>
        </div>
        <div className='conference-val'>
          <div className='conference-item'>
            <h5>Title of the Conference</h5>
            <div className='card-value'>
              <h6>Iron man</h6>
            </div>
          </div>
          <div className='conference-item'>
            <h5>Name of the Speaker</h5>
            <div className='indiv-value'>
              <h6>Tony Stark</h6>
            </div>
          </div>
          <div className='conference-item'>
            <h5>Start Time</h5>
            <div className='indiv-value'>
              <h6>10 : 00</h6>
            </div>
          </div>
          <div className='conference-item'>
            <h5>End time</h5>
            <div className='indiv-value'>
              <h6>6 : 00</h6>
            </div>
          </div>
          <div className='conference-item'>
            <h5>Organization Name</h5>
            <div className='indiv-value'>
              <h6>Stark Industry</h6>
            </div>
          </div>
          <div className='conference-item'>
            <h5>Date</h5>
            <div className='indiv-value'>
              <h6>15/09/1999</h6>
            </div>
          </div>
          <div className='conference-item'>
            <h5>Name of the Exhibitor</h5>
            <div className='indiv-value'>
              <h6>pepper Stark</h6>
            </div>
          </div>
          <div className='conference-item'>
            <h5>Contact</h5>
            <div className='indiv-value'>
              <h6>+ (000) 657 536</h6>
            </div>
          </div>
          <div className='conference-item'>
            <h5>Venue</h5>
            <div className='indiv-value'>
              <h6>Atark towers</h6>
            </div>
          </div>

          <div className='conference-item'>
            <h5>E - mail</h5>
            <div className='indiv-value'>stark@avengers.com</div>
          </div>
          <div className='conferenceAdd'>
            <h5>Product Description</h5>
            <div className='details-bg'>
              <h6>Description</h6>
            </div>
          </div>
          <div className='conferenceAdd'>
            <h5>Address</h5>
            <div className='details-bg'>
              <h6>Address</h6>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ConferenceIndiv;
