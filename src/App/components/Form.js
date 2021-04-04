import { Component } from 'react';
import auth from '../../auth';
import requests from '../../requests';

import { API_BASE } from '../../config';

export default class Form extends Component {

    constructor(props, url='/', method='POST', nonAuth=false){
        super(props);

        this.connection = {url: url, method: method};
        this.state = {filenames: [], url: API_BASE, res: {}, nonAuth};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleFileChange = this.handleFileChange.bind(this);
        this.handleFileSubmit = this.handleFileSubmit.bind(this);
    }

    componentDidMount(){
        if(auth.loggedIn() && this.state.nonAuth){
            this.props.history.push('/dashboard');
        }
    }

    handleChange(e){
        let update = {data: this.state.data};
        let val = e.target.value;

        if(e.target.type === 'checkbox'){
            val = !update.data[e.target.name];
        }else{
            update.data[e.target.name] = val;
        }

        this.setState(update);
    }

    async handleSubmit(e){
        e.preventDefault();
        const res = await this.makeRequest();
        this.setState({res});
    }

    async handleFileSubmit(e){
        e.preventDefault();

        // Submit JSON data without the file
        await this.handleSubmit(e);

        const files = this.state.files
        console.log(files);
        /*
        if(files.length > 0){
            // Submit file with multipart request
            this.makeFileRequest(files);
        }
        */
    }

    async makeRequest(){
        let res = await requests.makeRequest({
            url: this.connection.url,
            method: this.connection.method,
            data: this.state.data,
        });

        return res;
    }

    async makeFileRequest(file){
        const formData = new FormData();
        formData.append('file', file, file.name);

        let parts = this.connection.url.split('?');
        const newURL = parts[0] + 'file?' + parts[1];

        let res = await requests.makeMultipartRequest({
            url: newURL,
            method: this.connection.method,
            data: file
        });

        return res;
    }

    async buildSession(){
        let data = this.state.res.data;

        if(data && data.auth_success){
            await auth.buildSession(data.user_id, data.instructor, data.admin, data.avatar);
        }
    }

    handleFileChange(files){
        if(files && files.length > 0){
            let data = this.state.data;
            data.files = files;

            this.setState({filenames: files.map(f => f.name), data: data});
        }
    }

    handleFileError(_files){
        console.log('Error handling files!');
    }

}
