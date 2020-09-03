import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import AdminPage from './AdminPage';
import AddEvent from '../events/AddEvent';
import AddEvent1 from '../events/AddEvent1';
import AdminState from '../../context/event_admin/adminState';
import VisitorsList from '../userDetails/VisitorsList';
import VisitorDetails from '../userDetails/VisitorDetails';
import GenerateEmail from '../card/GenerateEmail';

const Admin = () => {
  if (
    localStorage.getItem('token') &&
    localStorage.getItem('role') === 'Organizer'
  ) {
    return (
      <AdminState>
        <Switch>
          <Route exact path='/admin' component={AdminPage} />
          <Route exact path='/admin/addEvent/0' component={AddEvent} />
          <Route exact path='/admin/addEvent/1' component={AddEvent1} />
          <Route exact path='/admin/visitorsList' component={VisitorsList} />
          <Route exact path='/admin/visitorDetails' component={VisitorDetails} />
          <Route exact path-='/admin/generateEmail' component={GenerateEmail} />
        </Switch>
      </AdminState>
    );
  }
  return <Redirect to='/login' />;
};

export default Admin;
