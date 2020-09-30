import React, { useContext, useEffect } from 'react';

import classes from '../eventList.module.css';

import EventCard from '../EventCard/EventCard';
import Loading from '../../../Layout/Loading';

import EventContext from '../../../context/event/eventContext';
import AuthContext from '../../../context/auth/authContext';

const CompletedList = () => {
    const { getCompletedEvent, completedEvents, completedEventsLoading } = useContext(EventContext);
    const { registeredEvents, registeredStalls, registeredConferences } = useContext(AuthContext);

    useEffect(() => {
        if (!completedEventsLoading && !completedEvents) {
            getCompletedEvent();
        }
        // eslint-disable-next-line
    }, []);

    if (completedEventsLoading) {
        return (
            <>
                <div className={classes.title}>Completed Events</div>
                <center><Loading color="info" /></center>
            </>
        );
    }

    if (completedEvents && completedEvents.length === 0) {
        return <></>;
    }

    if (localStorage.getItem('role') === 'Visitor') {
        let myEvents = [];
        let otherEvents = [];

        if (completedEvents && completedEvents.length > 0) {
            completedEvents.forEach(event => {
                if (registeredEvents.includes(event._id)) {
                    myEvents.push(event);
                } else {
                    otherEvents.push(event);
                }
            })
        }

        return (
            <>
                <div className={classes.title}>Completed Events</div>
                {
                    myEvents.length > 0 ?
                        <>
                            <p className={classes.subtitle}>Registered Events</p>
                            <div className={classes.view}>
                                {
                                    myEvents.length > 0 ?
                                        myEvents.map((event, i) => <EventCard key={event._id} event={event} isUpcoming={false} />) : <center>No events yet!</center>
                                }
                            </div>
                            <p className={classes.subtitle}>Events</p>
                        </> : <></>
                }
                <div className={classes.view}>
                    {
                        otherEvents.length > 0 ?
                            otherEvents.map((event, i) => <EventCard key={event._id} event={event} isUpcoming={false} />) : <center>No events yet!</center>
                    }
                </div>
            </>
        );
    } else if (localStorage.getItem('role') === 'Exhibitor') {
        let myEvents = [];
        let otherEvents = [];

        if (completedEvents && completedEvents.length > 0) {
            completedEvents.forEach(event => {
                let isIn = false;
                for (var stall of registeredStalls) {
                    if (stall.eventId === event._id) {
                        myEvents.push(event);
                        isIn = true;
                        break;
                    }
                };
                if (!isIn) {
                    for (var conference of registeredConferences) {
                        if (conference.eventId === event._id) {
                            myEvents.push(event);
                            isIn = true;
                            break;
                        }
                    };
                }
                if (!isIn) {
                    otherEvents.push(event);
                }
            })
        }

        return (
            <>
                <div className={classes.title}>Completed Events</div>
                {
                    myEvents.length > 0 ?
                        <>
                            <p className={classes.subtitle}>Exhibited Events</p>
                            <div className={classes.view}>
                                {
                                    myEvents.length > 0 ?
                                        myEvents.map((event, i) => <EventCard key={event._id} event={event} isUpcoming={false} />) : <center>No events yet!</center>
                                }
                            </div>
                            <p className={classes.subtitle}>Events</p>
                        </> : <></>
                }
                <div className={classes.view}>
                    {
                        otherEvents.length > 0 ?
                            otherEvents.map((event, i) => <EventCard key={event._id} event={event} isUpcoming={false} />) : <center>No events yet!</center>
                    }
                </div>
            </>
        );
    }

    if (completedEvents && completedEvents.length > 0) {
        return (
            <>
                <div className={classes.title}>Completed Events</div>
                <div className={classes.view}>
                    {
                        completedEvents.map((event, i) => <EventCard key={event._id} event={event} isUpcoming={false} />)

                    }
                </div>
            </>
        );
    } else {
        return (
            <></>
        )
    }
}

export default CompletedList;
