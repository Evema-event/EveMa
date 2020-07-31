import React from 'react';

function UpcomingCard(props) {
  return (
    <div className='UpcomingCard'>
      <div className='IndiBg'>
        <div className='EventName'>Event Name</div>
        <div className=' EventDetails'>Event Details</div>
        <div className='DescriptionRow'>
          <div className='Description'>
            <div className='DiscriptionBg'>
              <div className='EventDescription'>Event Description</div>
            </div>
          </div>
          <div className='Last'>
            <div className='DateStack'>
              <div className='Date'>31/02/2020</div>
              <div className='LastBg'>
                <div className='LastDate'>Last Date for Registration</div>
                <div className='Time'>11.59 P.M</div>
                <div className='Venue'>Venue</div>
              </div>
            </div>
          </div>
        </div>
        <div className='ContactDetails'>Contact Details</div>
        <div className='ContactRow'>
          <div className='Contact'>
            <div className='ContactBg'>
              <div className='MailRow'>
                <div className='Mail'>Mail Adresss : event@gmail.com</div>
                <div className='Phone'>Phone Number: 9876543210</div>
              </div>
            </div>
          </div>
          <div className='RegisterButton'>
            <div className='RegisterBg'>
              <div className='Register'>REGISTER</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpcomingCard;
