import React, { useState } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import ForgotPasswordForm from "./ForgotPasswordForm";

// Props: view, setView, message, setMessage, onClose
export default function AuthContainer({
  view = "login",
  setView,
  message = "",
  setMessage,
  onClose,
}) {
  const [loading, setLoading] = useState(false);

  const handleSuccess = (msg) => {
    setLoading(true);
    setMessage(msg);
    setTimeout(() => {
      setLoading(false);
      setMessage("");
      window.location.reload();
    }, 1000); // Show loader for 1s, then reload
  };

  return (
    <div className="flex flex-col items-center w-full">
      <div className="space-y-4 w-full flex flex-col items-center">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-8">
            <div className="w-12 h-12 border-4 border-blue-400 border-t-transparent rounded-full animate-spin mb-4"></div>
            <div className="text-blue-600 font-semibold">Logging in...</div>
          </div>
        ) : (
          <>
            {message && (
              <div className="bg-green-100 text-green-700 px-4 py-2 rounded-lg shadow-md">
                {message}
              </div>
            )}

            {view === "login" && (
              <LoginForm onSuccess={handleSuccess} onSwitch={setView} />
            )}
            {view === "register" && (
              <RegisterForm onSuccess={handleSuccess} onSwitch={setView} />
            )}
            {view === "forgot" && (
              <ForgotPasswordForm
                onSuccess={handleSuccess}
                onSwitch={setView}
              />
            )}
          </>
        )}
      </div>
      {!loading && (
        <button
          className="mt-4 text-gray-500 hover:text-gray-800 underline"
          onClick={onClose}
        >
          Close
        </button>
      )}
    </div>
  );
}
