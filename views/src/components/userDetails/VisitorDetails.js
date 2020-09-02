// Importing core packages
import React from 'react';

// Importing custom components
import EventTab from '../layout/eventTab';

// VisitorDetails component
const VisitorDetails = () => {
    return (
        <div>
            <EventTab tab="visitor" />
            <div className='stall-card'>
                <div className='stall-val'>
                    <div className='stall-item'>
                        <h5>Name</h5>
                        <div className='card-value'>
                            <h6>Test</h6>
                        </div>
                    </div>
                    <div className='stall-item'>
                        <h5>E-mail</h5>
                        <div className='card-value'>
                            <h6>test@test.com</h6>
                        </div>
                    </div>
                    <div className='stall-item'>
                        <h5>Contact</h5>
                        <div className='card-value'>
                            <h6>1234567890</h6>
                        </div>
                    </div>
                    <div className='stall-item'>
                        <h5>Area of Interest</h5>
                        <div className='card-value'>
                            <h6>AI, ML</h6>
                        </div>
                    </div>
                    <div className='stall-item'>
                        <h5>Organization</h5>
                        <div className='card-value'>
                            <h6>Testing</h6>
                        </div>
                    </div>
                    <div className='stall-item'>
                        <h5>Designation</h5>
                        <div className='card-value'>
                            <h6>Developer</h6>
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
