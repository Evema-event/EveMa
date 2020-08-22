import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Home from './components/pages/Home';
import Navbar from './components/layout/Navbar';
import EventState from '../src/context/event/eventState';
import AuthState from '../src/context/auth/authState';

import Upcomingindiv from './components/card/UpcomingCardItem';
import Completedindiv from './components/card/CompletedCardItem';
import UpcomLoadPage from './components/pages/UpcomLoadPage';
import CompLoadPage from './components/pages/CompLoadPage';
import Signup from './components/auth/Signup';
import Login from './components/auth/Login';
import Admin from './components/pages/Admin';
import NextSignup from './components/auth/NextSignup';
import NextSignup1 from './components/auth/NextSignup1';
import ForgetPassword from './components/auth/ForgetPassword';
import ForgetPassword2 from './components/auth/ForgetPassword2';

function App() {
  return (
    <AuthState>
      <EventState>
        <Router>
          <Navbar />
          <Switch>
            <Route path='/admin' component={Admin} />
            <Route exact path='/' component={Home} />
            <Route exact path='/signup/0' component={Signup} />
            <Route exact path='/signup/1' component={NextSignup} />
            <Route exact path='/signup/2' component={NextSignup1} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/forgetpassword/0' component={ForgetPassword} />
            <Route exact path='/forgetpassword/1' component={ForgetPassword2} />
            <Route exact path='/upcomingEvents' component={Upcomingindiv} />
            <Route exact path='/completedEvents' component={Completedindiv} />
            <Route exact path='/upcomingList' component={UpcomLoadPage} />
            <Route exact path='/completedList' component={CompLoadPage} />
          </Switch>
        </Router>
      </EventState>
    </AuthState>
  );
}

export default App;
