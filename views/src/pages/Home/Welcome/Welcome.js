import React from 'react';

import classes from './welcome.module.css';

const Welcome = () => {
  return (
    <div className={classes.sectionHome}>
      <div className={classes.headerImage}>
        <img alt='Demo' src={"https://i.pinimg.com/originals/16/9c/11/169c11293f5c08a325ee1bbc8a0d4cb8.gif"} />
      </div>

      <div className={classes.headerContent}>
        <h1 className={classes.headerPrimary}>Welcome to EveMa</h1>
        <p className={classes.paragraph}>
          Greetings to everyone, <br /> This is the Event Management page for
            the large events and <br /> for more about events <br /> scroll down
          </p>
      </div>
    </div>
  );
};

export default Welcome;
