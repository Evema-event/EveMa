import React from 'react';
import { Link } from 'react-router-dom';

const StallTab = (props) => {
    return (
        <ul className="nav nav-tabs" style={{ margin: "10px 50px 0px 50px" }}>
            <li className="nav-item">
                <Link className={props.tab === "stall" ? "nav-link active" : "nav-link"} to='/stallDetails'>Stall Details</Link>
            </li>
            {
                (localStorage.getItem('role') === 'Organizer' || localStorage.getItem('role') === 'Exhibitor') &&
                <li className="nav-item">
                    <Link to='/stallvisitorList' className={props.tab === "visitor" ? "nav-link active" : "nav-link"}>
                        Visitors
                </Link>
                </li>
            }
        </ul>
    );
}

export default StallTab;