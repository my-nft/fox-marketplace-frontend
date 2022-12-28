import apiUrl from "../config/api";
import methods from "../config/axiosConfig";

const utilsApiEndpoint = apiUrl + "utils/";


export function getStats() {
    return methods.get(utilsApiEndpoint+"stats");
  }

