import { Component } from 'react';
import auth from '../../auth';

export default class NonAuth extends Component {

    constructor(props){
        super(props);
        this.state = auth.createState();
    }

    componentDidMount(){
        if(this.state.loggedIn){
            this.props.history.push(auth.homepage());
        }
    }

    render(){
        return <div className="App"></div>;
    }

}
