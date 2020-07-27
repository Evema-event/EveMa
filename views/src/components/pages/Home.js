import React from 'react';
import img from '../../img/bg-1.png';

const Home = () => {
  return (
    <div className='home'>
      <header className='header'>
        {/* ROW */}
        <div className='row'>
          {/* IMAGE */}

          <div className='col'>
            <img src={img} alt='Demo' />
          </div>

          {/* Content */}

          <div className='col'>
            <div className='heading-content'>
              <h1 className='heading-primary'>Welcome to EveMa</h1>
              <p>
                Greetings to everyone, <br /> This is the event Management page
                for the large events and <br /> for more about events <br />{' '}
                scroll down
              </p>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Home;
