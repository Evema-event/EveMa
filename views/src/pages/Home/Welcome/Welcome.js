import React from 'react';

import HeaderImage from '../../../img/home.png';
import classes from './welcome.module.css';

const Welcome = () => {
  return (
    <div className={classes.sectionHome}>
      <header className={classes.header}>
        <div className={classes.headerImage}>
          <img alt='Demo' src={HeaderImage} />
        </div>

        <div className={classes.headerContent}>
          <h1 className={classes.headerPrimary}>Welcome to EveMa</h1>
          <p>
            Greetings to everyone, <br /> This is the Event Management page for
            the large events and <br /> for more about events <br /> scroll down
          </p>
        </div>
      </header>
    </div>
  );
};

export default Welcome;
