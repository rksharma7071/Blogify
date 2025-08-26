import React from "react";

function ConfirmModel({ title, subtitle, subtitle1, type, onClose, onConfirm }) {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50">
            <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md transform transition-all">
                {/* Header */}
                <h2 className="text-xl font-semibold text-gray-800 mb-2">{title}</h2>

                {/* Body */}
                <p className="text-gray-600 mb-1">{subtitle}</p>
                <p className="text-gray-500 text-sm">{subtitle1}</p>

                {/* Footer / Buttons */}

                <div className="mt-6 flex justify-center gap-3">
                    <button
                        onClick={onClose}
                        className="hidden px-4 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100 transition"
                    >
                        Cancel
                    </button>
                    {type == "error" ?
                        <button
                            onClick={onConfirm}
                            className="px-4 py-2 rounded-lg bg-red-600 text-white font-medium hover:bg-red-700 transition"
                        >
                            Delete
                        </button>
                        :
                        <button
                            onClick={onConfirm}
                            className="px-4 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
                        >
                            OK
                        </button>
                    }
                </div>
            </div>
        </div>
    );
}

export default ConfirmModel;
