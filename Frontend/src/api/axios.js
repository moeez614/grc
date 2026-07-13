import axios from "axios";
import { Meta } from "react-router-dom";


const API = axios.create({
    baseURL: import.meta.env.VITE_API_URL + "/api"
    // baseURL:"http://localhost:5000/api"
});


API.interceptors.request.use((config) => {

    const token = localStorage.getItem("adminToken");


    if (token) {

        config.headers.Authorization =
            `Bearer ${token}`;

    }


    return config;

});


export default API;