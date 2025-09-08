import { useState } from "react";
function LoginForm({ onSuccess, onSwitch }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      onSuccess("Login successful!");
    }
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Login
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Login
        </button>
      </form>
      <div className="mt-4 text-sm text-center space-y-2">
        <button
          onClick={() => onSwitch("register")}
          className="text-blue-500 hover:underline"
        >
          Create an account
        </button>
        <br />
        <button
          onClick={() => onSwitch("forgot")}
          className="text-blue-500 hover:underline"
        >
          Forgot password?
        </button>
      </div>
    </div>
  );
}
export default LoginForm;