import axios from 'axios';

export const FETCH_CLIENTS = 'fetch_clients';
export const FETCH_CLIENT = 'fetch_client';
export const CREATE_CLIENT = 'create_client';


const ROOT_URL = 'http://api.demo.lakmus.org/api';

export function fetchClients(start = 3500) {
    const request = axios.get(`${ROOT_URL}/clients?_start=${start}&_limit=50`);

    return {
        type: FETCH_CLIENTS,
        payload: request
    }
}

export function createClient(values, callback) {
    const request = axios.post(`${ROOT_URL}/clients`, values)
        .then(() => callback());

    return {
        type: CREATE_CLIENT,
        payload: request
    }
}

export function fetchClient(id) {
    const request = axios.get(`${ROOT_URL}/clients/${id}`);

    return {
        type: FETCH_CLIENT,
        payload: request
    }
}