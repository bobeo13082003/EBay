import axios from "axios";

/**
 * Axios instance dùng chung cho toàn app
 */
const axiosClient = axios.create({
    baseURL: "http://localhost:9999/api",
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    },
});

/* ============================
   REQUEST INTERCEPTOR
   ============================ */
axiosClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

/* ============================
   RESPONSE INTERCEPTOR
   ============================ */
axiosClient.interceptors.response.use(
    (response) => {
        // Thành công → trả thẳng response
        return response;
    },
    (error) => {
        const status = error.response?.status;
        const message =
            error.response?.data?.message || "Something went wrong";

        switch (status) {
            case 401:
                console.warn("401 Unauthorized – redirect to login");
                localStorage.removeItem("token");
                window.location.href = "/login";
                break;

            case 403:
                alert("You do not have permission to perform this action");
                break;

            case 500:
                alert("Server error. Please try again later.");
                break;

            default:
                console.error("API Error:", message);
        }

        return Promise.reject(error);
    }
);

export default axiosClient;
