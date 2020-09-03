// Importing core packages
import React,{useContext} from 'react';
import VisitorContext from '../../context/visitor/visitorContext';

// Importing custom components
import EventTab from '../layout/eventTab';
import UsersHeader from './UsersHeader';
import UsersBody from './UsersBody';

// VisitorsList component
const VisitorsList = () => {
    const visitorContext = useContext(VisitorContext);
    const visitors = visitorContext.visitorlist ;
    const tableCss = {
        width: "90%",
        minWidth: "600px",
        margin: "5px auto",
        textAlign: "left"
    };

    return (
        <div>
            <EventTab tab="visitor" />
            

                <div  style={{ overflowX: "auto" }}>
            <table className="table" style={tableCss}>
                <UsersHeader />
                <tbody>
                {visitors && visitors.map((visitor, i)=> 
                    <UsersBody key={visitor._id} visitor= {visitor} index={i+1} onClick={visitor._id} /> )}
                </tbody>
            </table>
        </div>
        </div>
    );
}

// Exporting VisitorsList component
export default VisitorsList;