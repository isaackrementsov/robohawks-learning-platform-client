import { Nav, PageHeader } from '../components/Nav';
import AuthProtected from '../components/AuthProtected';
import requests from '../../requests';

export default class Dashboard extends AuthProtected {

    constructor(props){
        super(props);
        this.state.user = {};
    }

    async componentDidMount(){
        super.componentDidMount();

        let res = await requests.makeRequest({url: '/user/?id=' + this.state.userId, method: 'GET'});

        if(res && res.data && res.data.data){
            this.setState({user: res.data.data});
        }
    }

    render(){
        return (
            <div className="App App-flex">
                <Nav history={this.props.history}/>
                <div className="content">
                    <PageHeader title={'Dashboard'}/>
                    <p>Hi, {this.state.user.first_name} {this.state.user.last_name}!</p>
                </div>
            </div>
        );
    }

}
