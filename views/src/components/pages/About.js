import React from 'react';
import Card from '../card/Card';

const About = () => {
  return (
    <div className='about'>
      <br />
      <h2 className='heading-about'>About Events</h2>
      <div className='row'>
        <div className='upcoming col-7'>
          <div className='upcoming-content'>
            <div className='upcoming-title'>Upcoming Events</div>
            <div className='upcoming-card'>
              <div className='card-1'>
                <Card />
              </div>
              <div className='card-2'>
                <Card />
              </div>
              <div className='card-3'>
                <Card />
              </div>
              <div className='card-4'>
                <div className='cus-button'>
                  <span className='cus-button-text'>Load More</span>
                  <span className='cus-button-rarrow'>
                    <i className='fa fa-arrow-circle-right' />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='col-5'>
          <div alt='Demo' className='header-image-1' />
        </div>
      </div>
    </div>
  );
};

export default About;
