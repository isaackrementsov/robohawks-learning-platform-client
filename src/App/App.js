import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Landing from './pages/Landing';

export default class App extends Component {
    render(){
        const App = () => (
            <div>
                <Switch>
                    <Route exact path='/' component={Landing}/>
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