import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';

import classes from './stallList.module.css';

import StallCard from './StallCard/StallCard';
import EventTab from '../../../Layout/EventTab';
import Loading from '../../../Layout/Loading';

import EventContext from '../../../context/event/eventContext';
import StallContext from '../../../context/stall/stallContext';
import AuthContext from '../../../context/auth/authContext';

const Stalls = () => {
  const { selectedEvent } = useContext(EventContext);
  const { stalls, stallLoading } = useContext(StallContext);
  const { userId } = useContext(AuthContext)

  if (stallLoading) {
    return (
      <>
        <EventTab tab='stall' />
        <center style={{ marginTop: "100px" }}>
          <Loading color="info"></Loading>
        </center>
      </>
    );
  }

  if (localStorage.getItem('role') === 'Exhibitor') {
    let myStalls = []
    let otherStalls = []

    if (stalls && stalls.length > 0) {
      stalls.forEach((stall) => {
        if (userId === stall.userId._id) {
          myStalls.push(stall)
        }
        else {
          otherStalls.push(stall)
        }
      })
    }

    return (
      <>
        {!selectedEvent && <Redirect to='/' />}
        <EventTab tab='stall' />
        <h1 style={{ margin: "10px 50px", fontSize: "28px" }}>My stalls</h1>
        <div className={classes['view']}>
          {
            myStalls.length > 0 ?
              myStalls.map((stall) => <StallCard stall={stall} key={stall._id} />) :
              <center>No stalls yet!</center>
          }
        </div>
        <h1 style={{ margin: "10px 50px", fontSize: "28px" }}>Stalls</h1>
        <div className={classes['view']}>
          {
            otherStalls.length > 0 ?
              otherStalls.map((stall) => <StallCard stall={stall} key={stall._id} />) :
              <center>No stalls yet!</center>
          }
        </div>
      </>
    );
  }
  return (
    <>
      {!selectedEvent && <Redirect to='/' />}
      <EventTab tab='stall' />
      <div className={classes['view']}>
        {
          stalls && stalls.length > 0 ?
            stalls.map((stall) => <StallCard stall={stall} key={stall._id} />) :
            <center>No stalls yet!</center>
        }
      </div>
    </>
  );
};

export default Stalls;
