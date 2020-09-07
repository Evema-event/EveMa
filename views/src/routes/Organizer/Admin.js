import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import AdminPage from '../../pages/Admin/Admin';
import AddEvent0 from '../../pages/Admin/AddEvent/AddEvent0';
import AddEvent1 from '../../pages/Admin/AddEvent/AddEvent1';

import VisitorsList from '../../pages/Event/Visitors/VisitorsList';
import VisitorDetails from '../../pages/Event/Visitors/VisitorDetails';
import NotifyUser from '../../pages/Event/NotifyUser/NotifyUser';

import AdminState from '../../context/event_admin/adminState';

const Admin = () => {
    if (
        localStorage.getItem('token') &&
        localStorage.getItem('role') === 'Organizer'
    ) {
        return (
            <AdminState>
                <Switch>
                    <Route exact path='/admin' component={AdminPage} />
                    <Route exact path='/admin/addEvent/0' component={AddEvent0} />
                    <Route exact path='/admin/addEvent/1' component={AddEvent1} />
                    <Route exact path='/admin/visitorsList' component={VisitorsList} />
                    <Route exact path='/admin/visitorDetails' component={VisitorDetails} />
                    <Route exact path-='/admin/notifyUser' component={NotifyUser} />
                </Switch>
            </AdminState>
        );
    }
    return <Redirect to='/login' />;
};

export default Admin;
