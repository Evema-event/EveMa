import StallList from '../card/stallList';
import React from 'react';
import EventTab from '../layout/eventTab';

const StallListMain = () => {
  return (
    <>
      <EventTab tab="stall" />
      <div className='view'>
        <StallList />
        <StallList />
        <StallList />
        <StallList />
        <StallList />
      </div>
    </>
  );
};

export default StallListMain;
