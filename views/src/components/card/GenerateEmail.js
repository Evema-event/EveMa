import React from 'react';
// import { Redirect } from 'react-router-dom';

// import EventTab from '../layout/eventTab';

// import emailContext from '../../context/email/emailContext';

const GenerateEmail = () => {
  //   const emailContext = useContext(emailContext);
  //   const email = emailContext.emailindidualemail;

  return (
    <div>
      {/* <EventTab tab='email' />
        {!emailContext.emails && <Redirect to='/'></Redirect>}
        {
          email && */}
      <div className='email-card'>
        <div className='email-title'>
          <h4>Generate E-mail to send</h4>
        </div>
        <div className='email-val'>
          <div className='email-item'>
            <h5>Title of the Event</h5>
          </div>
          <div className='email-item'>
            <h5>Subject to attach with E-mail</h5>
            <div className='emailind-value'>
              <h6>
                but also the leap into electronic typesetting, remaining
                essentially unchanged. It was popularised in the 1960s with the
                release of Letraset sheets containing Lorem Ipsum passages, and
                more recently with desktop publishing software like Aldus
                PageMaker including versions of Lorem Ipsum
              </h6>
            </div>
          </div>
          <div className='emailAdd'>
            <h5>Body of the email</h5>
            <div className='details-bg'>
              <h6>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release of Letraset sheets
                containing Lorem Ipsum passages, and more recently with desktop
                publishing software like Aldus PageMaker including versions of
                Lorem Ipsum
              </h6>
            </div>
            <div className='checkbox_send'>
              <div className='form-check form-check-inline'>
                <input
                  className='form-check-input'
                  type='checkbox'
                  id='inlineCheckbox1'
                  value='option1'
                />
                <label className='form-check-label' htmlFor='inlineCheckbox1'>
                  visitor
                </label>
              </div>
              <div className='form-check form-check-inline'>
                <input
                  className='form-check-input'
                  type='checkbox'
                  id='inlineCheckbox2'
                  value='option2'
                />
                <label className='form-check-label' htmlFor='inlineCheckbox2'>
                  Exhibitor
                </label>
              </div>
            </div>

            <button
              type='button'
              className='btn btn-primary btn-block next'
              id='link'
            >
              Send E-mail
            </button>
          </div>
        </div>
      </div>

      {/* } */}
    </div>
  );
};
export default GenerateEmail;
