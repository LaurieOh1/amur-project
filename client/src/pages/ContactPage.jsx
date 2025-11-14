import React, { useState } from "react";
import axios from "axios";

const initialForm = { name: "", email: "", subject: "", message: "", hp: "" };

const ContactPage = () => {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ loading: false, ok: false, msg: "" });

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    if (errors[name]) setErrors((err) => ({ ...err, [name]: "" }));
    if (status.msg) setStatus({ loading: false, ok: false, msg: "" });
  };

  const validate = () => {
    const err = {};
    if (!form.name.trim()) err.name = "Please enter your name.";
    if (!form.email.trim()) {
      err.email = "Please enter your email.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      err.email = "Please enter a valid email.";
    }
    if (!form.message.trim()) err.message = "Please enter a message.";
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    if (form.hp) return;

    try {
      setStatus({ loading: true, ok: false, msg: "" });

      await axios.post("/api/contact", {
        name: form.name.trim(),
        email: form.email.trim(),
        subject: form.subject.trim(),
        message: form.message.trim(),
      });

      setStatus({
        loading: false,
        ok: true,
        msg: "Thanks! We’ll get back to you shortly.",
      });
      setForm(initialForm);
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        "Sorry, something went wrong. Please try again.";
      setStatus({ loading: false, ok: false, msg });
    }
  };

  const inputClass = (field) =>
    `w-full px-4 py-2 rounded border text-sm focus:outline-none ${
      errors[field]
        ? "border-red-500 focus:border-red-500"
        : "border-gray-300 focus:border-gray-500"
    }`;

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-3xl md:text-4xl font-bold mb-2">Contact Us</h1>
      <p className="text-gray-600 mb-8">
        Questions, feedback, or wholesale inquiries? Send us a message and we’ll
        reply ASAP.
      </p>

      
      {status.msg && (
        <div
          className={`mb-6 rounded px-4 py-3 text-sm ${
            status.ok ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
          }`}
        >
          {status.msg}
        </div>
      )}

      <form
        onSubmit={onSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
       
        <input
          type="text"
          name="hp"
          value={form.hp}
          onChange={onChange}
          className="hidden"
          autoComplete="off"
          tabIndex="-1"
        />

        <div className="col-span-1">
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            name="name"
            type="text"
            value={form.name}
            onChange={onChange}
            className={inputClass("name")}
            placeholder="Your name"
          />
          {errors.name && (
            <p className="text-xs text-red-600 mt-1">{errors.name}</p>
          )}
        </div>

        <div className="col-span-1">
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={onChange}
            className={inputClass("email")}
            placeholder="you@example.com"
          />
          {errors.email && (
            <p className="text-xs text-red-600 mt-1">{errors.email}</p>
          )}
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-1">
            Subject (optional)
          </label>
          <input
            name="subject"
            type="text"
            value={form.subject}
            onChange={onChange}
            className={inputClass("subject")}
            placeholder="How can we help?"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-1">Message</label>
          <textarea
            name="message"
            value={form.message}
            onChange={onChange}
            className={`${inputClass("message")} min-h-[140px]`}
            placeholder="Write your message..."
          />
          {errors.message && (
            <p className="text-xs text-red-600 mt-1">{errors.message}</p>
          )}
        </div>

        <div className="md:col-span-2 flex items-center gap-3">
          <button
            type="submit"
            disabled={status.loading}
            className="px-6 py-2 rounded bg-black text-white hover:bg-gray-800 transition disabled:opacity-60"
          >
            {status.loading ? "Sending..." : "Send Message"}
          </button>
          <span className="text-xs text-gray-500">
            We typically reply within 24–48 hours.
          </span>
        </div>
      </form>
    </div>
  );
};

export default ContactPage;
