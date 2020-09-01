import React from 'react';
import ConferenceList from '../card/conferenceList';
import EventTab from '../layout/eventTab';

const ConferenceListMain = () => {
    return (
        <>
            <EventTab tab="conference" />
            <div className='view'>
                <ConferenceList />
                <ConferenceList />
                <ConferenceList />
                <ConferenceList />
            </div>
        </>
    );
};

export default ConferenceListMain;
