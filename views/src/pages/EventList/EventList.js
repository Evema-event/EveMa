import React from 'react';

import UpcomingList from './UpcomingList/UpcomingList';
import CompletedList from './CompletedList/CompletedList';

const EventList = () => {
  return (
    <div>
      <UpcomingList />
      <CompletedList />
    </div>
  );
};

export default EventList;
