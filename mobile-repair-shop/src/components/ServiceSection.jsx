import React from "react";

export default function ServiceSection({ services, onSelect }) {
  return (
    <div style={{ marginTop: 8 }}>
      <h2 style={{ fontSize: 20, marginBottom: 8 }}>Services</h2>
      <div className="grid">
        {services.map((service) => (
          <div key={service.id} className="card" onClick={() => onSelect(service)} style={{ cursor: "pointer" }}>
            <h3>{service.name}</h3>
            <p className="text-muted">Base Price: ${service.basePrice}</p>
            <p style={{ marginTop: 8, color: "#475569", fontSize: 13 }}>{service.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
