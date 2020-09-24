import React, { useContext, useEffect } from 'react';
import { Redirect } from 'react-router-dom';

import classes from '../Stalls/stallList.module.css'

import ConferenceCard from './ConferenceCard/ConferenceCard';
import EventTab from '../../../Layout/EventTab';

import ConferenceContext from '../../../context/conference/conferenceContext';
import EventContext from '../../../context/event/eventContext';
import AuthContext from '../../../context/auth/authContext';

const Conferences = () => {
    const { conferences, getConferences } = useContext(ConferenceContext);
    const { selectedEvent } = useContext(EventContext);
    const { userId } = useContext(AuthContext);

    useEffect(() => {
        getConferences(selectedEvent);
        // eslint-disable-next-line
    }, []);

    let myConferences = [];
    let otherConferences = [];

    if (conferences && conferences.length > 0) {
        conferences.forEach(conference => {
            if (userId === conference.userId._id) {
                myConferences.push(conference);
            } else {
                otherConferences.push(conference);
            }
        });
    }

    return (
        <>
            {!selectedEvent && <Redirect to='/' />}
            <EventTab tab="conference" />
            <h1 style={{ margin: "10px 50px", fontSize: "28px" }}>My conferences</h1>
            <div className={classes['view']}>
                {
                    myConferences.length > 0 ?
                        myConferences.map((conference) => <ConferenceCard conference={conference} key={conference._id} />) :
                        <center>No conferences yet!</center>
                }
            </div>
            <h1 style={{ margin: "10px 50px", fontSize: "28px" }}>Conferences</h1>
            <div className={classes['view']}>
                {
                    otherConferences.length > 0 ?
                        otherConferences.map((conference) => <ConferenceCard conference={conference} key={conference._id} />) :
                        <center>No conferences yet!</center>
                }
            </div>
        </>
    );
};

export default Conferences;
