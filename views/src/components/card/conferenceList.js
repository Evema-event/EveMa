import React from 'react';
import { Link } from 'react-router-dom';

const ConferenceList = () => {
  return (
    <Link to='/stallIndividual'>
      <div>
        <div className='stall-bg'>
          <div className='stall-title'>Terminator</div>
          <div className='product-name'>
            <h5>Company</h5>
            <h6>Genisys</h6>
          </div>
          <div className='product-name'>
            <h5>Domain</h5>
            <h6>A.I Robotics</h6>
          </div>
          <div className='product-name'>
            <h5>Email</h5>
            <h6> johnconnor@genisys.tech </h6>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ConferenceList;
