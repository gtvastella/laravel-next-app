import axios from 'axios';
export interface BaseResponse {
    success: boolean;
    message: string;
    data: any;
}

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost/api/',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
});

api.defaults.withCredentials = true;
api.defaults.validateStatus = (status) => status >= 200 && status < 500;

api.interceptors.request.use((config) => {
    if (!document.cookie) {
        return config;
    }

    const token = document.cookie.split('; ').find(row => row.startsWith('Authorization='))?.split('=')[1];
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
}, (error) => {
    return Promise.reject(error);
});
api.interceptors.response.use((response) => {
    if (response.status === 401 && window.location.pathname !== '/login') {
        window.location.href = '/';
    }
    return response;
}, (error) => {
    if (error.response && error.response.status === 401 && window.location.pathname !== '/login') {
        window.location.href = '/';
    }
    return Promise.reject(error);
});


export default api;
