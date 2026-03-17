import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate, Link } from "react-router-dom";
import TextInput from "../components/TextInput";
import { toastError, toastSuccess } from "../utils/toast";
import { login, loginGoogle } from "../store/authSlice";

export default function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { loading } = useSelector((state) => state.auth);

    const [showPassword, setShowPassword] = useState(false);
    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    /* =============================
       LOGIN EMAIL + PASSWORD
       ============================= */
    const handleLogin = async () => {
        if (!form.email || !form.password) {
            toastError("Please enter email and password");
            return;
        }

        const res = await dispatch(login(form));

        if (login.fulfilled.match(res)) {
            toastSuccess("Login successful");
            navigate("/");
        } else {
            toastError(res.payload);
        }
    };

    /* =============================
       GOOGLE LOGIN
       ============================= */
    const handleGoogleLogin = async (credential) => {
        const res = await dispatch(loginGoogle(credential));

        if (loginGoogle.fulfilled.match(res)) {
            toastSuccess("Login with Google successful");
            navigate("/");
        } else {
            toastError(res.payload);
        }
    };

    return (
        <div className="min-h-screen flex justify-center bg-white px-4 py-12">
            <div className="w-full max-w-md">

                {/* LOGO */}
                <div className="flex justify-center mb-6 text-3xl font-bold tracking-tight">
                    <span className="text-red-500">e</span>
                    <span className="text-blue-500">b</span>
                    <span className="text-yellow-400">a</span>
                    <span className="text-green-500">y</span>
                </div>

                {/* FORM */}
                <div className="space-y-4">

                    {/* EMAIL */}
                    <TextInput
                        label="Email"
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                    />

                    {/* PASSWORD */}
                    <div className="relative">
                        <TextInput
                            label="Password"
                            type={showPassword ? "text" : "password"}
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-4 text-gray-600"
                        >
                            👁
                        </button>
                    </div>

                    {/* FORGOT PASSWORD */}
                    <div className="text-right">
                        <Link
                            to="/forgot-password"
                            className="text-sm text-black hover:underline"
                        >
                            Forgot password?
                        </Link>
                    </div>

                    {/* LOGIN BUTTON */}
                    <button
                        onClick={handleLogin}
                        disabled={loading}
                        className="
                            w-full bg-black text-white py-3 rounded-full
                            text-sm font-medium hover:bg-gray-900
                            disabled:opacity-50
                        "
                    >
                        {loading ? "Signing in..." : "Continue"}
                    </button>

                    {/* DIVIDER */}
                    <div className="flex items-center my-2">
                        <div className="flex-grow border-t border-gray-300"></div>
                        <span className="px-3 text-xs text-gray-500">or</span>
                        <div className="flex-grow border-t border-gray-300"></div>
                    </div>

                    {/* GOOGLE LOGIN */}
                    <div className="flex justify-center">
                        <GoogleLogin
                            onSuccess={(res) =>
                                handleGoogleLogin(res.credential)
                            }
                            onError={() =>
                                toastError("Google login failed")
                            }
                        />
                    </div>
                </div>

                {/* REGISTER */}
                <p className="mt-6 text-sm text-center text-gray-600">
                    New to eBay?{" "}
                    <Link
                        to="/register"
                        className="font-medium text-black hover:underline"
                    >
                        Create an account
                    </Link>
                </p>
            </div>
        </div>
    );
}
