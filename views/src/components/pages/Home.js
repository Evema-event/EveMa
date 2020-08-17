import React from 'react';
import About from './About';
import HeaderImage from '../../img/bg-1.png';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <div className='box'>
        <div className='section-home'>
          <header className='header'>
            {/* IMAGE */}

            <div className='header-image'>
              <img alt='Demo' src={HeaderImage} />
            </div>

            {/* Content */}

            <div className='header-content'>
              <h1 className='header-primary'>Welcome to EveMa</h1>
              <p>
                Greetings to everyone, <br /> This is the Event Management page
                for the large events and <br /> for more about events <br />{' '}
                scroll down
              </p>
            </div>
          </header>
        </div>
        <Link to='/addEvent/0'>
          <button className='fixed-button wobble' type='button'>
            <i className='fas fa-plus'></i>
          </button>
        </Link>
        <About />
      </div>
      <div className='footer'>
        <div className='copyright'>Copyright &copy; 2020.</div>
        <div className='social'>
          <div className='social-footer'>
            <i className='fa fa-facebook' />
            <p>Facebook</p>
          </div>
          <div className='social-footer'>
            <i className='fa fa-twitter' />
            <p>Twitter</p>
          </div>
          <div className='social-footer'>
            <i className='fa fa-linkedin' />
            <p>LinkedIn </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
