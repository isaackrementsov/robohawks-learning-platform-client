import { Component } from 'react';
import auth from '../../auth';
import requests from '../../requests';

import { API_BASE } from '../../config';

export default class Form extends Component {

    constructor(props, url='/', method='POST', nonAuth=false){
        super(props);

        this.connection = {url: url, method: method};
        this.state = {filenames: [], files: [], url: API_BASE, res: {data: null}, nonAuth};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleFilesChange = this.handleFilesChange.bind(this);
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

        const files = this.state.files
        if(files.length > 0){
            // Submit file with multipart request
            await this.makeFileRequest(files);
        }

        // Submit JSON data without the file
        await this.handleSubmit(e);
    }

    async makeRequest(){
        let res = await requests.makeRequest({
            url: this.connection.url,
            method: this.connection.method,
            data: this.state.data,
        });

        return res;
    }

    async makeFileRequest(files){
        let formData = new FormData();
        for(let i = 0; i < files.length; i++){
            formData.append(`files[${i}]`, files[i]);
        }

        let parts = this.connection.url.split('?');
        const newURL = parts[0] + 'files?' + parts[1];

        let res = await requests.makeMultipartRequest({
            url: newURL,
            method: this.connection.method,
            data: formData
        });

        return res;
    }

    async buildSession(){
        let data = this.state.res.data;

        if(data && data.auth_success){
            await auth.buildSession(data.user_id, data.instructor, data.admin, data.avatar);
        }
    }

    handleFilesChange(files){
        this.setState({files});
    }

    handleFilesError(_files){
        console.log('Error handling files!');
    }

    setError(msg){
        let res = this.state.res;
        res.error = msg;

        this.setState({res});
    }

    setData(obj){
        let data = {
            ...this.state.data,
            ...obj
        };

        this.setState({data});
    }

}
