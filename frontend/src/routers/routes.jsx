import { createBrowserRouter, Navigate } from "react-router-dom";

import Register from "../pages/Register";
import NotFound from "../pages/NotFound";
import Login from "../pages/Login";
import VerifyOtp from "../pages/VerifyOtp";
import Profile from "../pages/Profile";
import HomePage from "../pages/HomePage";
import { ProductDetail } from "../pages/ProductDetail";
import SearchResults from "../pages/SearchResult";

const router = createBrowserRouter([
    // {
    //     path: "/",
    //     element: <Navigate to="/login" replace />,
    // },
    {
        // element: <AuthLayout />,
        children: [
            { path: "/register", element: <Register /> },
            { path: "/login", element: <Login /> },
            { path: "/verify-otp", element: <VerifyOtp /> },
        ],
    },
    {
        children: [
            { path: "/home", element: <HomePage /> },
            { path: "/products/:id", element: <ProductDetail /> },
            { path: "/search", element: <SearchResults /> },
        ],
    },
    {
        path: "/profile",
        element: <Profile />,
    },

    {
        path: "*",
        element: <NotFound />,
    },
]);

export default router;