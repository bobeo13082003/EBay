import axios from "./axiosCustomize";

export const createOrder = (data) => axios.post("/orders", data);

