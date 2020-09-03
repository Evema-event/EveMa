import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Home from './components/pages/Home';
import Navbar from './components/layout/Navbar';
import EventState from './context/event/eventState';
import AuthState from './context/auth/authState';
import StallState from './context/stall/stallState';
import ConferenceState from './context/conference/conferenceState';
import VisitorState from './context/visitor/visitorState';

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
import RegisterStall from './components/pages/RegisterStall';
import RegisterConf from './components/pages/RegisterConf';
import StallListMain from './components/pages/stallListMain';
import ConferenceListMain from './components/pages/conferenceListMain';
import StallIndiv from './components/pages/StallIndiv';
import ConferenceIndiv from './components/card/ConferenceIndividual';
import GenerateEmail from './components/card/GenerateEmail';
function App() {
  return (
    <AuthState>
      <EventState>
        <StallState>
          <ConferenceState>
            <VisitorState>
            <Router>
              <Navbar />
              <Switch>
                <Route path='/admin' component={Admin} />
                <Route exact path='/' component={Home} />
                <Route exact path='/signup/0' component={Signup} />
                <Route exact path='/signup/1' component={NextSignup} />
                <Route exact path='/signup/2' component={NextSignup1} />
                <Route exact path='/login' component={Login} />
                <Route
                  exact
                  path='/forgetpassword/0'
                  component={ForgetPassword}
                />
                <Route
                  exact
                  path='/forgetpassword/1'
                  component={ForgetPassword2}
                />
                <Route exact path='/upcomingEvents' component={Upcomingindiv} />
                <Route
                  exact
                  path='/completedEvents'
                  component={Completedindiv}
                />
                <Route exact path='/upcomingList' component={UpcomLoadPage} />
                <Route exact path='/completedList' component={CompLoadPage} />
                <Route exact path='/registerStall' component={RegisterStall} />
                <Route
                  exact
                  path='/registerConference'
                  component={RegisterConf}
                />
                <Route exact path='/stallList' component={StallListMain} />
                <Route
                  exact
                  path='/conferenceList'
                  component={ConferenceListMain}
                />
                <Route exact path='/stallIndividual' component={StallIndiv} />
                <Route
                  exact
                  path='/conferenceIndividual'
                  component={ConferenceIndiv}
                />
                <Route exact path-='/GenerateEmail' component={GenerateEmail} />
              </Switch>
            </Router>
            </VisitorState>
          </ConferenceState>
        </StallState>
      </EventState>
    </AuthState>
  );
}

export default App;
