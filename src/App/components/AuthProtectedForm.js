import Form from './Form';
import auth from '../../auth';

export default class AuthProtectedForm extends Form {

    constructor(props, url='/', method='POST', nonAuth=false){
        super(props, url, method, nonAuth);

        this.state = {
            ...this.state,
            ...auth.createState()
        }
    }

    componentDidMount(){
        if(!this.state.loggedIn){
            this.props.history.push('/login');
        }
    }

}
