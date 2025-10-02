import React, { useState, useEffect } from "react";
import ServiceSection from "./ServiceSection";
import DeviceCard from "./DeviceCard";
import BookingModal from "./BookingModal";
import BookingsList from "./BookingsList";
import { services, devices } from "../utils/data";
import { calculateEstimate } from "../utils/helpers";

export default function RepairShop() {
  const [selectedService, setSelectedService] = useState(null);
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [estimate, setEstimate] = useState(null);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [bookingsOpen, setBookingsOpen] = useState(false);
  const [bookings, setBookings] = useState([]);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("bookings")) || [];
    setBookings(saved);
  }, []);

  const handleServiceSelect = (service) => {
    setSelectedService(service);
    const est = calculateEstimate(service, selectedDevice || devices[0]);
    setEstimate(est);
  };

  const handleDeviceSelect = (device) => {
    setSelectedDevice(device);
    const est = calculateEstimate(selectedService || services[0], device);
    setEstimate(est);
  };

  const handleBookingConfirm = (userData) => {
    const newBooking = {
      id: Date.now(),
      service: selectedService || services[0],
      device: selectedDevice || devices[0],
      estimate,
      ...userData,
    };
    const updated = [newBooking, ...bookings];
    setBookings(updated);
    localStorage.setItem("bookings", JSON.stringify(updated));
    setBookingOpen(false);
    alert("Booking confirmed!");
  };

  const filteredServices = services.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase())
  );
  const filteredDevices = devices.filter((d) =>
    d.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      {/* Header */}
      <div className="header">
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <div className="logo">RS</div>
          <div>
            <div className="header-title">Repair Shop</div>
            <div className="text-muted">Fast • Reliable • Transparent</div>
          </div>
        </div>

        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <button className="btn btn-secondary" onClick={() => setBookingsOpen(true)}>
            My Bookings
          </button>
        </div>
      </div>

      {/* Controls */}
      <div className="controls">
        <input
          type="text"
          placeholder="Search services/devices..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="all">All</option>
          <option value="services">Services</option>
          <option value="devices">Devices</option>
        </select>
        <button className="btn btn-primary" onClick={() => { setSearch(""); setFilter("all"); }}>
          Reset
        </button>
      </div>

      {/* Services */}
      {(filter === "all" || filter === "services") && (
        <ServiceSection services={filteredServices} onSelect={handleServiceSelect} />
      )}

      {/* Devices */}
      {(filter === "all" || filter === "devices") && (
        <div style={{ marginTop: 18 }}>
          <h2 style={{ fontSize: 20, marginBottom: 8 }}>Devices</h2>
          <div className="grid">
            {filteredDevices.map((d) => (
              <div key={d.id} className="card" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <DeviceCard device={d} onSelect={handleDeviceSelect} />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Estimate box */}
      {estimate !== null && (
        <div className="estimate">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{ fontWeight: 600 }}>Estimated Cost</div>
              <div className="text-muted small">Based on selection</div>
            </div>
            <div style={{ fontSize: 18, fontWeight: 700 }}>${estimate}</div>
          </div>

          <div style={{ marginTop: 12 }}>
            <button className="btn btn-primary" onClick={() => setBookingOpen(true)}>Book Repair</button>
            <button className="btn btn-secondary" style={{ marginLeft: 8 }} onClick={() => {
              // small re-calc to vary number slightly
              const recalc = calculateEstimate(selectedService || services[0], selectedDevice || devices[0]);
              setEstimate(recalc);
            }}>
              Re-calc
            </button>
          </div>
        </div>
      )}

      {/* Booking modal */}
      {bookingOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <BookingModal onClose={() => setBookingOpen(false)} onConfirm={handleBookingConfirm} />
          </div>
        </div>
      )}

      {/* Bookings list modal */}
      {bookingsOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <BookingsList bookings={bookings} onClose={() => setBookingsOpen(false)} />
          </div>
        </div>
      )}
    </div>
  );
}
