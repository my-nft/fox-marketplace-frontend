import axios from "axios";
import { toast } from "react-toastify";

axios.interceptors.request.use((config)=>{
    const token = localStorage.getItem( 'token' ) || '';
    if(token) config.headers.Authorization =  `Bearer ${token}`;
    return config;
})

axios.interceptors.response.use(null, (error) => {
    const expectedError =
        error.response &&
        error.response.status >= 400 &&
        error.response.status < 500;

    if (!expectedError) {
        toast.error("An unexpected error occurred.");
    }
    return Promise.reject(error);
});

const methods = {
    get: axios.get,
    post: axios.post,
    put: axios.put,
    delete: axios.delete,
}

export default methods ;
