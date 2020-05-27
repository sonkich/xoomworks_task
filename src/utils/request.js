import axios from 'axios';
import { API_URL } from './constants';

const client = axios.create({
    baseURL: API_URL
});

const request = function(options) {
    if (!options.method) {
        options.method = 'get';
    }

    const onSuccess = function(response) {
        return response.data;
    };

    const onError = function(error) {
        return Promise.reject(error);
    };

    return client(options)
        .then(onSuccess)
        .catch(onError);
};

export default request;