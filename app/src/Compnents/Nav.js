import React, { Component } from 'react';
import '../App.css';

class Navbar extends Component {
    render(props) {
        return (
            <div className="nav">
                <nav>
                    <div className="nav-wrapper">
                        <a href="/" className="brand-logo">Chad Green</a>
                        <ul id="nav-mobile" className="right">
                            <li><a href="/table">Table</a></li>
                            <li><a href="/chart">Chart</a></li>
                            <li><a href="/">Home</a></li>
                        </ul>
                    </div>
                </nav>

            </div>
        );
    }
}

export default Navbar;