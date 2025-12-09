import axios from "axios";

const header = axios.create({
    baseURL: 'http://localhost:5000/api/v1/',
})

const useAxios = () => {
    return header
};

export default useAxios; 