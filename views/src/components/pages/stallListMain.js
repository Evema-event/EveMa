import StallList from '../card/stallList';
import React from 'react';
import { Link } from 'react-router-dom';
import ConferenceList from '../card/conferenceList';

const stallListMain = () => {
  return (
    <div>
      <>
        <div>
          <div className='list_title'>Conference List</div>
          <div className='view'>
            <ConferenceList />
            <ConferenceList />
            <ConferenceList />
            <ConferenceList />
          </div>
        </div>
        <div>
          <div className='list_title'>Stall List</div>
          <div className='view'>
            <StallList />
            <StallList />
            <StallList />
            <StallList />
            <StallList />
          </div>
        </div>
      </>
    </div>
  );
};

export default stallListMain;
