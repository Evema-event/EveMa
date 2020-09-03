// Importing core packages
import React, { useState, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import VisitorContext from '../../context/visitor/visitorContext';

// UsersBody component
const UsersBody = (props) => {
  const [redirectVisitor, setRedirect] = useState(false);
  const visitorContext = useContext(VisitorContext);

  const onClickUser = () => {
    visitorContext.getVisitors(props.visitor);
    setRedirect(true);
  };

  return (
    <tr onClick={onClickUser}>
      {redirectVisitor && <Redirect to='/admin/VisitorDetails' />}

      <td>{props.index}</td>
      <td>{props.visitor.firstName}</td>
      <td>{props.visitor.emailId}</td>
      <td>{props.visitor.companyAddress}</td>
    </tr>
  );
};

// Exporting UsersBody component
export default UsersBody;
