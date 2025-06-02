import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FiMail, FiLock } from "react-icons/fi";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });
      localStorage.setItem("token", res.data.token);
      navigate("/todos");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 to-blue-200 px-4">
      <div className="bg-white shadow-2xl rounded-xl p-8 w-full max-w-md animate-fade-in">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Welcome Back 👋
        </h2>

        {error && (
          <div className="bg-red-100 text-red-700 px-4 py-2 rounded mb-4 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-center border rounded-md p-2 bg-gray-50">
            <FiMail className="text-gray-500 mr-2" />
            <input
              type="email"
              placeholder="Email"
              required
              className="bg-transparent outline-none flex-1"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="flex items-center border rounded-md p-2 bg-gray-50">
            <FiLock className="text-gray-500 mr-2" />
            <input
              type="password"
              placeholder="Password"
              required
              className="bg-transparent outline-none flex-1"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded transition-all duration-200">
            Log In
          </button>
        </form>

        <p className="text-sm text-center text-gray-500 mt-4">
          Don't have an account?{" "}
          <span
            className="text-blue-600 hover:underline cursor-pointer"
            onClick={() => navigate("/")}
          >
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
}
