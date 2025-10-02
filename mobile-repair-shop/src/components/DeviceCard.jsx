import React from "react";

export default function DeviceCard({ device, onSelect }) {
  return (
    <div onClick={() => onSelect(device)} style={{ cursor: "pointer" }}>
      <h3 style={{ fontSize: 16, marginBottom: 6 }}>{device.name}</h3>
      <p className="text-muted">Multiplier: x{device.multiplier}</p>
    </div>
  );
}
