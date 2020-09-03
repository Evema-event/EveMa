import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';

import ConferenceList from '../card/conferenceList';
import EventTab from '../layout/eventTab';

import ConferenceContext from '../../context/conference/conferenceContext';
import EventContext from '../../context/event/eventContext';

const ConferenceListMain = () => {
    const { conferences } = useContext(ConferenceContext);
    const { selectedEvent } = useContext(EventContext);

    return (
        <>
            {!selectedEvent && <Redirect to='/' />}
            <EventTab tab="conference" />

            {
                conferences && conferences.length > 0 ?
                    <div className='view'>
                        {
                            conferences.map(conference => {
                                return <ConferenceList key={conference._id} conference={conference} />
                            })
                        }
                    </div> : <center style={{ marginTop: "50px" }}>No conferences yet!</center>
            }
        </>
    );
};

export default ConferenceListMain;
