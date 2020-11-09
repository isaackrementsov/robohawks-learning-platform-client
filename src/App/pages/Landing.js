import React, { Component } from 'react';
import Nav from '../Nav';
import './Landing.css';

export default class Landing extends Component {
    render(){
        return (
            <div className="App">
                <Nav logo={'logo-white'}/>
                <div className="landing-main">
                    <p>GET '/'</p>
                </div>
            </div>
        );
    }
}
