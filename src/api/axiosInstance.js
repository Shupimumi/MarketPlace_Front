import axios from "axios";
import apiUrls from "../config/apiUrls";

const axiosInstance = axios.create({
    baseURL: apiUrls.BASE_URL,
    timeout: 50000,
    headers: {
        'Content-Type': 'application/json', // Общие заголовки
    },
});

export default axiosInstance;