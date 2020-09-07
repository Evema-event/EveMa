import React from 'react';

import Welcome from './Welcome/Welcome';
import Events from './Events/Events';

import Footer from '../../Layout/Footer/Footer';

const Home = () => {
    return (
        <>
            <div style={{ margin: "25px 25px" }}>
                <Welcome />
                <Events />
            </div>
            <Footer />
        </>
    );
}

export default Home;
