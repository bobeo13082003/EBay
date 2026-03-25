import axios from "./axiosCustomize";

export const validateCoupon = (data) => axios.post("/coupons/validate", data);

