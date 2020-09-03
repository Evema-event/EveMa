// Importing core packages
import React, {useContext} from 'react';
import {Redirect} from 'react-router-dom';

// Importing custom components
import EventTab from '../layout/eventTab';
import VisitorContext from '../../context/visitor/visitorContext';

// VisitorDetails component
const VisitorDetails = () => {
    const visitorContext = useContext(VisitorContext);
    const visitor = visitorContext.getVisitors;
    return (
        <div>
        <EventTab tab="visitor" />
         {!visitorContext.visitorlist && <Redirect to='/' />}   
        <div className='stall-card'>
                <div className='stall-val'>
                    <div className='stall-item'>
                        <h5>Name</h5>
                        <div className='card-value'>
                            <h6>{visitor.firstName}</h6>
                        </div>
                    </div>
                    <div className='stall-item'>
                        <h5>E-mail</h5>
                        <div className='card-value'>
                            <h6>visitor.emailid</h6>
                        </div>
                    </div>
                    <div className='stall-item'>
                        <h5>Contact</h5>
                        <div className='card-value'>
                            <h6>{visitor.contactNumber}</h6>
                        </div>
                    </div>
                    <div className='stall-item'>
                        <h5>Area of Interest</h5>
                        <div className='card-value'>
                            <h6>{visitor.areaOfInterest}</h6>
                        </div>
                    </div>
                    <div className='stall-item'>
                        <h5>Organization</h5>
                        <div className='card-value'>
                            <h6>{visitor.companyName}</h6>
                        </div>
                    </div>
                    <div className='stall-item'>
                        <h5>Designation</h5>
                        <div className='card-value'>
                        <h6>{visitor.designation}</h6>
                        </div>
                    </div>
                    <div className='stall-item'>
                        <h5>No of events Attended</h5>
                        <div className='card-value'>
                            <h6>5</h6>
                        </div>
                    </div>
                    <div className='stall-item'>
                        <h5>Location</h5>
                        <div className='card-value'>
                            This is Location
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Exporting VisitorDetials component
export default VisitorDetails;
