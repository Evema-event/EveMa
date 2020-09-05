import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';

import StallContext from '../../context/stall/stallContext';
import EventTab from '../layout/eventTab';

const StallIndiv = () => {
  const stallContext = useContext(StallContext);
  const stall = stallContext.individualStall;

  return (
    <div>
      <EventTab tab='stall' />
      {!stallContext.stalls && <Redirect to='/'></Redirect>}
      {stall && (
        <div className='stall-card'>
          <div className='stall-title'>
            <h4>{stall.productName}</h4>
          </div>
          <div className='stall-val'>
            <div className='stall-item'>
              <h5>Company</h5>
              <div className='card-value'>
                <h6>{stall.user.companyName}</h6>
              </div>
            </div>
            <div className='stall-item'>
              <h5>Domain</h5>
              <div className='card-value'>
                <h6>{stall.productDomain}</h6>
              </div>
            </div>
            <div className='stall-item'>
              <h5>Contact</h5>
              <div className='card-value'>
                <h6>{stall.user.contactNumber}</h6>
              </div>
            </div>
            <div className='stall-item'>
              <h5>Email</h5>
              <div className='card-value'>
                <h6>{stall.userId.emailId}</h6>
              </div>
            </div>
            <div className='stallAdd'>
              <h5>Product Description</h5>
              <div className='detail-bg'>{stall.description}</div>
            </div>
            <div className='stallAdd'>
              <h5>Company Address</h5>
              <div className='detail-bg'>{stall.user.companyAddress}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StallIndiv;
