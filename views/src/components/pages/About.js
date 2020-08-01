import React, { useContext } from 'react';
import Upcoming from '../card/upCard';
import Completed from '../card/compCard';
import EventContext from '../../context/event/eventContext';

const About = () => {
  const eventContext = useContext(EventContext);

  return (
    <div className='about'>
      <div className='section-about'>
        {/* HEADING SECTION */}

        <h2>About Events</h2>

        {/*  UPCOMING LEFT CARDS */}

        <div className='upLeft-card'>
          {/* UPCOMING LEFT TITLE */}
          <div className='title upLeft-title'>Upcoming Events</div>

          <div className='up-card'>
            <div className='card-1'>
              <Upcoming />
            </div>
          </div>
          {eventContext.upcomingEvents &&
            eventContext.upcomingEvents.length > 4 && (
              <div className='card-4'>
                <div className='cus-button'>
                  <span className='cus-button-text'>Load More</span>
                  <span className='cus-button-rarrow'>
                    <i className='fa fa-arrow-circle-right' />
                  </span>
                </div>
              </div>
            )}
        </div>

        {/* UPCOMING RIGHT SECTION */}
        <div className='upRight'>
          <div alt='Demo' className='upRight-img' />
        </div>
      </div>

      {/* completed */}
      <div className='section-comp'>
        {/*  UPCOMING LEFT CARDS */}

        <div className='upRight'>
          <div alt='Demo' className='compLeft-img' />
        </div>

        {/* UPCOMING RIGHT SECTION */}

        <div className='upLeft-card'>
          {/* UPCOMING LEFT TITLE */}
          <div className='comp-title title'>Completed Events</div>

          <div className='comp-card'>
            <div className='card-2'>
              <Completed />
            </div>
          </div>
          {eventContext.completedEvents &&
            eventContext.completedEvents.length > 6 && (
              <div className='card-4'>
                <div className='cus-button'>
                  <span className='cus-button-text'>Load More</span>
                  <span className='cus-button-rarrow'>
                    <i className='fa fa-arrow-circle-right' />
                  </span>
                </div>
              </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default About;

// import React from 'react';
// import Card from '../card/Card';

// const About = () => {
//   return (
//     <div className='about'>
//       <br />
//       <h2 className='heading-about'>About Events</h2>
//       <div className='row'>
//         <div className='upcoming col-7'>
//           <div className='upcoming-content'>
//             <div className='upcoming-title'>Upcoming Events</div>
//             <div className='upcoming-card'>
//               <div className='card-1'>
//                 <Card />
//               </div>
//               <div className='card-2'>
//                 <Card />
//               </div>
//               <div className='card-3'>
//                 <Card />
//               </div>
//               <div className='card-4'>
//                 <div className='cus-button'>
//                   <span className='cus-button-text'>Load More</span>
//                   <span className='cus-button-rarrow'>
//                     <i className='fa fa-arrow-circle-right' />
//                   </span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className='col-5'>
//           <div alt='Demo' className='header-image-1' />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default About;
