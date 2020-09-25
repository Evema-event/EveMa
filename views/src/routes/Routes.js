// Importing core packages
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ScrollToTop from 'react-router-scroll-top';

// Importing common Pages
import Home from '../pages/Home/Home';
import EventList from '../pages/EventList/EventList';
import CompletedList from '../pages/EventList/CompletedList/CompletedList';
import UpcomingList from '../pages/EventList/UpcomingList/UpcomingList';
import EventDetails from '../pages/Event/EventDetails/EventDetails';

// Stalls pages
import Stalls from '../pages/Event/Stalls/Stalls';
import StallDetails from '../pages/Event/Stalls/StallDetails/StallDetails';
import StallVisitorList from '../pages/Event/Stalls/Visitors/VisitorsList';
import StallVisitorDetails from '../pages/Event/Stalls/Visitors/VisitorDetails';
import AddStallInformation from '../pages/Event/Stalls/AddStallInformation/AddStallInformation';

// conference pages
import Conferences from '../pages/Event/Conferences/Conferences';
import ConferencesDetails from '../pages/Event/Conferences/ConferenceDetails/ConferenceDetails';
import ConferenceVisitorList from '../pages/Event/Conferences/Visitors/VisitorsList';
import ConferenceVisitorDetails from '../pages/Event/Conferences/Visitors/VisitorDetails';

// Importing Auth pages
import Signup0 from '../pages/Auth/Signup/Signup0';
import Signup1 from '../pages/Auth/Signup/Signup1';
import Signup2 from '../pages/Auth/Signup/Signup2';
import Login from '../pages/Auth/Login/Login';
import ForgetPassword0 from '../pages/Auth/ForgetPassword/ForgetPassword0';
import ForgetPassword1 from '../pages/Auth/ForgetPassword/ForgetPassword1';

// Register stall conference
import RegisterStall from '../pages/Event/RegisterStall/RegisterStall';
import RegisterConference from '../pages/Event/RegisterConference/RegisterConference';

// Importing Routes
import Admin from './Organizer/Admin';

//  Importing Navbar
import Navbar from '../Layout/Navbar/Navbar';

//Import Profile
import Profile from '../pages/Profile/Profile';
import SwitchAccount from '../pages/Auth/SwitchAccount/SwitchAccount';
import UpdatePassword from '../pages/Profile/ProfileData/UpdatePassword';

const Routes = () => {
  return (
    <Router>
      <ScrollToTop>
        <Navbar />
        <Switch>
          <Route path='/admin' component={Admin} />

          <Route exact path='/signup/0' component={Signup0} />
          <Route exact path='/signup/1' component={Signup1} />
          <Route exact path='/signup/2' component={Signup2} />
          <Route exact path='/login' component={Login} />

          <Route exact path='/forgetPassword/0' component={ForgetPassword0} />
          <Route exact path='/forgetPassword/1' component={ForgetPassword1} />

          <Route exact path='/eventList' component={EventList} />
          <Route exact path='/upcomingList' component={UpcomingList} />
          <Route exact path='/completedList' component={CompletedList} />
          <Route exact path='/eventDetails' component={EventDetails} />

          <Route exact path='/stallList' component={Stalls} />
          <Route exact path='/stallDetails' component={StallDetails} />

          <Route exact path='/stallVisitorList' component={StallVisitorList} />
          <Route
            exact
            path='/stallVisitorDetails'
            component={StallVisitorDetails}
          />

          <Route exact path='/conferenceList' component={Conferences} />
          <Route
            exact
            path='/conferenceDetails'
            component={ConferencesDetails}
          />

          <Route
            exact
            path='/conferenceVisitorList'
            component={ConferenceVisitorList}
          />
          <Route
            exact
            path='/conferenceVisitorDetails'
            component={ConferenceVisitorDetails}
          />

          <Route exact path='/registerStall' component={RegisterStall} />
          <Route
            exact
            path='/registerConference'
            component={RegisterConference}
          />

          <Route exact path='/switchAccount' component={SwitchAccount} />
          <Route
            exact
            path='/addStallDetails'
            component={AddStallInformation}
          />
          <Route exact path='/profile' component={Profile} />

          <Route exact path='/changePassword' component={UpdatePassword} />

          <Route path='/' component={Home} />
        </Switch>
      </ScrollToTop>
    </Router>
  );
};

export default Routes;
