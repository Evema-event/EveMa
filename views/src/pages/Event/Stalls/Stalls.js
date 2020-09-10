import React, { useContext, useEffect } from 'react';
import { Redirect } from 'react-router-dom';

import classes from '../../EventList/eventList.module.css';

import StallCard from './StallCard/StallCard';
import EventTab from '../../../Layout/eventTab';

import EventContext from '../../../context/event/eventContext';
import StallContext from '../../../context/stall/stallContext';

const Stalls = () => {
  const { selectedEvent } = useContext(EventContext);
  const { stalls, getStalls } = useContext(StallContext);

  useEffect(() => {
    getStalls(selectedEvent);
    // eslint-disable-next-line
  }, []);

  return (
    <>
      {!selectedEvent && <Redirect to='/' />}
      <EventTab tab='stall' />
      <div className={classes['view']}>
        {stalls &&
          stalls.length > 0 &&
          stalls.map((stall) => <StallCard stall={stall} key={stall._id} />)}
      </div>
      {stalls && stalls.length === 0 && <center>No stalls yet!</center>}
    </>
  );
};

export default Stalls;
