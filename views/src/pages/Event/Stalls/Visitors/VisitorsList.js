// Importing core packages
import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';

// Importing custom components
import StallTab from '../../../../Layout/StallTab';
import EventTab from '../../../../Layout/EventTab';
import VisitorsHeader from './VisitorsHeader';
import VisitorsBody from './VisitorsBody';

// Importing context files
import StallContext from '../../../../context/stall/stallContext';

// VisitorsList component
const VisitorsList = () => {
    const stallContext = useContext(StallContext);
    const visitors = stallContext.visitors;
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
            <EventTab tab="stall" />
            <StallTab tab="visitor" />
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