// Importing core packages
import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';

// Importing custom components
import ConferenceTab from '../../../../Layout/conferenceTab';
import EventTab from '../../../../Layout/eventTab';
import VisitorsHeader from './VisitorsHeader';
import VisitorsBody from './VisitorsBody';

// Importing context files
import ConferenceContext from '../../../../context/conference/conferenceContext';

// VisitorsList component
const VisitorsList = () => {
    const conferenceContext = useContext(ConferenceContext);
    const visitors = conferenceContext.visitors;
    const tableCss = {
        width: "90%",
        minWidth: "600px",
        margin: "5px auto",
        textAlign: "left"
    };

    if (!visitors) {
        return <Redirect to='/' />;
    }

    return (
        <div>
            <EventTab tab="conference" />
            <ConferenceTab tab="visitor" />
            <div style={{ overflowX: "auto" }}>
                <table className="table" style={tableCss}>
                    <VisitorsHeader />
                    <tbody>
                        {visitors && visitors.map((visitor, i) =>
                            <VisitorsBody key={visitor._id} visitor={visitor} index={i + 1} onClick={visitor._id} />)}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

// Exporting VisitorsList component
export default VisitorsList;