// Importing core packages
import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

// UsersBody component
const UsersBody = () => {
    const [redirectVisitor, setRedirect] = useState(false);

    const onClickUser = () => {
        setRedirect(true);
    }

    return (
        <tr onClick={onClickUser}>
            {redirectVisitor && <Redirect to='/admin/VisitorDetails' />}
            <td>1</td>
            <td>Testing</td>
            <td>test@test.com</td>
            <td>12345677890</td>
        </tr>
    );
}

// Exporting UsersBody component
export default UsersBody;