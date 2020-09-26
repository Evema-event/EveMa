import React from 'react';
import { Link } from 'react-router-dom';

import classes from './button.module.css';

const Button = () => {
  return (
    <div>
      <Link to='/admin/addEvent/0'>
        <button
          className={[classes['fixed-button'], 'wobble'].join(' ')}
          type='button'
        >
          <i className='fa fa-plus'></i>
        </button>
      </Link>
    </div>
  );
};

export default Button;
