import { API_BASE } from './config';
import axios from 'axios';

const requests = {
    makeRequest: options => {
        options.url = API_BASE + options.url
        return axios({...options, headers: {'Content-Type': 'application/json'}, withCredentials: true});
    }
};

export default requests;
