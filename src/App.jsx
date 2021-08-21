// node modules
import React from 'react';
// assets
import logo from 'assets/img/tier-logo.svg';
// texts
import { CHANGE_MOBILITY_FOR_GOOD } from 'constants/texts';
// components
import { ShortenUrlForm } from './components';
// styles
import 'styles/App.css';

function App() {
    return (
        <div className="App">
            <img src={logo} className="App-logo" alt="logo" />
            <header className="header">{CHANGE_MOBILITY_FOR_GOOD}</header>
            <ShortenUrlForm />
        </div>
    );
}

export default App;
