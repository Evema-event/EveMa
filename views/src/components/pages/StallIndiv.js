import React from 'react';

const StallIndiv = () => {
  return (
    <div>
      <div className='stall-card'>
        <div className='stall-title'>
          <h4>TERMINATOR</h4>
        </div>
        <div className='stall-val'>
          <div className='stall-item'>
            <h5>Company</h5>
            <div className='card-value'>
              <h6>Genisys</h6>
            </div>
          </div>
          <div className='stall-item'>
            <h5>Domain</h5>
            <div className='card-value'>
              <h6>A.I Robotics</h6>
            </div>
          </div>
          <div className='stall-item'>
            <h5>Contact</h5>
            <div className='card-value'>
              <h6>9876543210</h6>
            </div>
          </div>
          <div className='stall-item'>
            <h5>Email</h5>
            <div className='card-value'>
              <h6>johnconnor@genisys.tech</h6>
            </div>
          </div>
          <div className='stallAdd'>
            <h5>Product Description</h5>
            <div className='details-bg'>
              The Robot that is sent back in time to save the human Race
            </div>
          </div>
          <div className='stallAdd'>
            <h5>Company Address</h5>
            <div className='details-bg'>
              CyberDyne Systems, Redwood City, California-065
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StallIndiv;
