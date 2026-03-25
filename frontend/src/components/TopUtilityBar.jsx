import { ChevronDown, Bell, ShoppingCart } from "lucide-react"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"
import { logout } from "../store/authSlice";

export function TopUtilityBar() {
    const navigate = useNavigate();

    const dispatch = useDispatch();

    const token = useSelector((state) => state.auth.token);

    const handleLogout = () => {
        dispatch(logout());
        navigate("/login");
    };
    return (
        <div className="border-b border-gray-200 bg-white">
            <div className="mx-auto max-w-[1400px] px-4">
                <div className="flex items-center justify-between py-2 text-xs">
                    {/* Left side */}
                    <div className="flex items-center gap-4">
                        <span className="text-gray-600">
                            <>
                                {!token ? (
                                    <>
                                        <span
                                            onClick={() => navigate("/login")}
                                            className="text-blue-600 hover:text-blue-700 cursor-pointer underline"
                                        >
                                            Sign in
                                        </span>{" "}
                                        or{" "}
                                        <span
                                            onClick={() => navigate("/register")}
                                            className="text-blue-600 hover:text-blue-700 cursor-pointer underline"
                                        >
                                            register
                                        </span>
                                    </>
                                ) : (
                                    <>
                                        <span
                                            onClick={() => navigate("/profile")}
                                            className="text-green-600 hover:text-green-700 cursor-pointer underline"
                                        >
                                            Profile
                                        </span>{" "}
                                        |{" "}
                                        <span
                                            onClick={handleLogout}
                                            className="text-red-600 hover:text-red-700 cursor-pointer underline"
                                        >
                                            Logout
                                        </span>
                                    </>
                                )}
                            </>
                        </span>
                        <span className="text-gray-400">|</span>
                        <span className="text-gray-700 hover:text-blue-600">
                            Daily Deals
                        </span>
                        <span className="text-gray-700 hover:text-blue-600">
                            Help & Contact
                        </span>
                    </div>

                    {/* Right side */}
                    <div className="flex items-center gap-4">
                        <span className="text-gray-700 hover:text-blue-600">
                            Sell
                        </span>
                        <a
                            href="/watchlist"
                            className="flex items-center gap-1 text-gray-700 hover:text-blue-600"
                        >
                            Watchlist
                            <ChevronDown className="h-3 w-3" />
                        </a>
                        <span className="flex items-center gap-1 text-gray-700 hover:text-blue-600">
                            My eBay
                            <ChevronDown className="h-3 w-3" />
                        </span>
                        <button className="text-gray-700 hover:text-blue-600">
                            <Bell className="h-5 w-5" />
                        </button>
                        <button
                            onClick={() => navigate("/cart")}
                            className="flex items-center gap-1 text-gray-700 hover:text-blue-600 cursor-pointer"
                        >
                            <ShoppingCart className="h-5 w-5" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
