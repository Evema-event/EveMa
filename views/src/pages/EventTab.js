import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import swal from 'sweetalert';

const EventTab = (props) => {

    const [redirectStall, setRedirectStall] = React.useState(false);
    const [redirectConference, setRedirectConference] = React.useState(false);

    const onClickStall = () => {
        if (localStorage.getItem('token')) {
            setRedirectStall(true);
        } else {
            swal('Oops', 'Please login to view stalls', 'error');
        }
    }

    const onClickConference = () => {
        if (localStorage.getItem('token')) {
            setRedirectConference(true);
        } else {
            swal('Oops', 'Please login to view conference', 'error');
        }
    }

    return (
        <ul className="nav nav-tabs" style={{ margin: "10px 50px 0px 50px" }}>
            {redirectStall && <Redirect to='/stallList'></Redirect>}
            {redirectConference && <Redirect to='/conferenceList'></Redirect>}
            <li className="nav-item">
                <Link className={props.tab === "event" ? "nav-link active" : "nav-link"} to='/eventdetails'>Event Details</Link>
            </li>
            <li className="nav-item">
                <Link className={props.tab === "stall" ? "nav-link active" : "nav-link"} to='#' onClick={onClickStall} >Stalls</Link>
            </li>
            <li className="nav-item">
                <Link className={props.tab === "conference" ? "nav-link active" : "nav-link"} to='#' onClick={onClickConference}>Conferences</Link>
            </li>
            {
                localStorage.getItem('role') === 'Organizer' &&
                <li className="nav-item">
                    <Link to='/admin/visitorsList' className={props.tab === "visitor" ? "nav-link active" : "nav-link"}>
                        Visitors
                </Link>
                </li>
            }
        </ul>
    );
}

export default EventTab;