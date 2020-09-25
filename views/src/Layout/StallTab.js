import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import AuthContext from '../context/auth/authContext';
import StallContext from '../context/stall/stallContext';

const StallTab = (props) => {
    const authContext = useContext(AuthContext);
    const { individualStall } = useContext(StallContext);
    if (
        localStorage.getItem('role') === 'Organizer' ||
        (
            localStorage.getItem('role') === 'Exhibitor' &&
            individualStall.userId._id === authContext.userId
        )
    ) {
        return (
            <ul className="nav nav-tabs" style={{ margin: "10px 50px 0px 50px" }}>
                <li className="nav-item">
                    <Link className={props.tab === "stall" ? "nav-link active" : "nav-link"} to='/stallDetails'>Stall Details</Link>
                </li>
                <li className="nav-item">
                    <Link to='/stallvisitorList' className={props.tab === "visitor" ? "nav-link active" : "nav-link"}>
                        Visitors
                </Link>
                </li>
            </ul>
        );
    }
    return <></>;
}

export default StallTab;