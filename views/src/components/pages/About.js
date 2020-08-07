import React, { useContext } from 'react';
import Upcoming from '../card/upCard';
import Completed from '../card/compCard';
import EventContext from '../../context/event/eventContext';
import UpImg from '../../img/Mask2.png';
import { Link } from 'react-router-dom';

const About = () => {
  const eventContext = useContext(EventContext);

  return (
    <div className='about'>
      {/* HEADING SECTION */}

      <h2>About Events</h2>

      {/* ABOUT CONTENT */}

      <div className='section-about'>
        {/*  UPCOMING LEFT CARDS */}

        <div className='upLeft'>
          {/* UPCOMING LEFT TITLE */}
          <div className='title upLeft-title'>Upcoming Events</div>

          <div className='up-card'>
            <div className='card-1'>
              <Upcoming />
            </div>
          </div>
          {eventContext.upcomingEvents &&
            eventContext.upcomingEvents.length > 2 && (
              <div className='card-4'>
                <Link href='/upcoming-list' className='cus-button '>
                  <span className='cus-hov'>
                    <span className='cus-button-text'>Load More</span>
                    <span className='cus-button-rarrow'>
                      <i className='fa fa-arrow-circle-right' />
                    </span>
                  </span>
                </Link>
              </div>
            )}
        </div>

        {/* UPCOMING RIGHT SECTION */}
        <div className='upRight'>
          <img alt='Demo' src={UpImg} />
        </div>
      </div>

      {/* completed */}
      <div className='section-comp'>
        {/* UPCOMING RIGHT SECTION */}

        <div className='upLeft'>
          {/* UPCOMING LEFT TITLE */}
          <div className='upLeft-title title'>Completed Events</div>

          <div className='comp-card'>
            <div className='card-2'>
              <Completed />
            </div>
          </div>
          {eventContext.completedEvents &&
            eventContext.completedEvents.length > 6 && (
              <div className='card-4'>
                <Link href='/completed-list' className='cus-button'>
                  <span className='cus-hov'>
                    <span className='cus-button-text'>Load More</span>
                    <span className='cus-button-rarrow'>
                      <i className='fa fa-arrow-circle-right' />
                    </span>
                  </span>
                </Link>
              </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default About;
