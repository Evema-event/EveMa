import React, { useState, useContext } from 'react';
import { Redirect } from 'react-router-dom';

import StallContext from '../../context/stall/stallContext';

const StallList = (props) => {
  const [redirectStall, setRedirectStall] = useState(false);
  const stallContext = useContext(StallContext);

  const onClickStall = () => {
    stallContext.setIndividualStall(props.stall);
    setRedirectStall(true);
  }

  return (

    <div onClick={onClickStall}>
      {redirectStall && <Redirect to='/stallIndividual' />}
      <div className='stall-bg'>
        <div className='stall-title'>{props.stall.productName}</div>
        <div className='product-name'>
          <h5>Company</h5>
          <h6>{props.stall.user.companyName}</h6>
        </div>
        <div className='product-name'>
          <h5>Domain</h5>
          <h6>{props.stall.productDomain}</h6>
        </div>
        <div className='product-name'>
          <h5>Email</h5>
          <h6>{props.stall.userId.emailId}</h6>
        </div>
      </div>
    </div>
  );
};

export default StallList;
