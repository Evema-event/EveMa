import React, { useState, useContext } from 'react';
import { Redirect } from 'react-router-dom';

import ConferenceContext from '../../context/conference/conferenceContext';

const ConferenceList = (props) => {
  const [redirectConf, setRedirectConf] = useState(false);
  const { setIndividualConference } = useContext(ConferenceContext);

  const onClickConference = () => {
    setIndividualConference(props.conference);
    setRedirectConf(true);
  }

  return (
    <div onClick={onClickConference}>
      {redirectConf && <Redirect to='/conferenceIndividual' />}
      <div className='stall-bg'>
        <div className='stall-title'>{props.conference.title}</div>
        <div className='product-name'>
          <h5>Company</h5>
          <h6>{props.conference.user.companyName}</h6>
        </div>
        <div className='product-name'>
          <h5>Domain</h5>
          <h6>{props.conference.theme}</h6>
        </div>
        <div className='product-name'>
          <h5>Email</h5>
          <h6>{props.conference.userId.emailId}</h6>
        </div>
      </div>
    </div>
  );
};

export default ConferenceList;
