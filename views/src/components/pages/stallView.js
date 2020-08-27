import StallList from '../card/stallList';
import React from 'react';
import { Link } from 'react-router-dom';

const stallView = () => {
  return (
    <div>
      <>
        <ul className='nav nav-pills  nav-justified' id='myTab' role='tablist'>
          <li className='nav-item'>
            <Link
              className='nav-link active'
              id='stall-tab'
              data-toggle='tab'
              role='tab'
              aria-controls='stall'
              aria-selected='true'
              to='/stallList'
            >
              Stall
            </Link>
          </li>
          <li className='nav-item'>
            <Link
              className='nav-item nav-link'
              id='conference-tab'
              data-toggle='tab'
              role='tab'
              aria-controls='conference'
              aria-selected='false'
              to='/conferenceList'
            >
              Conference
            </Link>
          </li>
        </ul>
      </>
      <div className='tab-content' id='myTabContent'>
        <div
          className='tab-pane active'
          id='stall'
          role='tabpanel'
          aria-labelledby='stall-tab'
        >
          <StallList />
        </div>
        <div
          className='tab-pane'
          id='conference'
          role='tabpanel'
          aria-labelledby='conference-tab'
        >
          <StallList />
        </div>
      </div>
    </div>
  );
};

export default stallView;
