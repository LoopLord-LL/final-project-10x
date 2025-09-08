import { useState } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import ForgotPasswordForm from "./ForgotPasswordForm";

export default function AuthContainer() {
  const [view, setView] = useState("login");
  const [message, setMessage] = useState("");

  const handleSuccess = (msg) => {
    setMessage(msg);
    setTimeout(() => setMessage(""), 3000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 p-6">
      <div className="space-y-4 w-full flex flex-col items-center">
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
          <ForgotPasswordForm onSuccess={handleSuccess} onSwitch={setView} />
        )}
      </div>
    </div>
  );
}
