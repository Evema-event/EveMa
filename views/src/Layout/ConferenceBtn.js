import React, { useState, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import swal from 'sweetalert';

import url from '../server';
import axios from 'axios';

import AuthContext from '../context/auth/authContext';

const ConferenceBtn = (props) => {

    const authContext = useContext(AuthContext);
    const [deleteConfRedir, setDeleteConfRedir] = useState(false);
    const [loading, setLoading] = useState(false);

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

    const onRegisterConf = () => {
        let data = {};
        let config = {
            headers: {
                'x-auth-token': localStorage.getItem('token'),
            },
        };
        let registerUrl = url + `conference/visitorConference/${props.confId}`;
        setLoading(true);
        axios
            .put(registerUrl, data, config)
            .then((res) => {
                authContext.getProfile();
                swal('Congrats', 'Event registered Successfully', 'success');
                setLoading(false);
            })
            .catch((err) => {
                setLoading(false);
            });
    }

    if (
        localStorage.getItem('token') &&
        localStorage.getItem('role') === 'Exhibitor' &&
        props.user === authContext.userId
    ) {
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
    else if (localStorage.getItem('token') && localStorage.getItem('role') === 'Visitor') {
        if (authContext.visitorConferences.includes(props.confId)) {
            return <button className="btn btn-success" style={{ width: '200px' }}>Registered</button>
        } else if (props.limit > 0) {
            if (loading) {
                return <button className="btn btn-success" style={{ width: '200px' }}>Loading</button>
            } else {
                return <button className="btn btn-success" style={{ width: '200px' }} onClick={onRegisterConf}>Register</button>
            }
        } else {
            return <button className="btn btn-danger" style={{ width: '200px' }}>House full</button>
        }
    }
    return <></>;
}

export default ConferenceBtn;