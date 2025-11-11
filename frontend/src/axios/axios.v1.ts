import axios, { AxiosInstance } from "axios";

// Custom wrapper type
type ExtractedAxiosInstance = Omit<AxiosInstance, 'get' | 'post' | 'put' | 'delete'> & {
    get<T = any, R = T>(...args: Parameters<AxiosInstance['get']>): Promise<R>;
    post<T = any, R = T>(...args: Parameters<AxiosInstance['post']>): Promise<R>;
    put<T = any, R = T>(...args: Parameters<AxiosInstance['put']>): Promise<R>;
    delete<T = any, R = T>(...args: Parameters<AxiosInstance['delete']>): Promise<R>;
};

const api = axios.create({
    baseURL: process.env.NESTJS_URL,
    timeout: 10000,
}) as ExtractedAxiosInstance;

api.interceptors.request.use(
    (config) => {
        const user = localStorage.getItem("user");

        let parsedUser = {};
        try {
            parsedUser = JSON.parse(user || "{}");
        } catch (error) {
            console.error("Error parsing user data:", error);
        }
        // @ts-ignore 
        const token = parsedUser?.token;

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        } else {
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => {
        return response.data;
    },
    (error) => {
        if (error.response && error.response.status === 401) {
            localStorage.removeItem("user");
            window.location.href = "/login";
            console.log("Unauthorized, redirecting to login...");
        }

        console.error("API Error:", error.response?.data || error.message);
        return Promise.reject(error);
    }
);

export default api;
