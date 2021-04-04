import React, { Component } from 'react';
import { CgAdd } from 'react-icons/cg';

import './Nav.css';
import auth from '../../auth';
import requests from '../../requests'

export class Nav extends Component {

    constructor(props){
        super(props)

        this.state = {};
        this.logout = this.logout.bind(this);
        this.state = auth.createState();

    }

    render(){
        if(this.state.loggedIn){
            return (
                <nav className="nav flex-column">
                    <a className="navbar-brand h1" href="/dashboard">
                        <div className="logo-small">
                            <img src="/img/logo.png" alt="logo"/>
                            <br/><p>LearnCVU</p>
                        </div>
                    </a>
                    { this.state.instructor ?
                        <a className="nav-link cta" href="/course/new"><CgAdd/><span>Create Course</span></a>
                        :
                        <a className="nav-link cta" href="/course/all"><CgAdd/><span>Find Courses</span></a>
                    }
                    <a className="nav-link" href="/dashboard"><span>Dashboard</span></a>
                    <a className="nav-link" href="/courses"><span>Your Courses</span></a>
                    <a onClick={this.logout} className="nav-link" style={{cursor: 'pointer'}}><span>Logout</span></a>
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

    async logout(e){
        e.preventDefault();

        await auth.logout();
        this.props.history.push('/login');
    }
}

export class PageHeader extends Component {

    constructor(props){
        super(props);
        this.state = {avatar: auth.avatar()};
    }

    render(){
        return (
            <nav className="navbar navbar-expand-lg navbar-light horiz part-nav">
                <div className="navbar-brand h1 mb-0">
                    <span>{this.props.title}</span>
                </div>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a className="nav-link avatar" href="/account"><img src={requests.staticURL('/img/avatars/' + this.state.avatar)} alt="avatar"/></a>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}
