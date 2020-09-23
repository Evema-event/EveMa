// Importing core packages
import React, { useState, useContext } from 'react';
import { Redirect } from 'react-router-dom';

import ConferenceContext from '../../../../context/conference/conferenceContext';

// VisitorsBody component
const VisitorsBody = (props) => {
  const [redirectVisitor, setRedirect] = useState(false);
  const conferenceContext = useContext(ConferenceContext);

  const onClickUser = () => {
    conferenceContext.setIndividualVisitor(props.visitor);
    setRedirect(true);
  };

  return (
    <tr onClick={onClickUser}>
      {redirectVisitor && <Redirect to='/conferenceVisitorDetails' />}

      <td>{props.index}</td>
      <td>{props.visitor.firstName}</td>
      <td>{props.visitor.emailId}</td>
      <td>{props.visitor.contactNumber}</td>
    </tr>
  );
};

// Exporting VisitorsBody component
export default VisitorsBody;
