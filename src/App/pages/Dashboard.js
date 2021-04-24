import { PageLayout } from '../components/Nav';
import { AuthProtected } from '../components/AuthProtected';
import requests from '../../requests';

export default class Dashboard extends AuthProtected {

    constructor(props){
        super(props);
        this.userId = super.getUrlParam();
        this.state.user = {};
    }

    async componentDidMount(){
        super.componentDidMount();

        let userRes = await requests.makeRequest({url: '/user/?id=' + this.userId, method: 'GET'});
        let credentialsRes = await requests.makeRequest({url: '/credential/all?user_id=' + this.userId, method: 'GET'});
        let coursesRes = await requests.makeRequest({url: '/courses/all?user_id=' + this.userId, method: 'GET'});

        if(requests.checkData(userRes) && requests.checkData(credentialsRes) && requests.checkData(coursesRes)){
            this.setState({user: userRes.data.data, credentials: credentialsRes.data.data, courses: coursesRes.data.data});
        }
    }

    render(){
        return (
            <PageLayout history={this.props.history} title={this.userId === this.state.userId ? 'Dashboard' : this.state.user.username}>
                <h2>Credentials</h2>
                <h2>Courses</h2>
            </PageLayout>
        );
    }

}
