import axios from "./axiosCustomize";

export const getAddresses = () =>
    axios.get("/addresses");

export const createAddress = (data) =>
    axios.post("/addresses", data);

export const setDefaultAddress = (id) =>
    axios.patch(`/addresses/${id}/default`);

export const deleteAddress = (id) =>
    axios.delete(`/addresses/${id}`);