import axios from "axios";

const axiosInstance: any = axios.create({
    baseURL: "http://217.114.4.62:30300/api/"
})

axiosInstance.interceptors.request.use((config: any): any => {
    const access_token = localStorage.getItem("access_token")
    if (access_token) {
        config.headers["Authorization"] = `Bearer ${access_token}`
    }
    return config
})
export default axiosInstance;