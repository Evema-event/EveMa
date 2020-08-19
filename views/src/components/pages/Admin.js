import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import AdminPage from './AdminPage';
import AddEvent from '../events/AddEvent';
import AddEvent1 from '../events/AddEvent1';
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
          <Route exact path='/addEvent/0' component={AddEvent} />
          <Route exact path='/addEvent/1' component={AddEvent1} />
        </Switch>
      </AdminState>
    );
  }
  return <Redirect to='/login' />;
};

export default Admin;
