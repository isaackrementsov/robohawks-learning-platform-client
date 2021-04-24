import React, { Component } from 'react';
import { CgAdd } from 'react-icons/cg';

import './Nav.css';
import auth from '../../auth';
import requests from '../../requests'

export class Nav extends Component {

    constructor(props){
        super(props);

        this.state = {};
        this.logout = this.logout.bind(this);
        this.state = auth.createState();
    }

    render(){
        if(this.state.loggedIn){
            return (
                <nav className="nav flex-column">
                    <a className="navbar-brand h1" href={auth.homepage()}>
                        <div className="logo-small">
                            <img src="/img/logo.png" alt="logo"/>
                            <br/><p>LearnCVU</p>
                        </div>
                    </a>
                    { this.state.instructor ?
                        <>
                            <NavLink className="cta" href="/course/new"><CgAdd/><span>Create Course</span></NavLink>
                            <NavLink href="/course/all"><span>Find Courses</span></NavLink>
                        </>
                        :
                        <NavLink className="cta" href="/course/all"><CgAdd/><span>Find Courses</span></NavLink>
                    }
                    <NavLink href={auth.homepage()}><span>Dashboard</span></NavLink>
                    <NavLink onClick={this.logout} style={{cursor: 'pointer'}}><span>Logout</span></NavLink>
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
                            <NavLink href="/login">Login</NavLink>
                            <NavLink className="cta" href="/signup">Signup</NavLink>
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

class NavLink extends Component {

    render(){
        return (
            <li className="nav-item">
                <a
                    href={this.props.href}
                    className={(this.props.className || '') + ' nav-link' + (this.isActive() ? ' active' : '')}
                    onClick={this.props.onClick}
                    style={this.props.style}
                >
                    {this.props.children}
                </a>
            </li>
        );
    }

    isActive(){
        return window.location.pathname === this.props.href;
    }

}

export class PageHeader extends Component {

    constructor(props){
        super(props);
        this.state = {avatar: auth.avatar()};
    }

    render(){
        return (
            <nav className="navbar navbar-expand-lg navbar-light horiz part-nav" style={this.props.style}>
                <div className="navbar-brand h1 mb-0">
                    <span>{this.props.title}</span>
                </div>
                <div className="navbar-collapse justify-content-end" id="navbarSupportedContent" style={{flexBasis: 0, flexGrow: 0}}>
                    <ul className="navbar-nav">
                        {this.props.customNav ||
                            <li className="nav-item">
                                <a className="nav-link avatar" href="/account">
                                    <div className="av-circle" style={{background: requests.cssStaticURL('/img/avatars/' + auth.avatar())}} alt="avatar"/>
                                </a>
                            </li>
                        }
                    </ul>
                </div>
            </nav>
        );
    }
}

export class PageLayout extends Component {

    render(){
        return (
            <div className="App App-flex">
                <Nav history={this.props.history}/>
                <div className="content">
                    <PageHeader title={this.props.title} style={this.props.style} customNav={this.props.customNav}/>
                    <div className="col">
                        {this.props.children}
                    </div>
                </div>
            </div>
        );
    }

}
