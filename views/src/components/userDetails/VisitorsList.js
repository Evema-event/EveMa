// Importing core packages
import React from 'react';

// Importing custom components
import EventTab from '../layout/eventTab';
import UsersHeader from './UsersHeader';
import UsersBody from './UsersBody';

// VisitorsList component
const VisitorsList = () => {
    const tableCss = {
        width: "90%",
        minWidth: "600px",
        margin: "5px auto",
        textAlign: "left"
    };

    return (
        <div>
            <EventTab tab="visitor" />
            <div style={{ overflowX: "auto" }}>
                <table className="table" style={tableCss}>
                    <UsersHeader />
                    <tbody>
                        <UsersBody />
                        <UsersBody />
                        <UsersBody />
                        <UsersBody />
                        <UsersBody />
                    </tbody>
                </table>
            </div>
        </div>
    );
}

// Exporting VisitorsList component
export default VisitorsList;