import React from 'react';

const Home = () => {
  return (
    <div className='section-home'>
      <header className='header'>
        {/* IMAGE */}

        <div>
          <div alt='Demo' className='header-image' />
        </div>

        {/* Content */}

        <div className='header-content'>
          <h1 className='header-primary'>Welcome to EveMa</h1>
          <p>
            Greetings to everyone, <br /> This is the Event Management page for
            the large events and <br /> for more about events <br /> scroll down
          </p>
        </div>
      </header>
    </div>
  );
};

export default Home;
