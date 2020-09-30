import React from 'react';
import { Link } from 'react-router-dom';

import classes from './loadmore.module.css';

const Loadmore = (props) => {
    return (
        <div className={classes.loadMore}>
            <Link to={props.link} className={classes.button}>
                <span className={classes.hoverLine}>
                    <span className={classes.buttonText}>Load more</span>
                    <span className={classes.rarrow}>
                        <i className='fa fa-arrow-circle-right' />
                    </span>
                </span>
            </Link>
        </div>
    );
}

export default Loadmore;
