import axios from "axios";

const header = axios.create({
    baseURL: 'http://localhost:5000/api/v1/',
    // baseURL: 'https://stylemart-server-v2.vercel.app/api/v1/',
})

const useAxios = () => {
    return header
};

export default useAxios; 