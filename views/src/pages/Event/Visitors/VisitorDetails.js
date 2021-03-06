// Importing core packages
import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';

import classes from '../Stalls/StallDetails/stallDetails.module.css';

// Importing custom components
import EventTab from '../../../Layout/EventTab';
import VisitorContext from '../../../context/visitor/visitorContext';

// VisitorDetails component
const VisitorDetails = () => {
    const visitorContext = useContext(VisitorContext);
    const visitor = visitorContext.individualVisitor;

    if (!visitor || !visitorContext.visitorlist) {
        return <Redirect to='/' />;
    } else {
        return (
            <div>
                <EventTab tab="visitor" />
                <div className={classes['stall-card']}>
                    <div className={classes['stall-val']}>
                        <div className={classes['stall-item']}>
                            <h5>Name</h5>
                            <div className={classes['card-value']}>
                                <h6>{visitor.firstName}</h6>
                            </div>
                        </div>
                        <div className={classes['stall-item']}>
                            <h5>E-mail</h5>
                            <div className={classes['card-value']}>
                                <h6>{visitor.emailId}</h6>
                            </div>
                        </div>
                        <div className={classes['stall-item']}>
                            <h5>Contact</h5>
                            <div className={classes['card-value']}>
                                <h6>{visitor.contactNumber}</h6>
                            </div>
                        </div>
                        <div className={classes['stall-item']}>
                            <h5>Area of Interest</h5>
                            <div className={classes['card-value']}>
                                <h6>{visitor.areaOfInterest}</h6>
                            </div>
                        </div>
                        <div className={classes['stall-item']}>
                            <h5>Organization</h5>
                            <div className={classes['card-value']}>
                                <h6>{visitor.companyName}</h6>
                            </div>
                        </div>
                        <div className={classes['stall-item']}>
                            <h5>Designation</h5>
                            <div className={classes['card-value']}>
                                <h6>{visitor.designation}</h6>
                            </div>
                        </div>
                        <div className={classes['stall-item']}>
                            <h5>No of events Attended</h5>
                            <div className={classes['card-value']}>
                                <h6>{visitor.registeredEvents.length}</h6>
                            </div>
                        </div>
                        <div className={classes['stall-item']}>
                            <h5>Location</h5>
                            <div className={classes['card-value']}>
                                {visitor.cityName}, {visitor.state}, {visitor.country} - {visitor.zipCode}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

// Exporting VisitorDetials component
export default VisitorDetails;
