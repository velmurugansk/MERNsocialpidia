import axios from "axios";

export const BASE_URL = 'http://localhost:5000'

export const loginAPI = async (credentials) => {
    try {
        const response = await axios.post(`${BASE_URL}/auth/login`, credentials);               
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message);
    }
};

export const registerAPI = async (userdata) => {
    try {
        const response = await axios.post(`${BASE_URL}/auth/register`, userdata);        
        return response;
    } catch (error) {
        throw new Error(error.response.data.message);
    }
};
