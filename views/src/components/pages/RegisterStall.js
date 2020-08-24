import React from 'react';
import img from '../../img/register.png';

const RegisterStall = () => {
  return (
    <div>
      <div className='section-register'>
        <img className='reg-img' src={img} alt='Register Stall' />
        <form>
          <h2>Register Stall</h2>
          <div className='form_reg-group'>
            <label htmlFor='product'>Product Name</label>
            <input
              type='text'
              name='productName'
              id='product'
              className='reg-input'
              value=''
              placeholder='Product Name'
            />
          </div>
          <div className='form_reg-group'>
            <label htmlFor='domain'>Domain</label>
            <input
              type='text'
              name='domain'
              id='domain'
              className='reg-input'
              value=''
              placeholder='Domain'
            />
          </div>
          <div className='form_reg-group'>
            <label htmlFor='productDesc'>Product Description</label>
            <textarea
              type='text'
              name='productDescription'
              id='productDesc'
              className='reg-input'
              value=''
              rows='5'
              cols='50'
              placeholder='Enter the product description'
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterStall;
