// Importing core packages
import React, { useState, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import VisitorContext from '../../../context/visitor/visitorContext';

import classes from './visitor.module.css';

// VisitorsBody component
const VisitorsBody = (props) => {
  const [redirectVisitor, setRedirect] = useState(false);
  const visitorContext = useContext(VisitorContext);

  const onClickUser = () => {
    visitorContext.setIndividualVisitor(props.visitor);
    setRedirect(true);
  };

  return (
    <tr onClick={onClickUser} className={classes.fontKarla}>
      {redirectVisitor && <Redirect to='/admin/VisitorDetails' />}

      <td>{props.index}</td>
      <td>{props.visitor.firstName}</td>
      <td>{props.visitor.emailId}</td>
      <td>{props.visitor.contactNumber}</td>
    </tr>
  );
};

// Exporting VisitorsBody component
export default VisitorsBody;
