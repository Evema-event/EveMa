import React, { useState } from 'react';

import classes from './addstall.module.css';
import btnclass from '../../../Auth/Login/login.module.css';

const AddStallInformation = () => {
  const initialState = {
    link: { value: '', error: '' },
    files: { value: '', error: '' },
  };

  const [fields, setFields] = useState(initialState);
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    const updatedField = {
      ...fields[name],
    };

    updatedField.value = value;

    setFields({
      ...fields,
      [name]: updatedField,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setFields({
      ...fields,
    });
    setIsSubmit(true);
  };

  return (
    <div>
      <form className={classes['section-add']} onSubmit={handleSubmit}>
        <h3> Add More Details </h3>
        <div className={classes['content']}>
          <div className={classes['form_group']}>
            <label htmlFor='link'>Link</label>
            <input
              className={classes['form_input']}
              type='text'
              name='link'
              id='link'
              placeholder='Enter your link'
              value={fields.link.value}
              onChange={handleChange}
            />
          </div>
          <div className={classes['form_group']}>
            <label htmlFor='customFile'>File Upload</label>
            <div className='custom-file'>
              <input
                type='file'
                className='custom-file-input'
                id='customFile'
              />
              <label className='custom-file-label' htmlFor='customFile'>
                Choose file
              </label>
            </div>
          </div>
          <div className={classes['form_group']}>
            <label htmlFor='customFile'>Image Upload</label>
            <div className='custom-file'>
              <input
                type='file'
                className='custom-file-input'
                id='customFile'
              />
              <label className='custom-file-label' htmlFor='customFile'>
                Choose file
              </label>
            </div>
          </div>
          <button
            type='submit'
            className={['btn btn-primary', btnclass['btn-primary']].join(' ')}
            style={{ width: '100%', textAlign: 'center', marginTop: '10px' }}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddStallInformation;
