//import Files from 'react-files';

import Nav from '../components/Nav';
import Form from '../components/Form.js';
import './Gradient.css';

export default class Signup extends Form {

    constructor(props){
        super(props, '/user/', 'POST', true);

        this.state = {
            ...this.state,
            ...{
                data: {
                    username: 'isaackrementsov',
                    password: 'isaackrementsov',
                    first_name: 'Isaac',
                    last_name: 'Krementsov',
                    email: 'isaackrementsov@gmail.com',
                    instructor: false,
                    file: null
                },
                res: {data: null}
            }
        };
    }

    render(){
        return (
            <div className="App gradient-app">
                <Nav logo={'logo-white'}/>
                <div className="jumbotron jumbotron-fluid gradient flex-container-center">
                    <form onSubmit={this.handleFileSubmit}>
                        <h1>Sign Up</h1>
                        <hr/>
                        {this.state.res.data && this.state.res.data.error &&
                            <div className="label error-label">
                                {this.state.res.data.error}
                            </div>
                        }
                        <div className="flex-container-between">
                            <div className="label">
                                First Name
                                <input type="text" name="first_name" value={this.state.data.first_name} onChange={this.handleChange} required/>
                            </div>
                            <div className="label">
                                Last Name
                                <input type="text" name="last_name" value={this.state.data.last_name} onChange={this.handleChange} required/>
                            </div>
                        </div>
                        <div className="label">
                            Email
                            <input type="email" name="email" value={this.state.data.email} onChange={this.handleChange} required/>
                        </div>
                        <div className="flex-container-between">
                            <div className="label" style={{width: '60%'}}>
                                Username
                                <input type="text" name="username" value={this.state.data.username} onChange={this.handleChange} required/>
                            </div>
                            <div className="label checkbox-label" style={{width: '35%'}}>
                                <div>
                                    <input type="checkbox" name="instructor" checked={this.state.data.instructor} onChange={this.handleChange}/>
                                    <span>I'm a teacher</span>
                                </div>
                            </div>
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

    async handleFileSubmit(e){
        e.preventDefault();

        await super.handleFileSubmit(e);

        if(this.state.res.data){
            if(this.state.res.data.auth_success){
                await super.buildSession();
                this.props.history.push('/dashboard');
            }
        }
    }

}

/*
<div className="label file-dropzone-label">
    Avatar
    <Files
      className='file-dropzone'
      onChange={this.handleFileChange}
      onError={this.handleFileError}
      accepts={['image/png', 'image/jpg', 'image/svg', 'image/bmp']}
      maxFileSize={10000000}
      minFileSize={0}
      clickable
      required
    >
    Upload File
    {this.state.filenames.length > 0 && <><hr/><span>{this.state.filenames[0]}</span></>}
    </Files>
</div>
*/
