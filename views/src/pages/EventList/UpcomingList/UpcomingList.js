import React, { useContext, useEffect } from 'react';

import classes from '../eventList.module.css';

import EventCard from '../EventCard/EventCard';
import Loading from '../../../Layout/Loading';

import EventContext from '../../../context/event/eventContext';
import AuthContext from '../../../context/auth/authContext';

const UpcomingList = () => {
    const { getUpcomingEvent, upcomingEvents, upcomingEventsLoading } = useContext(EventContext);
    const { registeredEvents, registeredStalls, registeredConferences } = useContext(AuthContext);

    useEffect(() => {
        if (!upcomingEventsLoading && !upcomingEvents) {
            getUpcomingEvent();
        }
        // eslint-disable-next-line
    }, []);

    if (upcomingEventsLoading) {
        return (
            <>
                <div className={classes.title}>Upcoming Events</div>
                <center><Loading color="info" /></center>
            </>
        );
    }

    if (upcomingEvents && upcomingEvents.length === 0) {
        return <center style={{ marginTop: "100px" }}>No events yet!</center>
    }

    if (localStorage.getItem('role') === 'Visitor') {
        let myEvents = [];
        let otherEvents = [];

        if (upcomingEvents && upcomingEvents.length > 0) {
            upcomingEvents.forEach(event => {
                if (registeredEvents.includes(event._id)) {
                    myEvents.push(event);
                } else {
                    otherEvents.push(event);
                }
            })
        }

        return (
            <>
                <div className={classes.title}>Upcoming Events</div>
                <p className={classes.subtitle}>Registered Events</p>
                <div className={classes.view}>
                    {
                        myEvents.length > 0 ?
                            myEvents.map((event, i) => <EventCard key={event._id} event={event} isUpcoming={true} />) : <center>No events yet!</center>
                    }
                </div>
                <p className={classes.subtitle}>Events</p>
                <div className={classes.view}>
                    {
                        otherEvents.length > 0 ?
                            otherEvents.map((event, i) => <EventCard key={event._id} event={event} isUpcoming={true} />) : <center>No events yet!</center>
                    }
                </div>
            </>
        );
    } else if (localStorage.getItem('role') === 'Exhibitor') {
        let myEvents = [];
        let otherEvents = [];

        if (upcomingEvents && upcomingEvents.length > 0) {
            upcomingEvents.forEach(event => {
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
                <div className={classes.title}>Upcoming Events</div>
                <p className={classes.subtitle}>Exhibited Events</p>
                <div className={classes.view}>
                    {
                        myEvents.length > 0 ?
                            myEvents.map((event, i) => <EventCard key={event._id} event={event} isUpcoming={true} />) : <center>No events yet!</center>
                    }
                </div>
                <p className={classes.subtitle}>Events</p>
                <div className={classes.view}>
                    {
                        otherEvents.length > 0 ?
                            otherEvents.map((event, i) => <EventCard key={event._id} event={event} isUpcoming={true} />) : <center>No events yet!</center>
                    }
                </div>
            </>
        );
    }

    if (upcomingEvents && upcomingEvents.length > 0) {
        return (
            <>
                <div className={classes.title}>Upcoming Events</div>
                <div className={classes.view}>
                    {
                        upcomingEvents.map((event, i) => <EventCard key={event._id} event={event} isUpcoming={true} />)
                    }
                </div>
            </>
        );
    } else {
        return (
            <>
                <div className={classes.title}>Upcoming Events</div>
                <center className="h6">No upcoming events yet!</center>
            </>
        );
    }
}

export default UpcomingList;
