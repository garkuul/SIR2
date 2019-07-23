import React, { Component } from 'react'

import lens from '../lens.svg';

class Header extends Component {
    render() {
        return (
        <header className="App-header">
            <img src={lens} className="App-logo" alt="logo" />
            <div className="App-name">ClickPhoto</div>    
        </header>
        )
    }
}

export default Header;
