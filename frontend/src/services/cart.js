import axios from "./axiosCustomize";

export const getMyCart = () => axios.get("/carts/me");

export const addCartItem = (data) => axios.post("/carts/items", data);

export const updateCartItem = (productId, quantity) =>
  axios.patch(`/carts/items/${productId}`, { quantity });

export const removeCartItem = (productId) =>
  axios.delete(`/carts/items/${productId}`);

