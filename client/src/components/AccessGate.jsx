import React, { useEffect, useState } from "react";

const PREVIEW_PASS = import.meta.env.VITE_PREVIEW_PASS;


export default function AccessGate({ children }) {
  const [allowed, setAllowed] = useState(false);
  const [input, setInput] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
  
    if (!PREVIEW_PASS) {
      setAllowed(true);
      return;
    }

    const stored = localStorage.getItem("preview_ok");
    if (stored === "1") {
      setAllowed(true);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!PREVIEW_PASS) {
      setAllowed(true);
      return;
    }

    if (input === PREVIEW_PASS) {
      localStorage.setItem("preview_ok", "1");
      setAllowed(true);
      setError("");
    } else {
      setError("Wrong access code. Please try again.");
    }
  };

  if (allowed) return children;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="max-w-sm w-full bg-white rounded-xl shadow-2xl p-6 space-y-4 animate-fadeIn">
        <h1 className="text-xl font-semibold text-center">
          Private Preview
        </h1>
        <p className="text-sm text-gray-600 text-center">
          This website is currently under construction.  
          Enter the access code to view the preview.
        </p>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="password"
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-gray-500"
            placeholder="Access code"
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              if (error) setError("");
            }}
          />
          {error && (
            <p className="text-xs text-red-600">
              {error}
            </p>
          )}
          <button
            type="submit"
            className="w-full bg-black text-white rounded py-2 text-sm font-medium hover:bg-gray-800 transition"
          >
            Enter
          </button>
        </form>

        <p className="text-[11px] text-gray-500 text-center">
          Do not share this link or access code publicly.
        </p>
      </div>
    </div>
  );
}

