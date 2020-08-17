import React from 'react';
import { Link } from 'react-router-dom';

const Button = () => {
  return (
    <div>
      <Link to='/addEvent/0'>
        <button className='fixed-button wobble' type='button'>
          <i className='fas fa-plus'></i>
        </button>
      </Link>
    </div>
  );
};

export default Button;
