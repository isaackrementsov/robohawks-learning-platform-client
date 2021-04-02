import { Component } from 'react';
import auth from '../../auth.js';

export default class NonAuth extends Component {

    constructor(props){
        super(props);
        this.state = auth.createState();
    }

    componentDidMount(){
        if(this.state.loggedIn){
            this.props.history.push('/dashboard');
        }
    }

    render(){
        return <div className="App"></div>;
    }

}
