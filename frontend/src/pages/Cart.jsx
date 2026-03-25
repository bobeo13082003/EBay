import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { getMyCart, updateCartItem, removeCartItem, addCartItem } from "../services/cart";
import { createOrder } from "../services/order";
import { validateCoupon } from "../services/coupon";
import { getAddresses } from "../services/address";
import { TopUtilityBar } from "../components/TopUtilityBar";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

import {
  clearLocalCartItems,
  getLocalCartItems,
  setLocalCartItemQuantity,
} from "../utils/cartStorage";

import {
  toastError,
  toastInfo,
  toastSuccess,
} from "../utils/toast";

const productDetailUrl = (id) => `http://localhost:9999/products/${id}`;

export default function Cart() {
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);

  const [cartItems, setCartItems] = useState([]); // [{productId, quantity}]
  const [productsById, setProductsById] = useState({});

  const [loading, setLoading] = useState(true);
  const [cartActionLoading, setCartActionLoading] = useState(false);

  const [couponCode, setCouponCode] = useState("");
  const [coupon, setCoupon] = useState(null); // { code, discountPercent }
  const [couponLoading, setCouponLoading] = useState(false);

  const [addresses, setAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState(null);

  const subtotalPrice = useMemo(() => {
    return cartItems.reduce((sum, it) => {
      const product = productsById[it.productId];
      const price = Number(product?.price || 0);
      return sum + price * Number(it.quantity || 0);
    }, 0);
  }, [cartItems, productsById]);

  const discountAmount = useMemo(() => {
    if (!coupon) return 0;
    return (subtotalPrice * Number(coupon.discountPercent || 0)) / 100;
  }, [coupon, subtotalPrice]);

  const totalPrice = useMemo(() => {
    return Math.max(0, subtotalPrice - discountAmount);
  }, [subtotalPrice, discountAmount]);

  const loadProductsForCart = async (items) => {
    const ids = items.map((x) => x.productId);
    if (ids.length === 0) {
      setProductsById({});
      return;
    }

    const uniqueIds = [...new Set(ids)];
    const results = await Promise.all(
      uniqueIds.map(async (id) => {
        const res = await fetch(productDetailUrl(id));
        const data = await res.json();
        return [id, data];
      })
    );

    const map = {};
    for (const [id, data] of results) {
      map[id] = data;
    }
    setProductsById(map);
  };

  useEffect(() => {
    const run = async () => {
      setLoading(true);
      try {
        const localItems = getLocalCartItems();

        if (token) {
          // Sync local cart into server cart once user logs in
          if (localItems.length > 0) {
            for (const it of localItems) {
              await addCartItem({
                productId: it.productId,
                quantity: it.quantity,
              });
            }
            clearLocalCartItems();
          }

          const cartRes = await getMyCart();
          const serverCartItems = cartRes.data?.data?.items || [];
          setCartItems(
            serverCartItems.map((i) => ({
              productId: i.productId?.toString(),
              quantity: Number(i.quantity),
            }))
          );
        } else {
          setCartItems(localItems);
        }

        setCoupon(null);
        setCouponCode("");
      } catch (err) {
        toastError(err.response?.data?.message || "Cannot load cart");
      } finally {
        setLoading(false);
      }
    };

    run();
  }, [token]);

  useEffect(() => {
    loadProductsForCart(cartItems);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartItems]);

  useEffect(() => {
    const run = async () => {
      if (!token) return;
      try {
        const addrRes = await getAddresses();
        const list = addrRes.data?.data || [];
        setAddresses(list);
        const def = list.find((a) => a.isDefault) || list[0];
        setSelectedAddressId(def?._id || null);
      } catch (err) {
        toastError(err.response?.data?.message || "Cannot load addresses");
      }
    };
    run();
  }, [token]);

  const handleSetQuantity = async (productId, nextQty) => {
    const qtyNum = Number(nextQty);
    if (!Number.isFinite(qtyNum) || qtyNum < 0) return;

    const product = productsById[productId];
    const maxQty = Number(product?.quantity || 0);
    const clampedQty = maxQty > 0 ? Math.min(qtyNum, maxQty) : qtyNum;

    if (!token) {
      setLocalCartItemQuantity(productId, clampedQty);
      setCartItems(getLocalCartItems());
      return;
    }

    try {
      setCartActionLoading(true);
      if (clampedQty === 0) {
        const res = await removeCartItem(productId);
        const updatedItems = res.data?.data?.items || [];
        setCartItems(
          updatedItems.map((i) => ({
            productId: i.productId?.toString(),
            quantity: Number(i.quantity),
          }))
        );
      } else {
        const res = await updateCartItem(productId, clampedQty);
        const updatedItems = res.data?.data?.items || [];
        setCartItems(
          updatedItems.map((i) => ({
            productId: i.productId?.toString(),
            quantity: Number(i.quantity),
          }))
        );
      }
    } catch (err) {
      toastError(err.response?.data?.message || "Update cart failed");
    } finally {
      setCartActionLoading(false);
    }
  };

  const handleApplyCoupon = async () => {
    if (!token) {
      toastInfo("Please sign in to use coupon");
      navigate("/login");
      return;
    }
    const code = couponCode.trim();
    if (!code) return;

    try {
      setCouponLoading(true);
      const productIds = cartItems.map((x) => x.productId).filter(Boolean);
      const res = await validateCoupon({ code, productIds });
      if (res.data?.valid) {
        setCoupon({
          code,
          discountPercent: res.data?.data?.discountPercent,
        });
        toastSuccess("Coupon applied");
      } else {
        setCoupon(null);
        toastError(res.data?.message || "Invalid coupon");
      }
    } catch (err) {
      setCoupon(null);
      toastError(err.response?.data?.message || "Invalid coupon");
    } finally {
      setCouponLoading(false);
    }
  };

  const handlePlaceOrder = async () => {
    if (!token) {
      toastInfo("Please sign in to place an order");
      navigate("/login");
      return;
    }

    if (cartItems.length === 0) {
      toastInfo("Your cart is empty");
      return;
    }

    if (!selectedAddressId) {
      toastError("Please select a delivery address");
      return;
    }

    try {
      setCartActionLoading(true);
      const payload = {
        addressId: selectedAddressId,
      };
      if (coupon?.code) payload.couponCode = coupon.code;

      const res = await createOrder(payload);
      if (res.status === 201 || res.data?.status === 201) {
        toastSuccess("Order created successfully");
      } else {
        toastSuccess("Order created successfully");
      }

      clearLocalCartItems();
      const updated = await getMyCart();
      const updatedItems = updated.data?.data?.items || [];
      setCartItems(
        updatedItems.map((i) => ({
          productId: i.productId?.toString(),
          quantity: Number(i.quantity),
        }))
      );
      setCoupon(null);
      setCouponCode("");
    } catch (err) {
      toastError(err.response?.data?.message || "Place order failed");
    } finally {
      setCartActionLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-16 h-16 border-2 border-gray-200 border-t-blue-600 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen py-10">
      <TopUtilityBar />
      <Header />
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold">Shopping Cart</h1>
          <button
            onClick={() => navigate("/home")}
            className="text-blue-600 hover:underline text-sm"
          >
            Continue shopping
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8 space-y-4">
            {cartItems.length === 0 ? (
              <div className="bg-white rounded-2xl shadow-sm p-6 text-gray-600">
                Your cart is empty.
              </div>
            ) : (
              cartItems.map((it) => {
                const product = productsById[it.productId];
                if (!product) return null;
                return (
                  <div
                    key={it.productId}
                    className="bg-white p-5 rounded-2xl shadow-sm flex gap-4"
                  >
                    <img
                      src={
                        product?.images?.[0]
                          ? `${product.images[0]}/300`
                          : "/images/logo.png"
                      }
                      alt={product.title}
                      className="w-24 h-24 rounded-xl border object-cover bg-white"
                    />
                    <div className="flex-1">
                      <div className="font-semibold text-gray-800">
                        {product.title}
                      </div>
                      <div className="text-sm text-gray-500 mt-1">
                        US ${product.price}
                      </div>

                      <div className="flex items-center gap-3 mt-4">
                        <button
                          className="w-9 h-9 rounded-md border border-gray-300 hover:bg-gray-50 disabled:opacity-50"
                          onClick={() => handleSetQuantity(it.productId, it.quantity - 1)}
                          disabled={cartActionLoading || it.quantity <= 1}
                        >
                          -
                        </button>

                        <input
                          type="number"
                          min={1}
                          value={it.quantity}
                          onChange={(e) =>
                            handleSetQuantity(it.productId, e.target.value)
                          }
                          className="w-20 rounded-xl border-2 px-3 py-2 text-center outline-none border-gray-300 focus:border-gray-700 disabled:opacity-50"
                          disabled={cartActionLoading}
                        />

                        <button
                          className="w-9 h-9 rounded-md border border-gray-300 hover:bg-gray-50 disabled:opacity-50"
                          onClick={() => handleSetQuantity(it.productId, it.quantity + 1)}
                          disabled={cartActionLoading || it.quantity >= Number(product.quantity || 0)}
                        >
                          +
                        </button>
                      </div>

                      <div className="mt-3 text-sm text-gray-600">
                        Line total: US ${(Number(product.price) * Number(it.quantity)).toFixed(2)}
                      </div>

                      <button
                        onClick={() => handleSetQuantity(it.productId, 0)}
                        className="mt-3 text-sm text-red-500 hover:underline"
                        disabled={cartActionLoading}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          <div className="lg:col-span-4 space-y-4">
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-4">Checkout</h2>

              <div className="space-y-3">
                <div>
                  <div className="text-sm font-medium text-gray-700 mb-2">Delivery address</div>
                  {addresses.length === 0 ? (
                    <div className="text-sm text-gray-500">No address found.</div>
                  ) : (
                    <select
                      value={selectedAddressId || ""}
                      onChange={(e) => setSelectedAddressId(e.target.value)}
                      className="w-full border p-2 rounded-lg text-sm"
                      disabled={!token}
                    >
                      {addresses.map((a) => (
                        <option key={a._id} value={a._id}>
                          {a.fullName} - {a.addressLine}, {a.city} ({a.country})
                          {a.isDefault ? " [Default]" : ""}
                        </option>
                      ))}
                    </select>
                  )}
                </div>

                <div>
                  <div className="text-sm font-medium text-gray-700 mb-2">Coupon</div>
                  <div className="flex gap-2">
                    <input
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      placeholder="Enter coupon code"
                      className="flex-1 border p-2 rounded-lg text-sm outline-none focus:border-gray-700"
                      disabled={!token}
                    />
                    <button
                      onClick={handleApplyCoupon}
                      disabled={couponLoading || !token || cartItems.length === 0}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 disabled:opacity-50"
                    >
                      Apply
                    </button>
                  </div>
                  {coupon && (
                    <div className="text-sm text-green-700 mt-2">
                      Applied: {coupon.code} ({coupon.discountPercent}% off)
                    </div>
                  )}
                </div>

                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between text-sm text-gray-700">
                    <span>Subtotal</span>
                    <span>US ${subtotalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-700">
                    <span>Discount</span>
                    <span>- US ${discountAmount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-base font-semibold pt-1">
                    <span>Total</span>
                    <span>US ${totalPrice.toFixed(2)}</span>
                  </div>
                </div>

                <button
                  onClick={handlePlaceOrder}
                  disabled={cartActionLoading || cartItems.length === 0}
                  className="w-full mt-2 flex items-center justify-center gap-2 rounded-3xl bg-blue-600 px-6 py-3 font-semibold text-white text-base hover:bg-blue-700 disabled:opacity-50"
                >
                  Place order
                </button>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm p-6 text-sm text-gray-600">
              Tip: Coupon is validated on the server, and stock is reduced when the order is created.
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

