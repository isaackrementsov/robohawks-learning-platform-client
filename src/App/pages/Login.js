import { Nav } from '../components/Nav';
import Form from '../components/Form';
import './Gradient.css';

export default class Login extends Form {

    constructor(props){
        super(props, '/user/auth', 'POST', true);

        this.state = {
            ...this.state,
            ...{data: {
                identifier: '',
                password: ''
            }}
        };
    }

    render(){
        return (
            <div className="App gradient-app">
                <Nav logo={'logo-white'}/>
                <div className="jumbotron jumbotron-fluid gradient flex-container-center">
                    <form onSubmit={this.handleSubmit}>
                        <h1>Log In</h1>
                        <hr/>
                        {this.state.res.data && this.state.res.data.error &&
                            <div className="label error-label">
                                {this.state.res.data.error}
                            </div>
                        }
                        <div className="label">
                            Username or email
                            <input type="text" name="identifier" value={this.state.data.identifier} onChange={this.handleChange} required/>
                        </div>
                        <div className="label">
                            Password
                            <input type="password" name="password" value={this.state.data.password} onChange={this.handleChange} required/>
                        </div>
                        <input type="submit" value="Submit"/>
                    </form>
                </div>
            </div>
        );
    }

    async handleSubmit(e){
        e.preventDefault();

        await super.handleSubmit(e);

        if(this.state.res.data){
            if(this.state.res.data.auth_success){
                await super.buildSession();
                this.props.history.push('/dashboard');
            }
        }
    }

}
