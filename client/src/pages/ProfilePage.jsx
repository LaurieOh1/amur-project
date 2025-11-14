// src/pages/ProfilePage.jsx
import React, { useEffect, useState } from "react";
import { api } from "../api";
import { useAuth } from "../Context/AuthContext";

export default function ProfilePage() {
  const { user, logout } = useAuth();
  const [form, setForm] = useState({
    name: "",
    email: "",
    deliveryAddress: { line1: "", line2: "", city: "", postalCode: "", country: "" },
    billingDifferent: false,
    billingAddress: { line1: "", line2: "", city: "", postalCode: "", country: "" },
  });
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    (async () => {
      const { data } = await api.get("/api/users/me");
      setForm((p) => ({
        ...p,
        name: data.name || "",
        email: data.email || "",
        deliveryAddress: data.deliveryAddress || p.deliveryAddress,
        billingDifferent: !!data.billingDifferent,
        billingAddress: data.billingAddress || p.billingAddress,
      }));
    })();
  }, []);

  const onChange = (e) => {
    const { name, value, dataset, type, checked } = e.target;
    if (dataset.scope === "delivery") {
      setForm((p) => ({ ...p, deliveryAddress: { ...p.deliveryAddress, [name]: value } }));
    } else if (dataset.scope === "billing") {
      setForm((p) => ({ ...p, billingAddress: { ...p.billingAddress, [name]: value } }));
    } else if (name === "billingDifferent") {
      setForm((p) => ({ ...p, billingDifferent: type === "checkbox" ? checked : value }));
    } else {
      setForm((p) => ({ ...p, [name]: value }));
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMsg("");
    try {
      await api.put("/api/users/me", form);
      setMsg("Profile updated successfully.");
    } catch (e) {
      setMsg(e.response?.data?.message || "Failed to update profile.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Your Profile</h1>
        <button onClick={logout} className="text-sm underline">Log out</button>
      </div>

      <form onSubmit={onSubmit} className="space-y-6">
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input name="name" value={form.name} onChange={onChange}
              className="w-full px-3 py-2 border rounded" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input value={form.email} readOnly className="w-full px-3 py-2 border rounded bg-gray-100" />
          </div>
        </div>

       
        <section>
          <h2 className="font-semibold mb-2">Delivery Address</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <input data-scope="delivery" name="line1" value={form.deliveryAddress.line1} onChange={onChange} className="px-3 py-2 border rounded" placeholder="Address line 1" />
            <input data-scope="delivery" name="line2" value={form.deliveryAddress.line2} onChange={onChange} className="px-3 py-2 border rounded" placeholder="Address line 2 (optional)" />
            <input data-scope="delivery" name="city" value={form.deliveryAddress.city} onChange={onChange} className="px-3 py-2 border rounded" placeholder="City" />
            <input data-scope="delivery" name="postalCode" value={form.deliveryAddress.postalCode} onChange={onChange} className="px-3 py-2 border rounded" placeholder="Postal code" />
            <input data-scope="delivery" name="country" value={form.deliveryAddress.country} onChange={onChange} className="px-3 py-2 border rounded" placeholder="Country" />
          </div>
        </section>

        
        <section>
          <label className="inline-flex items-center gap-2">
            <input type="checkbox" name="billingDifferent" checked={form.billingDifferent} onChange={onChange} />
            <span>Billing address is different</span>
          </label>

          {form.billingDifferent && (
            <div className="mt-3 grid sm:grid-cols-2 gap-4">
              <input data-scope="billing" name="line1" value={form.billingAddress.line1} onChange={onChange} className="px-3 py-2 border rounded" placeholder="Address line 1" />
              <input data-scope="billing" name="line2" value={form.billingAddress.line2} onChange={onChange} className="px-3 py-2 border rounded" placeholder="Address line 2 (optional)" />
              <input data-scope="billing" name="city" value={form.billingAddress.city} onChange={onChange} className="px-3 py-2 border rounded" placeholder="City" />
              <input data-scope="billing" name="postalCode" value={form.billingAddress.postalCode} onChange={onChange} className="px-3 py-2 border rounded" placeholder="Postal code" />
              <input data-scope="billing" name="country" value={form.billingAddress.country} onChange={onChange} className="px-3 py-2 border rounded" placeholder="Country" />
            </div>
          )}
        </section>

        <button disabled={saving} className="px-5 py-2 bg-black text-white rounded disabled:opacity-50">
          {saving ? "Saving..." : "Save changes"}
        </button>
        {msg && <p className="text-sm mt-2">{msg}</p>}
      </form>
    </div>
  );
}
