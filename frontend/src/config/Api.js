import axios from "axios";
export const API = axios.create({
    baseURL: 'localhost:8090/api/v1/', 
})