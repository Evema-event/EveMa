import React, { useContext } from 'react';
import ConferenceContext from '../../context/conference/conferenceContext';

const ConferenceList = (props) => {
  const { setIndividualConference } = useContext(ConferenceContext);

  const onClickConference = () => {
    setIndividualConference(props.conference);
  }

  return (
    <div onClick={onClickConference}>
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
