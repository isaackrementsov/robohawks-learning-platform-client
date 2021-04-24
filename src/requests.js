import { API_BASE } from './config';
import axios from 'axios';

const requests = {

    makeRequest: async options => {
        options.url = API_BASE + options.url;
        try {
            return await axios({...options, headers: {'Content-Type': 'application/json'}, withCredentials: true, crossorigin: true});
        }catch(e){
            return {data: {error: 'There was an error making the request'}};
        }
    },

    makeMultipartRequest: async options => {
        options.url = API_BASE + options.url;
        try {
            return await axios({...options, headers: {'Content-Type': 'multipart/form-data'}, withCredentials: true, crossorigin: true})
        }catch(e){
            return {data: {error: 'There was an error making the request'}};
        }
    },

    staticURL: original => API_BASE + '/static' + original,
    cssURL: original => 'url(' + original + ')',
    cssStaticURL: original => requests.cssURL(requests.staticURL(original)),

    checkData: obj => obj && obj.data && obj.data.data
};

export default requests;
