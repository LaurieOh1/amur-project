
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { api } from "../api";
import { useAuth } from "../Context/AuthContext";

const LoginPage = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPwd, setShowPwd] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const onChange = (e) => {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const { data } = await api.post("/api/users/login", form);
      login(data);             
      navigate("/profile");     
    } catch (err) {
      const status = err.response?.status;
      const msg =
        status === 401
          ? "Invalid email or password."
          : err.response?.data?.message || "Something went wrong.";
      setError(msg);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12 bg-white p-8 shadow rounded">
      <h2 className="text-2xl font-bold mb-6 text-center">Sign In</h2>
      {error && <div className="mb-4 text-sm text-center text-red-600">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email" name="email" value={form.email} onChange={onChange}
            className="w-full px-4 py-2 border rounded focus:outline-none border-gray-300 focus:border-gray-500"
            placeholder="you@example.com" required
          />
        </div>

        <div className="relative">
          <label className="block text-sm font-medium mb-1">Password</label>
          <input
            type={showPwd ? "text" : "password"}
            name="password" value={form.password} onChange={onChange}
            className="w-full px-4 py-2 pr-10 border rounded focus:outline-none border-gray-300 focus:border-gray-500"
            placeholder="Your password" required
          />
          <FontAwesomeIcon
            icon={showPwd ? faEyeSlash : faEye}
            className="absolute right-3 top-10 cursor-pointer text-gray-500"
            onClick={() => setShowPwd((s) => !s)}
          />
        </div>

        <button type="submit" className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition">
          Sign In
        </button>
      </form>

      <div className="mt-3 text-right">
        <Link to="/forgot-password" className="text-sm text-blue-600 underline">
          Forgot your password or username?
        </Link>
      </div>

      <p className="mt-6 text-sm text-center">
        Don’t have an account?
        <Link to="/register" className="text-blue-600 underline ml-1">Create one</Link>
      </p>
    </div>
  );
};

export default LoginPage;
