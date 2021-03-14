import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Landing from './pages/Landing';
import Login from './pages/Login';
import Signup from './pages/Signup';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

export default class App extends Component {
    render(){
        const App = () => (
            <div>
                <Switch>
                    <Route exact path='/' component={Landing}/>
                    <Route exact path='/login' component={Login}/>
                    <Route exact path='/signup' component={Signup}/>
                </Switch>
            </div>
        )

        return (
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        );
    }
}
