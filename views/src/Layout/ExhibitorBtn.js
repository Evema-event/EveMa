import React, { useState, useContext } from 'react';
import { Redirect, Link } from 'react-router-dom';
import swal from 'sweetalert';


import btnclass from '../pages/Auth/Login/login.module.css';
import url from '../server';
import axios from 'axios';

import AuthContext from '../context/auth/authContext';
import EventContext from '../context/event/eventContext';


const ExhibitorBtn = (props) => {

    const authContext = useContext(AuthContext);
    const eventContext = useContext(EventContext);
    const [deleteStallRedir, setDeleteStallRedir] = useState(false);
    const [deleteConfRedir, setDeleteConfRedir] = useState(false);
    const [loading, setLoading] = useState(false);


    const deleteStall = () => {
        let configuration = {
            headers: {
                'x-auth-token': localStorage.getItem('token'),
            },
        };

        let delStallUrl = url + `stall/deleteStall/${props.stallId}`;
        setLoading(true);
        swal({
            title: 'Are you sure?',
            text: 'You are about to delete a stall!',
            icon: 'warning',
            buttons: true,
            dangerMode: true,
        }).then((res) => {
            if (res) {
                axios
                    .delete(delStallUrl, configuration)
                    .then((res) => {
                        if (res.data.message === 'Success') {
                            eventContext.indivEvent.registeredStalls.pop(res.data.stall._id);
                            eventContext.setIndividualEvent(eventContext.indivEvent, true);
                            authContext.getProfile();
                            setLoading(false);
                            swal('Stall deleted successfully')
                                .then(res => {
                                    setDeleteStallRedir(true);
                                })
                                .catch(err => {
                                    throw err;
                                })
                        }
                    })
                    .catch((err) => {
                        setLoading(false);
                    });
            } else {
                setDeleteStallRedir(true);
            }
        });
    };

    const deleteConference = () => {
        let configuration = {
            headers: {
                'x-auth-token': localStorage.getItem('token'),
            },
        };
        let delConfUrl = url + `conference/deleteConference/${props.confId}`;
        setLoading(true);
        swal({
            title: 'Are you sure?',
            text: 'You are about to delete a Conference!',
            icon: 'warning',
            buttons: true,
            dangerMode: true,
        }).then((res) => {
            if (res) {
                axios
                    .delete(delConfUrl, configuration)
                    .then((res) => {
                        if (res.data.message === 'Success') {
                            authContext.getProfile();
                            setLoading(false);
                            swal('Conference deleted successfully')
                                .then(res => {
                                    setDeleteConfRedir(true);
                                })
                                .catch(err => {
                                    throw err;
                                });
                        }
                    })
                    .catch((err) => {
                        setLoading(false);
                    });
            } else {
                setDeleteConfRedir(true);
            }
        });
    };


    if (
        localStorage.getItem('token') &&
        localStorage.getItem('role') === 'Exhibitor'
    ) {
        if (props.stallId) {
            if (props.user === authContext.userId) {
                return (
                    <>
                        {deleteStallRedir && <Redirect to='/eventDetails' />}
                        <div
                            className='btn btn-danger'
                            style={{ width: '200px' }}
                            onClick={deleteStall}
                        >
                            {loading ? "Loading" : "Delete Stall"}
                        </div>
                        <div>
                            <Link
                                className={['btn btn-primary', btnclass['btn-primary']].join(' ')}
                                to='/addStallDetails'
                                style={{ width: '200px', textAlign: 'center', margin: 'auto' }}
                            >
                                <div>Add More Information</div>
                            </Link>
                        </div>

                    </>
                );
            }
            else {
                return <></>;
            }
        }
        else if (props.confId) {
            if (props.user === authContext.userId) {
                return (
                    <>
                        {deleteConfRedir && <Redirect to='/eventDetails' />}
                        <div
                            className='btn btn-danger'
                            style={{ width: '200px' }}
                            onClick={deleteConference}
                        >
                            {loading ? "Loading" : "Delete Conference"}
                        </div>
                    </>
                )
            }
            else {
                return <></>
            }
        }
        else {
            return <></>
        }
    }
    else {
        return <></>
    }
}

export default ExhibitorBtn