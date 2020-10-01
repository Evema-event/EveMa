import React from 'react';

import classes from './welcome.module.css';

const Welcome = () => {
  return (
    <div className={classes.sectionHome}>
      <div className={classes.headerImage}>
        <img
          alt='Demo'
          src={
            'https://i.pinimg.com/originals/16/9c/11/169c11293f5c08a325ee1bbc8a0d4cb8.gif'
          }
        />
      </div>

      <div className={classes.headerContent}>
        <h1 className={classes.headerPrimary}>Welcome to EveMa</h1>
        <p className={classes.paragraph}>
          Ever wanted to be a part of something bigger and better?
          <br /> Let Evema engage, captivate and excite you!
          <br /> No more dull exhibitions,
          <br /> No more missed leads and No more frustration!
          <br /> Bask in this hassle free experience!
        </p>
      </div>
    </div>
  );
};

export default Welcome;
