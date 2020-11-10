import React, { Component } from 'react';
import './Nav.css';

export default class Nav extends Component {

    componentDidMount(){
        let loggedIn = localStorage.getItem('loggedIn') != null;
        this.setState({loggedIn})
    }

    render(){
        if(this.props.loggedIn){
            return (
                <nav className="vert">
                </nav>
            )
        }else{
            return (
                <nav className="navbar navbar-expand-lg navbar-light horiz">
                    <a className="navbar-brand h1 mb-0" href="/">
                        <img className="logo d-inline block align top" src={'/img/' + (this.props.logo || 'logo') + '.png'} alt="Logo"/>
                        <span id="title">LearnCVU</span>
                    </a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <a className="nav-link" href="/login">Login</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link cta" href="/signup">Signup</a>
                            </li>
                        </ul>
                    </div>
                </nav>
            )
        }
    }

}
