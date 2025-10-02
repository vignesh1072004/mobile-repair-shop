import React from "react";

export default function BookingsList({ bookings, onClose }) {
  return (
    <div>
      <h2>My Bookings</h2>
      <div className="bookings-list" style={{ marginTop: 12 }}>
        {bookings.length === 0 ? (
          <p className="text-muted">No bookings yet.</p>
        ) : (
          bookings.map((b) => (
            <div key={b.id} className="booking-item">
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div>
                  <strong>{b.service.name}</strong>
                  <div className="text-muted small">{b.device.name}</div>
                </div>
                <div style={{ fontWeight: 700 }}>${b.estimate}</div>
              </div>
              <div style={{ marginTop: 6 }} className="text-muted small">Booked by: {b.name} ({b.phone})</div>
            </div>
          ))
        )}
      </div>

      <div style={{ marginTop: 12, display: "flex", justifyContent: "flex-end" }}>
        <button className="btn btn-secondary" onClick={onClose}>Close</button>
      </div>
    </div>
  );
}
