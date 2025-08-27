import React from 'react'

function ResetPassword() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
            <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
                <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">Reset Password</h1>

                <form className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-600">Email</label>
                        <input
                            type="email"
                            name="email"
                            required
                            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* <div>
                        <label className="block text-sm font-medium text-gray-600">Password</label>
                        <input
                            type="password"
                            name="password"
                            required
                            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div> */}

                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition"
                    >
                        Submit
                    </button>
                </form>

                
            </div>
        </div>
    )
}

export default ResetPassword