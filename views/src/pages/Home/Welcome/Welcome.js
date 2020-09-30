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
          <span style={{ color: "white" }}>“Don’t find customers for your products, <br /> find products for your customers.”
          <br />-Seth Godin</span><br /><br />
          Ever wanted to be a part of something bigger,<br /> something that excites you and keeps you engaged?<br />
          You can be a part of our Events that are exciting and captivating!<br />
          Grow as a person to grow your business!<br />
          Be a part of this experience
        </p>
      </div>
    </div>
  );
};

export default Welcome;
