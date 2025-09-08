function ForgotPasswordForm({ onSuccess, onSwitch }) {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      onSuccess("Password reset link sent to your email!");
    }
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Reset Password
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
        />
        <button
          type="submit"
          className="w-full bg-yellow-500 text-white py-2 rounded-lg hover:bg-yellow-600 transition"
        >
          Send Reset Link
        </button>
      </form>
      <div className="mt-4 text-sm text-center">
        <button
          onClick={() => onSwitch("login")}
          className="text-blue-500 hover:underline"
        >
          Back to login
        </button>
      </div>
    </div>
  );
}
export default ForgotPasswordForm;