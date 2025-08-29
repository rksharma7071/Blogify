import axios from 'axios';
import React, { useState } from 'react'

function ResetPassword() {
    const [step, setStep] = useState(1);
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    // Step 1: Request OTP
    const requestOtp = async () => {
        try {
            const res = await axios.post("/api/auth/request-otp", { email });
            setMessage(res.data.message);
            setStep(2);
        } catch (err) {
            setMessage(err.response?.data?.message || "Error sending OTP");
        }
    };

    // Step 2: Verify OTP
    const verifyOtp = async () => {
        try {
            const res = await axios.post("/api/auth/verify-otp", { email, otp });
            setMessage(res.data.message);
            setStep(3);
        } catch (err) {
            setMessage(err.response?.data?.message || "Invalid OTP");
        }
    };

    // Step 3: Reset Password
    const resetPassword = async () => {
        try {
            const res = await axios.post("/api/auth/reset-password", { email, password });
            setMessage(res.data.message);
            setStep(1);
        } catch (err) {
            setMessage(err.response?.data?.message || "Error resetting password");
        }
    };


    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
            <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
                <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Forgot Password</h2>
                {message && <p className="mb-2 text-blue-600">{message}</p>}
                <div className="space-y-4">


                    {step === 1 && (
                        <>
                            <div>

                                <label className="block text-sm font-medium text-gray-600">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    required
                                    className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <button
                                onClick={requestOtp}
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition"
                            >
                                Send OTP
                            </button>
                        </>
                    )}

                    {step === 2 && (
                        <>
                            <div>

                                <label className="block text-sm font-medium text-gray-600">Enter OTP</label>
                                <input
                                    type="text"
                                    name="otp"
                                    required
                                    className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                />
                            </div>
                            <button
                                onClick={verifyOtp}
                                className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-md transition"
                            >
                                Verify OTP
                            </button>
                        </>
                    )}

                    {step === 3 && (
                        <>
                            <div>

                                <label className="block text-sm font-medium text-gray-600">New Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    required
                                    className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <button
                                onClick={resetPassword}
                                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-md transition"
                            >
                                Reset Password
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}

export default ResetPassword
