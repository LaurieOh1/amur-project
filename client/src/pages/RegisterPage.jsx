import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import Modal from "../components/Modal";

const passwordRules = [
  { key: "len", test: (v) => v.length >= 8, label: "At least 8 characters" },
  { key: "lower", test: (v) => /[a-z]/.test(v), label: "One lowercase letter" },
  { key: "upper", test: (v) => /[A-Z]/.test(v), label: "One uppercase letter" },
  { key: "num", test: (v) => /\d/.test(v), label: "One number" },
  {
    key: "sym",
    test: (v) => /[^A-Za-z0-9]/.test(v),
    label: "One special character",
  },
];

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [globalMsg, setGlobalMsg] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showEmailUsed, setShowEmailUsed] = useState(false); 
  const navigate = useNavigate();

  const onChange = (e) => {
    setFormData((p) => ({ ...p, [e.target.name]: e.target.value }));
    if (errors[e.target.name])
      setErrors((p) => ({ ...p, [e.target.name]: "" }));
    if (globalMsg) setGlobalMsg("");
  };

  const pwdChecks = passwordRules.map((r) => ({
    key: r.key,
    label: r.label,
    ok: r.test(formData.password || ""),
  }));

  const validate = () => {
    const next = {};
    if (!formData.name.trim()) next.name = "Name is required";
    if (!formData.email.trim()) next.email = "Email is required";
    if (!formData.password) next.password = "Password is required";
    const failed = passwordRules.filter((r) => !r.test(formData.password));
    if (formData.password && failed.length)
      next.password = "Password does not meet requirements";
    if (!formData.confirmPassword)
      next.confirmPassword = "Please confirm your password";
    else if (formData.password !== formData.confirmPassword)
      next.confirmPassword = "Passwords do not match";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const inputClass = (field) =>
    `w-full px-4 py-2 pr-10 border rounded focus:outline-none ${
      errors[field] ? "border-red-500" : "border-gray-300 focus:border-gray-500"
    }`;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setGlobalMsg("");
    if (!validate()) return;

    try {
      await axios.post("/api/users/register", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });
      navigate("/login");
    } catch (err) {
      console.error("Register error:", err.response || err);

      if (err.response) {
      
        const msg =
          err.response.data?.message ||
          `Request failed with status ${err.response.status}`;
        setGlobalMsg(msg);
      } else {
        
        setGlobalMsg("Cannot reach the server. Is the backend running?");
      }
    }
  };

  return (
    <>
      <div className="max-w-md mx-auto mt-12 bg-white p-8 shadow rounded">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Create an Account
        </h2>
        {globalMsg && (
          <div className="mb-4 text-sm text-center text-red-600">
            {globalMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={onChange}
              className={inputClass("name")}
              placeholder="Your name"
            />
            {errors.name && (
              <p className="text-red-600 text-sm mt-1">{errors.name}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={onChange}
              className={inputClass("email")}
              placeholder="you@example.com"
            />
            {errors.email && (
              <p className="text-red-600 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          <div className="relative">
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={onChange}
              className={inputClass("password")}
              placeholder="Create a strong password"
            />
            <FontAwesomeIcon
              icon={showPassword ? faEyeSlash : faEye}
              className="absolute right-3 top-10 cursor-pointer text-gray-500"
              onClick={() => setShowPassword((s) => !s)}
            />
            {errors.password && (
              <p className="text-red-600 text-sm mt-1">{errors.password}</p>
            )}

            <ul className="mt-2 text-xs space-y-1">
              {pwdChecks.map((c) => (
                <li
                  key={c.key}
                  className={c.ok ? "text-green-600" : "text-gray-500"}
                >
                  {c.ok ? "✓" : "•"} {c.label}
                </li>
              ))}
            </ul>
          </div>

          <div className="relative">
            <label className="block text-sm font-medium mb-1">
              Confirm Password
            </label>
            <input
              type={showConfirm ? "text" : "password"}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={onChange}
              className={inputClass("confirmPassword")}
              placeholder="Re-enter your password"
            />
            <FontAwesomeIcon
              icon={showConfirm ? faEyeSlash : faEye}
              className="absolute right-3 top-10 cursor-pointer text-gray-500"
              onClick={() => setShowConfirm((s) => !s)}
            />
            {errors.confirmPassword && (
              <p className="text-red-600 text-sm mt-1">
                {errors.confirmPassword}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition"
          >
            Register
          </button>
        </form>

        <p className="mt-6 text-sm text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 underline ml-1">
            Sign In
          </Link>
        </p>
      </div>

      <Modal
        open={showEmailUsed}
        onClose={() => setShowEmailUsed(false)}
        title="Email already in use"
      >
        This email address is already registered. Please sign in or use another
        email.
      </Modal>
    </>
  );
};

export default RegisterPage;
