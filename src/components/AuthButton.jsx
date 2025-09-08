function AuthButton({ mobile = false, onLogin, onRegister }) {
  return (
    <div className={`flex ${mobile ? "flex-col gap-3" : "gap-4"}`}>
      <button
        className="px-4 py-2 border rounded-lg hover:bg-gray-100 cursor-pointer"
        onClick={onLogin}
      >
        Login
      </button>
      <button
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer"
        onClick={onRegister}
      >
        Sign Up
      </button>
    </div>
  );
}
export default AuthButton;
