import { useEffect, useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { registerApi, loginGoogleApi } from "../services/authApi";
import TextInput from "../components/TextInput";
import { toastError, toastSuccess } from "../utils/toast";
import { Navigate, useNavigate } from "react-router-dom";

export default function Register() {
    const [type, setType] = useState("PERSONAL");
    const [showPassword, setShowPassword] = useState(false);
    const [countries, setCountries] = useState([]);
    const navigate = useNavigate()
    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        businessName: "",
        businessEmail: "",
        country: "",
    });

    /* =============================
       LOAD COUNTRY LIST
       ============================= */
    useEffect(() => {
        fetch("https://restcountries.com/v3.1/all?fields=name,cca2")
            .then((res) => res.json())
            .then((data) => {
                if (!Array.isArray(data)) return;

                const list = data
                    .filter((c) => c.cca2 && c.name?.common)
                    .map((c) => ({
                        code: c.cca2,
                        name: c.name.common,
                    }))
                    .sort((a, b) => a.name.localeCompare(b.name));

                setCountries(list);
            })
            .catch(() => setCountries([]));
    }, []);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };
    const handleRegister = async () => {
        try {
            const payload =
                type === "PERSONAL"
                    ? {
                        username: `${form.firstName} ${form.lastName}`.trim(),
                        email: form.email,
                        password: form.password,
                    }
                    : {
                        username: form.businessName,
                        email: form.businessEmail,
                        password: form.password,
                        country: form.country,
                    };

            const res = await registerApi(payload);

            console.log(res);


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
            alert("Login with Google successful");
        } catch {
            alert("Google login failed");
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

                {/* TYPE TOGGLE */}
                <div className="flex rounded-full border p-1 mb-6">
                    {["PERSONAL", "BUSINESS"].map((t) => (
                        <button
                            key={t}
                            onClick={() => setType(t)}
                            className={`flex-1 py-2 rounded-full text-sm ${type === t
                                ? "bg-black text-white"
                                : "text-gray-700"
                                }`}
                        >
                            {t === "PERSONAL" ? "Personal" : "Business"}
                        </button>
                    ))}
                </div>

                {/* FORM */}
                <div className="space-y-4">

                    {/* PERSONAL */}
                    {type === "PERSONAL" && (
                        <>
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
                        </>
                    )}

                    {/* BUSINESS */}
                    {type === "BUSINESS" && (
                        <>
                            <TextInput
                                label="Business name"
                                name="businessName"
                                value={form.businessName}
                                onChange={handleChange}
                            />

                            <TextInput
                                label="Business email"
                                type="email"
                                name="businessEmail"
                                value={form.businessEmail}
                                onChange={handleChange}
                            />

                            <select
                                name="country"
                                value={form.country}
                                onChange={handleChange}
                                className="
                                    w-full rounded-md border border-gray-400
                                    px-4 py-3 text-sm
                                    focus:border-black focus:outline-none
                                "
                            >
                                <option value="">Select country</option>
                                {countries.map((c) => (
                                    <option key={c.code} value={c.code}>
                                        {c.name}
                                    </option>
                                ))}
                            </select>
                        </>
                    )}

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
                    {type === "PERSONAL" && (
                        <GoogleLogin
                            onSuccess={(res) =>
                                handleGoogleLogin(res.credential)
                            }
                            onError={() => alert("Google Login Error")}
                        />
                    )}
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
