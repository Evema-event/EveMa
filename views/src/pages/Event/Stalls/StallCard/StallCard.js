import React, { useState, useContext } from 'react';
import { Redirect } from 'react-router-dom';

import classes from './stallCard.module.css';

import StallContext from '../../../../context/stall/stallContext';

const StallCard = (props) => {
    const [redirectStall, setRedirectStall] = useState(false);
    const { setIndividualStall } = useContext(StallContext);

    const onClickStall = () => {
        setIndividualStall(props.stall);
        setRedirectStall(true);
    }

    return (
        <div onClick={onClickStall}>
            {redirectStall && <Redirect to='/stallDetails' />}
            <div className={classes['stall-bg']}>
                <div className={classes['stall-title']}>{props.stall.productName}</div>
                <div className={classes['product-name']}>
                    <h5>Company</h5>
                    <h6>{props.stall.user.companyName}</h6>
                </div>
                <div className={classes['product-name']}>
                    <h5>Domain</h5>
                    <h6>{props.stall.productDomain}</h6>
                </div>
                <div className={classes['product-name']}>
                    <h5>Email</h5>
                    <h6>{props.stall.userId.emailId}</h6>
                </div>
            </div>
        </div>
    );
};

export default StallCard;
