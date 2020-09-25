import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';

import classes from '../Stalls/stallList.module.css'

import ConferenceCard from './ConferenceCard/ConferenceCard';
import EventTab from '../../../Layout/EventTab';
import Loading from '../../../Layout/Loading';

import ConferenceContext from '../../../context/conference/conferenceContext';
import EventContext from '../../../context/event/eventContext';
import AuthContext from '../../../context/auth/authContext';

const Conferences = () => {
    const { conferences, conferenceLoading } = useContext(ConferenceContext);
    const { selectedEvent } = useContext(EventContext);
    const { userId, visitorConferences } = useContext(AuthContext);

    if (conferenceLoading) {
        return (
            <>
                <EventTab tab='conference' />
                <center style={{ marginTop: "100px" }}>
                    <Loading color="info"></Loading>
                </center>
            </>
        );
    }

    if (localStorage.getItem('role') === 'Exhibitor') {

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
    } else if (localStorage.getItem('role') === 'Organizer') {
        return (
            <>
                {!selectedEvent && <Redirect to='/' />}
                <EventTab tab="conference" />
                <div className={classes['view']}>
                    {
                        conferences && conferences.length > 0 ?
                            conferences.map((conference) => <ConferenceCard conference={conference} key={conference._id} />) :
                            <center>No conferences yet!</center>
                    }
                </div>
            </>
        );
    } else {
        let myConferences = [];
        let otherConferences = [];

        if (conferences && conferences.length > 0) {
            conferences.forEach(conference => {
                if (visitorConferences.includes(conference._id)) {
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
                <h1 style={{ margin: "10px 50px", fontSize: "28px" }}>Registered conferences</h1>
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
    }
};

export default Conferences;
