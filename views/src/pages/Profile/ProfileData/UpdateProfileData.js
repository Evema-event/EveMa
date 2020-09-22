import React, { useState, useContext, useEffect } from 'react';
import swal from 'sweetalert';

import classes from '../Profile.module.css';

import url from '../../../server';
import axios from 'axios';

import AuthContext from '../../../context/auth/authContext';


const UpdateProfileData = (props) => {
    const profile = useContext(AuthContext);

    const initialState = {
        firstname: { value: '', error: '' },
        lastname: { value: '', error: '' },
        state: { value: '', error: '' },
        country: { value: '', error: '' },
        zipcode: { value: '', error: '' },
        city: { value: '', error: '' },
        dob: { value: '', error: '' },
        gender: { value: '', error: '' },
        destination: { value: '', error: '' },
        areasOfInterest: { value: [], error: '' },
        company: { value: '', error: '' },
        contact: { value: '', error: '' },
        address: { value: '', error: '' }
    };

    useEffect(() => {
        setFields({
            ...fields,
            firstname: { value: profile.firstname, error: '' },
            lastname: { value: profile.lastname, error: '' },
            state: { value: profile.state, error: '' },
            country: { value: profile.country, error: '' },
            zipcode: { value: profile.zipcode, error: '' },
            city: { value: profile.city, error: '' },
            dob: { value: profile.dob.slice(0, 10), error: '' },
            gender: { value: profile.gender, error: '' },
            destination: {
                value: profile.destination,
                error: '',
            },
            areasOfInterest: { value: profile.areasOfInterest, error: '' },
            company: { value: profile.company, error: '' },
            contact: { value: profile.contact, error: '' },
            address: { value: profile.address, error: '' },
        });
        // eslint-disable-next-line
    }, []);

    const [fields, setFields] = useState(initialState);
    const [loading, setLoading] = useState(false);

    const handleChange = (event) => {
        const { name, value } = event.target;
        const updatedField = {
            ...fields[name],
        };
        if (name === 'areasOfInterest') {
            updatedField.value = value.split(',');
        } else {
            updatedField.value = value;
        }

        setFields({
            ...fields,
            [name]: updatedField,
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        let isError = false;
        if (fields.firstname.value.length < 3) {
            isError = true;
            fields.firstname.error = 'firstname is atleast 5 character';
        } else {
            fields.firstname.error = '';
        }

        if (fields.lastname.value.length < 3) {
            isError = true;
            fields.lastname.error = 'lastname is atleast 5 character';
        } else {
            fields.lastname.error = '';
        }

        if (fields.state.value.length < 3) {
            isError = true;
            fields.state.error = 'State is required';
        } else {
            fields.state.error = '';
        }

        if (fields.country.value.length < 3) {
            isError = true;
            fields.country.error = 'Country is required';
        } else {
            fields.country.error = '';
        }

        if (fields.city.value.length < 3) {
            isError = true;
            fields.city.error = 'city is required';
        } else {
            fields.city.error = '';
        }

        if (fields.zipcode.value.length < 6) {
            isError = true;
            fields.zipcode.error = 'zipcode is required';
        } else {
            fields.zipcode.error = '';
        }

        if (new Date(fields.dob.value).getTime() > Date.now()) {
            isError = true;
            fields.dob.error = 'Enter a valid Date of birth';
        } else {
            fields.dob.error = '';
        }

        if (fields.destination.value.length < 5) {
            isError = true;
            fields.destination.error = 'Destination must be atleast 5 character';
        } else {
            fields.destination.error = '';
        }

        if (fields.areasOfInterest.value.length < 2) {
            isError = true;
            fields.areasOfInterest.error =
                'Areas of interest must be atleast 2 fields separated by comma';
        } else {
            fields.areasOfInterest.error = '';
        }

        if (fields.company.value.length < 3) {
            isError = true;
            fields.company.error = 'Company must be atleast 3 character';
        } else {
            fields.company.error = '';
        }

        if (fields.contact.value.length < 10) {
            isError = true;
            fields.contact.error = 'Contact is invalid';
        } else {
            fields.contact.error = '';
        }

        if (fields.address.value.length < 15) {
            isError = true;
            fields.address.error = 'Address is required';
        } else {
            fields.address.error = '';
        }

        setFields({
            ...fields,
        });

        if (!isError) {
            setLoading(true);

            const config = {
                headers: {
                    'x-auth-token': localStorage.getItem('token')
                }
            };

            const profileData = {
                firstName: fields.firstname.value,
                lastName: fields.lastname.value,
                gender: fields.gender.value,
                dateOfBirth: fields.dob.value,
                country: fields.country.value,
                state: fields.state.value,
                cityName: fields.city.value,
                zipCode: fields.zipcode.value,
                areaOfInterest: fields.areasOfInterest.value,
                designation: fields.destination.value,
                companyName: fields.company.value,
                companyAddress: fields.address.value,
                contactNumber: fields.contact.value,
            };

            let updateProfileUrl = url + 'user/updateProfile';
            axios
                .put(updateProfileUrl, profileData, config)
                .then((res) => {
                    res.data.token = localStorage.getItem('token');
                    profile.authentication(res);
                    swal('', 'Profile updated successfully!', 'success')
                        .then(res => {
                            if (res) {
                                props.toggleEdit();
                            }
                        })
                        .catch(err => {
                            throw err;
                        });
                    setLoading(false);
                })
                .catch((err) => {
                    swal('Something Wrong', 'Try again', 'error');
                    setLoading(false);
                });
        }
    };

    return (
        <form className={classes.part} onSubmit={handleSubmit}>
            <div className={[classes.info, classes.extend].join(' ')}>
                <h3 style={{ display: "inline-block", marginRight: "12px", verticalAlign: "middle" }}>Personal and professional data</h3>
                <button type="button" className={classes.Button}
                    onClick={props.toggleEdit}>Cancel</button>
                {
                    loading ?
                        <button type="button" className={classes.Button} style={{ background: "green" }}>Loading</button> :
                        <button type="submit" className={classes.Button} style={{ background: "green" }}>Save</button>
                }
            </div>
            <div className={classes.info}>
                <h5 className={classes.head}>FirstName</h5>
                <input
                    type="text"
                    required
                    className={classes.body}
                    name='firstname'
                    value={fields.firstname.value}
                    onChange={handleChange}
                />
                <p style={{ color: "red", }}>{fields.firstname.error}</p>
            </div>
            <div className={classes.info}>
                <h5 className={classes.head}>LastName</h5>
                <input
                    type="text"
                    required
                    className={classes.body}
                    name='lastname'
                    value={fields.lastname.value}
                    onChange={handleChange}
                />
                <p style={{ color: "red", }}>{fields.lastname.error}</p>
            </div>
            <div className={classes.info}>
                <h5 className={classes.head}>Date of Birth</h5>
                <input
                    type="date"
                    required
                    className={classes.body}
                    name='dob'
                    value={fields.dob.value}
                    onChange={handleChange}
                />
                <p style={{ color: "red", }}>{fields.dob.error}</p>
            </div>
            <div className={classes.info}>
                <h5 className={classes.head}>Gender</h5>
                <select
                    className={classes.body}
                    value={fields.gender.value}
                    name='gender'
                    onChange={handleChange}
                >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Others">Others</option>
                </select>
                <p style={{ color: "red", }}>{fields.gender.error}</p>
            </div>
            <div className={classes.info}>
                <h5 className={classes.head}>Areas of Interest</h5>
                <input
                    type="text"
                    required
                    className={classes.body}
                    name='areasOfInterest'
                    value={fields.areasOfInterest.value}
                    onChange={handleChange}
                />
                <p style={{ color: "red", }}>{fields.areasOfInterest.error}</p>
            </div>
            <div className={classes.info}>
                <h5 className={classes.head}>Designation</h5>
                <input
                    type="text"
                    required
                    className={classes.body}
                    name='destination'
                    value={fields.destination.value}
                    onChange={handleChange}
                />
                <p style={{ color: "red", }}>{fields.destination.error}</p>
            </div>
            <div className={classes.info}>
                <h5 className={classes.head}>City</h5>
                <input
                    type="text"
                    required
                    className={classes.body}
                    name='city'
                    value={fields.city.value}
                    onChange={handleChange}
                />
                <p style={{ color: "red", }}>{fields.city.error}</p>
            </div>
            <div className={classes.info}>
                <h5 className={classes.head}>State</h5>
                <input
                    type="text"
                    required
                    className={classes.body}
                    name='state'
                    value={fields.state.value}
                    onChange={handleChange}
                />
                <p style={{ color: "red", }}>{fields.state.error}</p>
            </div>
            <div className={classes.info}>
                <h5 className={classes.head}>Country</h5>
                <input
                    type="text"
                    required
                    className={classes.body}
                    name='country'
                    value={fields.country.value}
                    onChange={handleChange}
                />
                <p style={{ color: "red", }}>{fields.country.error}</p>
            </div>
            <div className={classes.info}>
                <h5 className={classes.head}>Zipcode</h5>
                <input
                    type="text"
                    required
                    className={classes.body}
                    name='zipcode'
                    value={fields.zipcode.value}
                    onChange={handleChange}
                />
                <p style={{ color: "red", }}>{fields.zipcode.error}</p>
            </div>
            <div className={classes.info}>
                <h5 className={classes.head}>Contact</h5>
                <input
                    type="text"
                    required
                    className={classes.body}
                    name='contact'
                    value={fields.contact.value}
                    onChange={handleChange}
                />
                <p style={{ color: "red", }}>{fields.contact.error}</p>
            </div>
            <div className={classes.info}>
                <h5 className={classes.head}>Company</h5>
                <input
                    type="text"
                    required
                    className={classes.body}
                    name='company'
                    value={fields.company.value}
                    onChange={handleChange}
                />
                <p style={{ color: "red", }}>{fields.company.error}</p>
            </div>
            <div className={[classes.info, classes.extend].join(' ')}>
                <h5 className={classes.head}>Company Address</h5>
                <input
                    type="text"
                    required
                    className={classes.body}
                    name='address'
                    value={fields.address.value}
                    onChange={handleChange}
                />
                <p style={{ color: "red", }}>{fields.address.error}</p>
            </div>
        </form>
    );
};

export default UpdateProfileData;
