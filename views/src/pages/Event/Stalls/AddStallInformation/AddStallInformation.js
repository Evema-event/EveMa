import React, { useState, useContext } from 'react';
import { Redirect } from 'react-router-dom';

import url from '../../../../server'
import axios from 'axios'
import swal from 'sweetalert'

import classes from './addstall.module.css';
import btnclass from '../../../Auth/Login/login.module.css';

import StallContext from '../../../../context/stall/stallContext';
import EventContext from '../../../../context/event/eventContext';

const AddStallInformation = (props) => {

  const stallContext = useContext(StallContext);
  const eventContext = useContext(EventContext);

  const initialState = {
    link: { value: '', error: '' },
    image: { value: '', error: '', name: '' },
    document: { value: '', error: '', name: '' },
  };

  const [fields, setFields] = useState(initialState);
  const [isSubmit, setIsSubmit] = useState(false);
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === 'link') {
      setFields({
        ...fields,
        link: {
          ...fields.link,
          value: value
        }
      })
    }
    else {
      let maxSize
      if (name === 'image') {
        maxSize = 1000000
      }
      if (name === 'document') {
        maxSize = 5000000
      }
      if (event.target.files.length !== 0) {
        if (event.target.files[0].size < maxSize) {
          setFields({
            ...fields,
            [name]: {
              value: event.target.files[0],
              error: '',
              name: event.target.files[0].name
            }
          })
        }
        else {
          setFields({
            ...fields,
            [name]: {
              value: '',
              error: `Please upload a ${name} that is less than ${maxSize / 1000000}MB`,
              name: ''
            }
          })
        }
      }
      else {
        setFields({
          ...fields,
          [name]: {
            value: '',
            error: '',
            name: ''
          }
        })
      }
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault()
    setIsLoading(true)
    let formData = new FormData()
    if (fields.link.value.trim() !== '') {
      formData.append('link', fields.link.value)
    }
    if (fields.image.value !== '') {
      formData.append('image', fields.image.value)
    }
    if (fields.document.value !== '') {
      formData.append('document', fields.document.value)
    }
    if (!formData.get('link') && !formData.get('image') && !formData.get('document')) {
      setFields({
        ...fields,
        link: {
          ...fields.link,
          error: 'Atleast one field must be filled'
        },
        image: {
          ...fields.image,
          error: 'Atleast one field must be filled'
        },
        document: {
          ...fields.document,
          error: 'Atleast one field must be filled'
        }
      })
    }
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
        'x-auth-token': localStorage.getItem('token')
      }
    }
    let addinfoUrl = url + `stall/addinfo/${stallContext.selectedStallId}`
    axios.put(addinfoUrl, formData, config)
      .then((res) => {
        stallContext.getStalls(eventContext.indivEvent._id);
        stallContext.updateIndividualStall(res.data.stall);
        swal('', 'Data added successfully', 'success')
          .then(res => {
            setIsSubmit(true)
          })
          .catch(err => {
            throw err
          })
        setIsLoading(false)
      })
      .catch((err) => {
        setIsLoading(false)
      })
  };

  console.log(stallContext.selectedStallId)
  return (
    <div>
      {isSubmit && <Redirect to='/StallDetails' />}
      {!stallContext.selectedStallId && <Redirect to='/' />}
      {!localStorage.getItem('token') && <Redirect to='/' />}
      <form className={classes['section-add']} onSubmit={handleSubmit}>
        <h3> Add More Details </h3>
        <div className={classes['content']}>
          <div className={classes['form_group']}>
            <label htmlFor='link'>Link</label>
            <input
              className={classes['form_input']}
              type='url'
              name='link'
              id='link'
              placeholder='Enter your link'
              value={fields.link.value}
              onChange={handleChange}
            />
            <p style={{ color: 'black', padding: '5px' }}>{fields.link.error}</p>
          </div>
          <div className={classes['form_group']}>
            <label htmlFor='customFile'>Upload image</label>
            <div className='custom-file'>
              <input
                type='file'
                name='image'
                className='custom-file-input'
                id='customFile'
                accept='image/*'
                onChange={handleChange}
              />
              <label className='custom-file-label' htmlFor='customFile'>
                {fields.image.name || 'Choose Image'}
              </label>
            </div>
            <p style={{ color: 'black', padding: '5px' }}>{fields.image.error}</p>
          </div>
          <div className={classes['form_group']}>
            <label htmlFor='customFile'>Upload document</label>
            <div className='custom-file'>
              <input
                type='file'
                className='custom-file-input'
                id='customFile'
                name='document'
                accept='application/*,text/*'
                onChange={handleChange}
              />
              <label className='custom-file-label' htmlFor='customFile'>
                {fields.document.name || 'Choose document'}
              </label>
            </div>
            <p style={{ color: 'black', padding: '5px' }}>{fields.document.error}</p>
          </div>
          {isLoading ? <button
            type='button'
            className={['btn btn-primary', btnclass['btn-primary']].join(' ')}
            style={{ width: '100%', textAlign: 'center', marginTop: '10px' }}
          >
            Loading
          </button> :
            <button
              type='submit'
              className={['btn btn-primary', btnclass['btn-primary']].join(' ')}
              style={{ width: '100%', textAlign: 'center', marginTop: '10px' }}
            >
              Submit
          </button>}
        </div>
      </form>
    </div>
  );
};

export default AddStallInformation;
