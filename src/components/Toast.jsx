import React, { useEffect } from "react";

function Toast({ message, type = "success", onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000); // Auto-dismiss after 3s
    return () => clearTimeout(timer);
  }, [onClose]);

  const baseStyle =
    "fixed top-6 right-6 z-50 w-full max-w-sm px-4 py-3 rounded-md shadow-md transition-transform animate-slide-in";

  const typeStyles = {
    success: "bg-green-100 text-green-800 border border-green-300",
    error: "bg-red-100 text-red-800 border border-red-300",
    warning: "bg-yellow-100 text-yellow-800 border border-yellow-300",
    info: "bg-blue-100 text-blue-800 border border-blue-300",
  };

  return (
    <div className={`${baseStyle} ${typeStyles[type] || typeStyles.success}`}>
      <p className="text-sm font-medium">{message}</p>
    </div>
  );
}

export default Toast;
