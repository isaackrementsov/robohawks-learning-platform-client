import Nav from '../components/Nav.js';
import AuthProtected from '../components/AuthProtected';

import requests from '../../requests.js';

export default class Dashboard extends AuthProtected {

    async componentDidMount(){
        super.componentDidMount();
        let res = await requests.makeRequest({url: '/user?id=' + this.state.userId, method: 'GET'});
        console.log(res.data)
    }

    render(){
        return (
            <div className="App">
                <Nav history={this.props.history}/>
                <h1>Welcome to your dashboard!</h1>
            </div>
        );
    }

}
