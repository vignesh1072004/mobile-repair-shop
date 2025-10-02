import React, { useState } from "react";

export default function BookingModal({ onClose, onConfirm }) {
  const [form, setForm] = useState({ name: "", phone: "" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = () => {
    if (!form.name || !form.phone) {
      alert("Please enter name and phone.");
      return;
    }
    onConfirm(form);
  };

  return (
    <div>
      <h2>Confirm Booking</h2>
      <div style={{ marginTop: 10 }}>
        <input name="name" placeholder="Your name" value={form.name} onChange={handleChange} style={{ width: "100%", padding: 10, marginBottom: 8 }} />
        <input name="phone" placeholder="Phone number" value={form.phone} onChange={handleChange} style={{ width: "100%", padding: 10, marginBottom: 8 }} />
      </div>

      <div style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}>
        <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
        <button className="btn btn-primary" onClick={submit}>Confirm</button>
      </div>
    </div>
  );
}
