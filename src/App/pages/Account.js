import { Nav, PageHeader } from '../components/Nav';
import AuthProtectedForm from '../components/AuthProtectedForm';
import requests from '../../requests';

import { CgPen, CgCloseO } from 'react-icons/cg';
import Files from 'react-files';

export default class Account extends AuthProtectedForm {

    constructor(props){
        super(props, '/user/', 'PATCH');

        this.setEdit = this.setEdit.bind(this);
        this.connection.url += '?id=' + this.state.userId;

        this.state = {
            ...this.state,
            res: {data: null},
            editing: false,
            data: {
                username: '',
                email: '',
                password: '',
                first_name: '',
                last_name: '',
            },
            files: []
        }
    }

    async componentDidMount(){
        super.componentDidMount();

        let res = await requests.makeRequest({url: '/user/?id=' + this.state.userId, method: 'GET'});
        if(res && res.data && res.data.data){
            this.setState({data: res.data.data});
        }

    }

    render(){
        return (
            <div className="App App-flex">
                <Nav history={this.props.history}/>
                <div className="content">
                    <PageHeader title={'Account Details'}/>
                    <button className="edit-button" onClick={this.setEdit}>{this.state.editing ? <CgCloseO/> : <CgPen/>}</button>
                    <form onSubmit={this.handleFileSubmit}>
                        {this.state.res.data && this.state.res.data.error &&
                            <div className="label error-label">
                                {this.state.res.data.error}
                            </div>
                        }
                        <div className="flex-container-between">
                            <div className="label">
                                First Name
                                <input type="text" name="first_name" value={this.state.data.first_name} onChange={this.handleChange} disabled={!this.state.editing} required/>
                            </div>
                            <div className="label">
                                Last Name
                                <input type="text" name="last_name" value={this.state.data.last_name} onChange={this.handleChange} disabled={!this.state.editing} required/>
                            </div>
                        </div>
                        <div className="flex-container-between">
                            <div className="label">
                                Username
                                <input type="text" name="username" value={this.state.data.username} onChange={this.handleChange} disabled={!this.state.editing} required/>
                            </div>
                            <div className="label">
                                Email
                                <input type="email" name="email" value={this.state.data.email} onChange={this.handleChange} disabled={!this.state.editing} required/>
                            </div>
                        </div>
                        <div className="flex-container-between">
                            <div className="label">
                                Password
                                <input type="password" name="password" value={this.state.data.password} onChange={this.handleChange} disabled={!this.state.editing} required/>
                            </div>
                            <div className="label file-dropzone-label">
                                Avatar
                                <Files
                                  className={'file-dropzone' + (this.state.editing ? '' : ' disabled')}
                                  onChange={this.handleFileChange}
                                  onError={this.handleFileError}
                                  accepts={['image/png', 'image/jpg', 'image/svg', 'image/bmp']}
                                  maxFileSize={10000000}
                                  minFileSize={0}
                                  clickable={this.state.editing}
                                  required
                                >
                                    {this.state.editing ?
                                        <>
                                            Change File
                                            {this.state.files.length > 0 && <>
                                                    <hr/><p className="file-preview avatar-preview">
                                                        <img src={this.state.files[0].preview.url} alt="prev"/>
                                                        <span>{this.state.files[0].name}</span>
                                                    </p>
                                            </>}
                                        </>
                                        :
                                        <p className="file-preview avatar-preview">
                                            <img src={requests.staticURL('/img/avatars/' + this.state.data.avatar)} alt="prev"/>
                                            <span>{this.state.data.avatar}</span>
                                        </p>
                                    }
                                </Files>
                            </div>
                        </div>
                        {this.state.editing && <input type="submit" value="Save Changes"/>}
                    </form>
                </div>
            </div>
        );
    }

    async handleFileSubmit(e){
        await super.handleFileSubmit(e);

        let res = this.state.res;
        if(res.data && (!res.data.error && res.data.data)){
            this.setState({data: res.data.data, editing: false});
        }
    }

    setEdit(_e){
        this.setState({editing: !this.state.editing});
    }

}
