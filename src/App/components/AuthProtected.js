import { Component } from 'react';
import auth from '../../auth.js';

export default class AuthProtected extends Component {

    constructor(props){
        super(props);
        this.state = auth.createState();
    }

    componentDidMount(){
        if(!this.state.loggedIn){
            this.props.history.push('/login');
        }
    }

    render(){
        return <div className="App"></div>;
    }

}
