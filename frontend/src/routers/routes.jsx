import { createBrowserRouter, Navigate } from "react-router-dom";

// import Home from "../pages/Home";
import Register from "../pages/Register";
import NotFound from "../pages/NotFound";
import Login from "../pages/Login";
import VerifyOtp from "../pages/VerifyOtp";
import Profile from "../pages/Profile";
import Cart from "../pages/Cart";
import ShippingAddress from "../pages/ShippingAddress";
import PaymentVNPay from "../pages/PaymentVNPay";
import PaymentCOD from "../pages/PaymentCOD";
import VNPayCheckout from "../pages/VNPayCheckout";
import PaymentSuccess from "../pages/PaymentSuccess";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Navigate to="/cart" replace />,
    },
    {
        // element: <AuthLayout />,
        children: [
            { path: "/register", element: <Register /> },
            { path: "/login", element: <Login /> },
            { path: "/verify-otp", element: <VerifyOtp /> },
        ],
    },
    {
        path: "/profile",
        element: <Profile />,
    },
    {
        path: "/cart",
        element: <Cart />,
    },
    {
        path: "/shipping-address",
        element: <ShippingAddress />,
    },
    {
        path: "/payment-vnpay",
        element: <PaymentVNPay />,
    },
    {
        path: "/vnpay-checkout",
        element: <VNPayCheckout />,
    },
    {
        path: "/payment-success",
        element: <PaymentSuccess />,
    },
    {
        path: "/payment-cod",
        element: <PaymentCOD />,
    },

    {
        path: "*",
        element: <NotFound />,
    },
]);

export default router;
