import axios from "axios";
import { toast } from "react-toastify";

let reqInstance = axios.create({
  headers: {
    "X-CHAIN-ID" : "90001"
  },
});

reqInstance.interceptors.request.use((config) => {
  return {
    ...config,
    "Access-Control-Allow-Origin": "*",
  };
});

reqInstance.interceptors.response.use(null, (error) => {
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
  get: reqInstance.get,
  post: reqInstance.post,
  put: reqInstance.put,
  delete: reqInstance.delete,
};

export default methods;
