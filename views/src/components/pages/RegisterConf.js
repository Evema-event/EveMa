import React,{useState} from 'react';
import img from '../../img/conference.png';
import { Link, Redirect } from 'react-router-dom';

const RegisterConf = () => {
    const initialState = {
       confTitle : { value: '', error: '' },
        confDesc: { value: '', error: '' },
        conferenceTheme: { value: '', error: '' },
        confVenue: { value: '', error: '' },
        stDate: { value: '', error: '' },
        stTime: { value: '', error: '' },
        edTime: { value: '', error: '' }
      };
    
      const [fields, setFields] = useState(initialState);
      const [submit, setSubmit] = useState(false);
      const [loading, setLoading] = useState(false);
    
      const handleChange = (event) => {
        const { name, value } = event.target;
        const updatedFields = {
          ...fields[name],
        };
    
        updatedFields.value = value;
    
        setFields({
          ...fields,
          [name]: updatedFields,
        });
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        let isError = false;
        if (fields.confTitle.value.length < 2) {
          isError = true;
          fields.confTitle.error =
            'Conference Title must be greater than 2 characters';
        } else {
          fields.confTitle.error = '';
        }
        if (fields.conferenceTheme.value.length < 5) {
          isError = true;
          fields.conferenceTheme.error = 'Domain must be greater than 5 characters';
        } else {
          fields.conferenceTheme.error = '';
        }
        if (fields.confDesc.value.length < 15) {
          isError = true;
          fields.confDesc.error =
            'Description must be greater than 15 characters';
        } else {
          fields.confDesc.error = '';
        }
        if (fields.confVenue.value.length < 3) {
            isError = true;
            fields.confVenue.error =
              'Conference Venue must be greater than 3 characters';
          } else {
            fields.confVenue.error = '';
          }
          if (new Date(fields.stDate.value).getTime() < Date.now()) {
            isError = true;
            fields.stDate.error = 'Enter a valid date';
          } else {
            fields.stDate.error = '';
          }
      
        //   if (
        //     new Date(fields.endDate.value).getTime() <
        //     new Date(fields.startDate.value).getTime()
        //   ) {
        //     isError = true;
        //     fields.endDate.error = 'Enter a valid date';
        //   } else {
        //     fields.endDate.error = '';
        //   }
    
        setFields({ ...fields });
        setSubmit(true);
      };
    

  return(
    <div>
    <div className='section-conf'>
        {/* {submit && <Redirect to='/' />} */}
        <img className='reg-img' src={img} alt='Register Conference' />
        <form onSubmit={handleSubmit}>
          <h2>Register Conference</h2>
          <div className='reg_grid'>
            <div className='form_reg-group'>
            
             <label htmlFor='conference'>Title</label>
                <input
                 type='text'
                 name='confTitle'
                 id='conference'
                 className='reg-input'
                 value={fields.confTitle.value}
                 onChange={handleChange}
                 placeholder='Title'
                 required
                />
              <h6>{fields.confTitle.error}</h6>
            </div>
            <div className='form_reg-group'>
                <label htmlFor='domain'>Domain</label>
                <input
                    type='text'
                    name='conferenceTheme'
                    id='domain'
                    className='reg-input'
                    value={fields.conferenceTheme.value}
                    onChange={handleChange}
                    placeholder='Domain'
                    required
                    />
                <h6>{fields.conferenceTheme.error}</h6>
            </div>
            <div className='form_reg-group'>
                <label htmlFor='venue'>Venue</label>
                <input
                    type='text'
                    name='confVenue'
                    id='venue'
                    className='reg-input'
                    value={fields.confVenue.value}
                    onChange={handleChange}
                    placeholder='Venue'
                    required
                    />
                <h6>{fields.confVenue.error}</h6>
            </div>
            
            <div className='form_reg-group'>
                <label htmlFor='Date'>Date</label>
                <input 
                    className='reg-input'
                    type='date'
                    name='stDate'
                    id='Date'
                    value={fields.stDate.value}
                    onChange={handleChange}
                    placeholder='Date of Conference'
                    required
                    />
                <h6>{fields.stDate.error}</h6>
            </div>
            <div className='form_reg-group'>
                <label htmlFor='startTime'>Start Time</label>
                <input
                className='reg-input'
                type='text'
                name='stTime'
                id='startTime'
                value={fields.stTime.value}
                onChange={handleChange}
                placeholder='Start Time'
                required
                />
                <h6>{fields.stTime.error}</h6>
            </div>
            <div className='form_reg-group'>
                <label htmlFor='endTime'>End Time</label>
                <input
                    className='reg-input'
                    type='text'
                    name='edTime'
                    id='endTime'
                    value={fields.edTime.value}
                    onChange={handleChange}
                    placeholder='End Time'
                    required
                    />
                <h6>{fields.edTime.error}</h6>
            </div>
            <div className='form_reg-group reg_text'>
                <label htmlFor='description'>Description</label>
                <textarea
                    type='text'
                    name='confDesc'
                    id='description'
                    className='reg_txt'
                    rows='5'
                    cols='50'
                    value={fields.confDesc.value}
                    onChange={handleChange}
                    placeholder='Enter a Short Description'
                    required
                    />
                <h6>{fields.confDesc.error}</h6>
            </div>
            <Link to='/'>
            <button type='button' className='btn btn-primary btn-block can'>
                Cancel
            </button>
            </Link>
            {loading ? (
                <button
                id='link'
                className='btn btn-primary btn-block can next'
                disable={loading.toString()}
                >
                Loading
                </button>
            ) : (
                <button
                type='submit'
                className='btn btn-primary btn-block can next'
                id='link'
                >
                Register
                </button>
            )}
            
            </div>
        </form>
    </div>
  </div>
  )
};

export default RegisterConf;
