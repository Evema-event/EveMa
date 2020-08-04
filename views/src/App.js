import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Home from './components/pages/Home';
import Navbar from './components/layout/Navbar';
import EventState from '../src/context/event/eventState';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap';
import 'jquery/dist/jquery.slim';
import 'popper.js';
import Upcomingindiv from './components/card/UpcomingCardItem';
import Completedindiv from './components/card/CompletedCardItem';

function App() {
  return (
    <EventState>
      <Router>
        <Navbar />
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/upcomingEvents' component={Upcomingindiv} />
          <Route exact path='/completedEvents' component={Completedindiv} />
        </Switch>
      </Router>
    </EventState>
  );
}

export default App;
