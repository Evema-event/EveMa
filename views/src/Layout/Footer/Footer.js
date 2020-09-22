import React from 'react';
import { Link } from 'react-router-dom';

import classes from './footer.module.css';

const Footer = () => {
  return (
    <div>
      <footer className={classes['footer']}>
        <div className='container'>
          <div className='row'>
            <div className='col-md-8 col-sm-6 col-xs-12'>
              <p className={classes['copyright-text']}>
                Copyright &copy; 2020 All Rights Reserved by
                <Link className={classes['copyright-link']} to='/'>
                  {' '}
                  EveMa
                </Link>
                .
              </p>
            </div>
            <div className='col-md-4 col-sm-6 col-xs-12'>
              <ul className={classes['social-icons']}>
                <li>
                  <Link className={classes['facebook']} to='/'>
                    <i className='fab fa-facebook' />
                  </Link>
                </li>
                <li>
                  <Link className={classes['twitter']} to='/'>
                    <i className='fab fa-twitter' />
                  </Link>
                </li>
                <li>
                  <Link className={classes['youtube']} to='/'>
                    <i className='fab fa-youtube' />
                  </Link>
                </li>
                <li>
                  <Link className={classes['linkedin']} to='/'>
                    <i className='fab fa-linkedin' />
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
