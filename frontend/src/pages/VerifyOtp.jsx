import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { verifyOtpApi } from "../services/authApi";
import { toastSuccess, toastError } from "../utils/toast";

export default function VerifyOtp() {
    const navigate = useNavigate();
    const location = useLocation();

    const email = location.state?.email;

    const [otp, setOtp] = useState("");
    const [loading, setLoading] = useState(false);

    if (!email) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-red-500">Invalid access</p>
            </div>
        );
    }

    const handleVerify = async () => {
        if (otp.length !== 6) {
            toastError("OTP must be 6 digits");
            return;
        }

        try {
            setLoading(true);

            const res = await verifyOtpApi({ email, otp });

            // ✅ CHECK STATUS THEO API
            if (res.data?.status === 200) {
                toastSuccess(res.data.message || "Verify successfully");

                // chuyển về login sau 1 chút cho user thấy toast
                setTimeout(() => {
                    navigate("/login");
                }, 1200);
            } else {
                toastError(res.data?.message || "Verify OTP failed");
            }

        } catch (err) {
            toastError(
                err.response?.data?.message || "Verify OTP failed"
            );
        } finally {
            setLoading(false);
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

                <h2 className="text-xl font-semibold text-center mb-2">
                    Verify your email
                </h2>

                <p className="text-sm text-center text-gray-600 mb-6">
                    We’ve sent a 6-digit verification code to <br />
                    <strong>{email}</strong>
                </p>

                {/* OTP INPUT */}
                <input
                    type="text"
                    maxLength={6}
                    value={otp}
                    onChange={(e) =>
                        setOtp(e.target.value.replace(/\D/g, ""))
                    }
                    placeholder="Enter OTP"
                    className="
                        w-full text-center tracking-widest text-lg
                        border border-gray-400 rounded-md
                        px-4 py-3 mb-4
                        focus:border-black focus:outline-none
                    "
                />

                {/* VERIFY BUTTON */}
                <button
                    onClick={handleVerify}
                    disabled={loading}
                    className="
                        w-full bg-black text-white py-3 rounded-full
                        disabled:opacity-50
                    "
                >
                    {loading ? "Verifying..." : "Verify"}
                </button>

            </div>
        </div>
    );
}
