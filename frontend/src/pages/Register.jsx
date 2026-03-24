import { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { registerApi, loginGoogleApi } from "../services/authApi";
import TextInput from "../components/TextInput";
import { toastError, toastSuccess } from "../utils/toast";
import { useNavigate } from "react-router-dom";

export default function Register() {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleRegister = async () => {
        try {
            const payload = {
                username: `${form.firstName} ${form.lastName}`.trim(),
                email: form.email,
                password: form.password,
            };

            const res = await registerApi(payload);

            if (res.data?.status === 201) {
                toastSuccess(res.data.message);

                navigate("/verify-otp", {
                    state: { email: payload.email },
                });
            }
        } catch (err) {
            toastError(err.response?.data?.message || "Register failed");
        }
    };

    const handleGoogleLogin = async (credential) => {
        try {
            const res = await loginGoogleApi(credential);
            localStorage.setItem("token", res.data.token);
            toastSuccess("Login with Google successful");
        } catch {
            toastError("Google login failed");
        }
    };

    return (
        <div className="min-h-screen flex justify-center bg-white px-4 py-12">
            <div className="w-full max-w-md">

                {/* LOGO */}
                <div className="flex justify-center mb-6 text-3xl font-bold">
                    <span className="text-red-500">e</span>
                    <span className="text-blue-500">b</span>
                    <span className="text-yellow-400">a</span>
                    <span className="text-green-500">y</span>
                </div>

                {/* FORM */}
                <div className="space-y-4">
                    <TextInput
                        label="First name"
                        name="firstName"
                        value={form.firstName}
                        onChange={handleChange}
                    />

                    <TextInput
                        label="Last name"
                        name="lastName"
                        value={form.lastName}
                        onChange={handleChange}
                    />

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

                    {/* SUBMIT */}
                    <button
                        onClick={handleRegister}
                        className="w-full bg-black text-white py-3 rounded-full"
                    >
                        Create account
                    </button>

                    {/* GOOGLE LOGIN */}
                    <GoogleLogin
                        onSuccess={(res) =>
                            handleGoogleLogin(res.credential)
                        }
                        onError={() => toastError("Google Login Error")}
                    />
                </div>

                {/* LOGIN LINK */}
                <p className="mt-6 text-sm text-center text-gray-600">
                    Already have an account?{" "}
                    <a
                        href="/login"
                        className="font-medium text-black hover:underline"
                    >
                        Sign in
                    </a>
                </p>
            </div>
        </div>
    );
}
