import { Component } from 'react';
import auth from '../../auth.js';
import requests from '../../requests.js';

import { API_BASE } from '../../config.js';

export default class Form extends Component {

    constructor(props, url='/', method='POST', nonAuth=false){
        super(props);

        this.connection = {url: url, method: method};
        this.state = {filenames: [], url: API_BASE, method: 'POST', res: {}, nonAuth};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleFileChange = this.handleFileChange.bind(this);
        this.handleFileSubmit = this.handleFileSubmit.bind(this);
    }

    componentDidMount(){
        if(auth.loggedIn() && this.state.nonAuth){
            this.props.history.push('/dashboard')
        }
    }

    handleChange(e){
        let update = {data: this.state.data};
        let val = e.target.value;

        if(e.target.type === 'checkbox'){
            val = !update.data[e.target.name];
        }
        update.data[e.target.name] = val;

        this.setState(update);
    }

    async handleSubmit(e){
        e.preventDefault();
        const res = await this.makeRequest();
        this.setState({res});
    }

    async handleFileSubmit(e){
        e.preventDefault();
        await this.handleSubmit(e);
        /*
        if(this.state.data.file){
            this.state.data.file = await this.toBase64(this.state.data.file);
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

    async buildSession(){
        let data = this.state.res.data;
        
        if(data && data.auth_success){
            await auth.buildSession(data.user_id, data.instructor, data.admin);
        }
    }

    handleFileChange(files){
        if(files && files.length > 0){
            this.setState({filenames: [files[0].name]});
        }
    }

    handleFileError(_files){
        console.log('Error handling files!');
    }

    toBase64(file){
        return new Promise((resolve, reject) => {
            const reader = new FileReader();

            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    }
}
