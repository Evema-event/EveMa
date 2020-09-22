// Importing core packages
import React from 'react';

import classes from './visitor.module.css';

// VisitorsHeader component
const VisitorsHeader = () => {
  return (
    <thead className={classes.fontRubik}>
      <tr>
        <th>#</th>
        <th>Name</th>
        <th>E-mail</th>
        <th>Contact Number</th>
      </tr>
    </thead>
  );
};

// Exporting VisitorsHeader component
export default VisitorsHeader;
