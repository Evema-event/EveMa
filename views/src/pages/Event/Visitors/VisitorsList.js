// Importing core packages
import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';

// Importing custom components
import EventTab from '../../../Layout/EventTab';
import VisitorsHeader from './VisitorsHeader';
import VisitorsBody from './VisitorsBody';

// Importing context files
import VisitorContext from '../../../context/visitor/visitorContext';

// VisitorsList component
const VisitorsList = () => {
    const visitorContext = useContext(VisitorContext);
    const visitors = visitorContext.visitorlist;
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
            <EventTab tab="visitor" />
            { visitors && visitors.length > 0 ?
                <div style={{ overflowX: "auto" }}>
                    <table className="table" style={tableCss}>
                        <VisitorsHeader />
                        <tbody>
                            {visitors.map((visitor, i) =>
                                <VisitorsBody key={visitor._id} visitor={visitor} index={i + 1} onClick={visitor._id} />)}
                        </tbody>
                    </table>
                </div> : <center style={{ marginTop: "50px" }}>No visitors yet!</center>
            }
        </div>
    );
}

// Exporting VisitorsList component
export default VisitorsList;