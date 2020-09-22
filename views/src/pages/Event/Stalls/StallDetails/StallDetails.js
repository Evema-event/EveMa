import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';

import classes from './stallDetails.module.css';
import StallContext from '../../../../context/stall/stallContext';
import EventTab from '../../../../Layout/eventTab';
import StallTab from '../../../../Layout/stallTab';
import ExhibitorBtn from '../../../../Layout/ExhibitorBtn';

const StallDetails = () => {
  const stallContext = useContext(StallContext);
  const stall = stallContext.individualStall;

  return (
    <div>
      <EventTab tab='stall' />
      {!stallContext.stalls && <Redirect to='/'></Redirect>}
      {stall && (
        <>
          <StallTab tab='stall' />
          <div className={classes['stall-card']}>
            <div className={classes['stall-title']}>
              <h4>{stall.productName}</h4>
            </div>
            <div className={classes['stall-val']}>
              <div className={classes['stall-item']}>
                <h5>Company</h5>
                <div className={classes['card-value']}>
                  <h6>{stall.user.companyName}</h6>
                </div>
              </div>
              <div className={classes['stall-item']}>
                <h5>Domain</h5>
                <div className={classes['card-value']}>
                  <h6>{stall.productDomain}</h6>
                </div>
              </div>
              <div className={classes['stall-item']}>
                <h5>Contact</h5>
                <div className={classes['card-value']}>
                  <h6>{stall.user.contactNumber}</h6>
                </div>
              </div>
              <div className={classes['stall-item']}>
                <h5>Email</h5>
                <div className={classes['card-value']}>
                  <h6>{stall.userId.emailId}</h6>
                </div>
              </div>
              <div className={classes['stallAdd']}>
                <h5>Product Description</h5>
                <div className={classes['detail-bg']}>{stall.description}</div>
              </div>
              <div className={classes['stallAdd']}>
                <h5>Company Address</h5>
                <div className={classes['detail-bg']}>
                  {stall.user.companyAddress}
                </div>
              </div>
            </div>
            <div className={classes['delete-btn']}>
              {<ExhibitorBtn stallId={stall._id} user={stall.userId._id} />}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default StallDetails;
