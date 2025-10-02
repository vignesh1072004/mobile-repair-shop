import React, { useState } from "react";
import { services, devices } from "../utils/data";
import { calculateEstimate } from "../utils/calculateEstimate";

export default function EstimateCalculator() {
  const [selectedService, setSelectedService] = useState(null);
  const [selectedDevice, setSelectedDevice] = useState(null);

  const estimate = calculateEstimate(selectedService, selectedDevice);

  return (
    <div className="estimate-card card">
      <h2>Get Your Repair Estimate</h2>

      {/* Service Dropdown */}
      <label>Choose Service:</label>
      <select
        value={selectedService?.id || ""}
        onChange={(e) =>
          setSelectedService(
            services.find((s) => s.id === parseInt(e.target.value))
          )
        }
      >
        <option value="">--Select Service--</option>
        {services.map((s) => (
          <option key={s.id} value={s.id}>
            {s.name} (${s.basePrice})
          </option>
        ))}
      </select>

      {/* Device Dropdown */}
      <label>Choose Device:</label>
      <select
        value={selectedDevice?.id || ""}
        onChange={(e) =>
          setSelectedDevice(
            devices.find((d) => d.id === parseInt(e.target.value))
          )
        }
      >
        <option value="">--Select Device--</option>
        {devices.map((d) => (
          <option key={d.id} value={d.id}>
            {d.name} (x{d.multiplier})
          </option>
        ))}
      </select>

      {/* Show Description */}
      {selectedService && (
        <p className="text-muted">{selectedService.description}</p>
      )}

      {/* Live Estimate */}
      <div className="estimate">
        <strong>Estimated Price: </strong>
        {estimate !== null ? `$${estimate}` : "Select service and device"}
      </div>
    </div>
  );
}
