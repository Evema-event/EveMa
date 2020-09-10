import React, { useContext } from 'react';

import UpcomingImage from '../../../../img/upcoming.png';

import classes from './upcomingEvents.module.css';
import eventClasses from '../events.module.css';

import Loadmore from '../Loadmore/Loadmore';
import EventCard from '../../../EventList/EventCard/EventCard';

import EventContext from '../../../../context/event/eventContext';

const UpcomingEvents = () => {
  const { upcomingEvents } = useContext(EventContext);

  return (
    <div className={classes.upcoming}>
      <div className={classes.left}>
        <div className={[eventClasses.title, classes.title].join(' ')}>
          Upcoming Events
        </div>
        <div className={classes.eventList}>
          {upcomingEvents &&
            upcomingEvents.map((event, i) =>
              i < 2 ? (
                <EventCard key={event._id} event={event} isUpcoming={true} />
              ) : null
            )}
        </div>
        {upcomingEvents && upcomingEvents.length > 2 && (
          <Loadmore link='/upcomingList' />
        )}
      </div>
      <div className={classes.right}>
        <img alt='Demo' src={UpcomingImage} />
      </div>
    </div>
  );
};

export default UpcomingEvents;
