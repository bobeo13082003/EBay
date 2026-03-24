import axios from "./axiosCustomize";

// Register
export const registerApi = (data) =>
    axios.post("/auth/register", data);

// Verify OTP
export const verifyOtpApi = (data) =>
    axios.post("/auth/verifyOtp", data);

// Login Google
export const loginGoogleApi = (credential) =>
    axios.post("/auth/google", { credential });

export const loginApi = (data) =>
    axios.post("/auth/login", data);

export const getProfile = () => {
    return axios.get("/user");
};

export const updateProfile = (data) => {
    return axios.put("/user", data);
};
