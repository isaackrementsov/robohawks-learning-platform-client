import { Component } from 'react';
import auth from '../../auth';

export class AuthProtected extends Component {

    constructor(props){
        super(props);
        this.state = auth.createState();
    }

    componentDidMount(){
        if(!this.state.loggedIn){
            this.props.history.push('/login');
        }
    }

    getUrlParam(){
        let parts = window.location.pathname.split('/');
        return parts[parts.length - 1]
    }

}

export class InstructorProtected extends AuthProtected {

    componentDidMount(){
        super.componentDidMount();

        if(!this.state.instructor){
            this.props.history.push(auth.homepage());
        }
    }

}
