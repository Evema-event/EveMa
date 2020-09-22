import React from 'react';

import Welcome from './Welcome/Welcome';
import Events from './Events/Events';
import classes from './home.module.css';

import Footer from '../../Layout/Footer/Footer';

const Home = () => {
  return (
    <>
      <div className={classes.background}>
        <Welcome />
        <Events />
      </div>
      <Footer />
    </>
  );
};

export default Home;
