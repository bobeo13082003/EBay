import { createBrowserRouter, Navigate } from "react-router-dom";


// import Home from "../pages/Home";
import Register from "../pages/Register";
import NotFound from "../pages/NotFound";
import Login from "../pages/Login";
import VerifyOtp from "../pages/VerifyOtp";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Navigate to="/login" replace />,
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
        path: "*",
        element: <NotFound />,
    },
]);

export default router;
