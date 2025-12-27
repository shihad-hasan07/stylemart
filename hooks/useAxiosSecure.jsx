import axios from "axios";
import { auth } from "@/Auth/firebase.init";

const axiosSecure = axios.create({
    // baseURL: 'http://localhost:5000/api/v1/',
    baseURL: 'https://stylemart-server-v2.vercel.app/api/v1/',
});

axiosSecure.interceptors.request.use(
    async (config) => {
        const user = auth.currentUser;

        if (user) {
            const token = await user.getIdToken();
            console.log('I got user and generat the tokne', token);
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);

export default function useAxiosSecure() {
    return axiosSecure;
}