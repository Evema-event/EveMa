import React from 'react';

import classes from './footer.module.css';

const Footer = () => {
    return (
        <div className={classes.footer}>
            <div className={classes.copyright}>Copyright &copy; 2020.</div>
            <div className={classes.social}>
                <div className={classes.socialFooter}>
                    <i className='fa fa-facebook' />
                    <p>Facebook</p>
                </div>
                <div className={classes.socialFooter}>
                    <i className='fa fa-twitter' />
                    <p>Twitter</p>
                </div>
                <div className={classes.socialFooter}>
                    <i className='fa fa-linkedin' />
                    <p>LinkedIn </p>
                </div>
            </div>
        </div>
    )
}

export default Footer;
