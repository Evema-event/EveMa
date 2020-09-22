// Importing core packages
import React, { useState, useContext } from 'react';
import { Redirect } from 'react-router-dom';

import StallContext from '../../../../context/stall/stallContext';

// VisitorsBody component
const VisitorsBody = (props) => {
  const [redirectVisitor, setRedirect] = useState(false);
  const stallContext = useContext(StallContext);

  const onClickUser = () => {
    stallContext.setIndividualVisitor(props.visitor);
    setRedirect(true);
  };

  return (
    <tr onClick={onClickUser}>
      {redirectVisitor && <Redirect to='/stallVisitorDetails' />}

      <td>{props.index}</td>
      <td>{props.visitor.firstName}</td>
      <td>{props.visitor.emailId}</td>
      <td>{props.visitor.contactNumber}</td>
    </tr>
  );
};

// Exporting VisitorsBody component
export default VisitorsBody;
