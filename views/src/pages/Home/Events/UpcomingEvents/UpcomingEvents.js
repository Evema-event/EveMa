import React, { useContext } from 'react';

import classes from './upcomingEvents.module.css';
import eventClasses from '../events.module.css';

import Loadmore from '../Loadmore/Loadmore';
import Loading from '../../../../Layout/Loading';
import EventCard from '../../../EventList/EventCard/EventCard';

import EventContext from '../../../../context/event/eventContext';

const UpcomingEvents = () => {
  const { upcomingEvents, upcomingEventsLoading } = useContext(EventContext);

  if (upcomingEventsLoading) {
    return <div className={classes.upcoming}> <Loading color="light" /> </div>;
  }

  return (
    <>
    <div className={[eventClasses.title, classes.title].join(' ')}>
          Upcoming Events
        </div>
      <div className={classes.upcoming}>
      <div className={classes.left}>
        {upcomingEvents && upcomingEvents.length > 0 ? <div className={classes.eventList}>
          {upcomingEvents.map((event, i) =>
            i < 2 ? (
              <EventCard key={event._id} event={event} isUpcoming={true} />
            ) : null
          )}
        </div> : <center style={{ paddingTop: '50px' }}>No upcoming events yet!</center>}
        {upcomingEvents && upcomingEvents.length > 2 && (
          <Loadmore link='/upcomingList' />
        )}
      </div>
      <div className={classes.right}>
        <img alt='Demo' src={"https://cdn.shopify.com/s/files/1/0025/3444/1060/files/Insights_Animation-ed984277.gif?v=1588082524"} />
      </div>
    </div>
    </>
  );
};

export default UpcomingEvents;
