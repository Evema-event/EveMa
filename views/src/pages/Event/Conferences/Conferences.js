import React, { useContext, useEffect } from 'react';
import { Redirect } from 'react-router-dom';

import classes from '../../EventList/eventList.module.css'

import ConferenceCard from './ConferenceCard/ConferenceCard';
import EventTab from '../../../Layout/eventTab';

import ConferenceContext from '../../../context/conference/conferenceContext';
import EventContext from '../../../context/event/eventContext';

const Conferences = () => {
    const { conferences, getConferences } = useContext(ConferenceContext);
    const { selectedEvent } = useContext(EventContext);
    
    
  useEffect(() => {
    getConferences(selectedEvent);
    // eslint-disable-next-line
  }, []);

    return (
        <>
            {!selectedEvent && <Redirect to='/' />}
            <EventTab tab="conference" />
            {
                conferences && conferences.length > 0 ?
                    <div className={classes['view']}>
                        {
                            conferences.map(conference => {
                                return <ConferenceCard key={conference._id} conference={conference} />
                            })
                        }
                    </div> : <center style={{ marginTop: "50px" }}>No conferences yet!</center>
            }
        </>
    );
};

export default Conferences;
