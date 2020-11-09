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
                    <ul>

                    </ul>
                </nav>
            )
        }else{
            return (
                <nav className="horiz">
                    <ul>
                        <li className="left"><a href="/"><img src={'/img/' + (this.props.logo || 'logo') +'.png'} alt="Logo"/><span>LearnCVU</span></a></li>
                        <li className="cta"><a href="/signup">Signup</a></li>
                        <li><a href="/login">Login</a></li>
                    </ul>
                </nav>
            )
        }
    }

}
