import React from 'react';
import UpcomingList from './UpcomLoadPage';
import CompletedList from './CompLoadPage';

const EventList = () => {
    return (
        <div>
            <UpcomingList />
            <CompletedList />
        </div>
    )
}

export default EventList;
