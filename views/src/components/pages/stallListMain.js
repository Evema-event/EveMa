import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';

import StallList from '../card/stallList';
import EventTab from '../layout/eventTab';

import EventContext from '../../context/event/eventContext';
import StallContext from '../../context/stall/stallContext';

const StallListMain = () => {

  const eventContext = useContext(EventContext);
  const stallContext = useContext(StallContext);

  return (
    <>
      {!eventContext.selectedEvent && <Redirect to='/' />}
      <EventTab tab="stall" />
      <div className='view'>
        {
          stallContext.stalls && stallContext.stalls.map(stall => <StallList
            stall={stall}
            key={stall._id}
          />
          )
        }
      </div>
      {
        stallContext.stalls && stallContext.stalls.length === 0 && <center>No stalls yet!</center>
      }
    </>
  );
};

export default StallListMain;
