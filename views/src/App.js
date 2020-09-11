// Importing core packages
import React from 'react';

// Importing routes
import Routes from './routes/Routes';

// Importing state from context
import EventState from './context/event/eventState';
import AuthState from './context/auth/authState';
import StallState from './context/stall/stallState';
import ConferenceState from './context/conference/conferenceState';
import VisitorState from './context/visitor/visitorState';

const App = () => {
    return (
        <EventState>
            <AuthState>
                <StallState>
                    <ConferenceState>
                        <VisitorState>
                            <Routes />
                        </VisitorState>
                    </ConferenceState>
                </StallState>
            </AuthState>
        </EventState>
    );
}

export default App;
