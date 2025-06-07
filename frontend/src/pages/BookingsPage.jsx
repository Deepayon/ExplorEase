import React from "react";
import { CalendarCheck, Plane, Hotel, BadgeCheck, XCircle, Loader2 } from "lucide-react";
import "./BookingsPage.css";

export default function BookingsPage() {
  return (
    <div className="bookings-page">
      <h2 className="bookings-title"><CalendarCheck size={28}/> My Bookings</h2>
      <div className="booking-list">
        <div className="booking-card">
          <Plane size={28} className="booking-icon" />
          <div className="booking-details">
            <div className="booking-type">Flight</div>
            <div className="booking-detail">Kolkata → Mumbai</div>
            <div className="booking-date">12 June 2025</div>
            <div className="booking-status confirmed">
              <BadgeCheck size={16} /> Confirmed
            </div>
          </div>
          <button className="booking-action">View Ticket</button>
        </div>
        <div className="booking-card">
          <Hotel size={28} className="booking-icon" />
          <div className="booking-details">
            <div className="booking-type">Hotel</div>
            <div className="booking-detail">Taj Palace, Mumbai</div>
            <div className="booking-date">12-15 June 2025</div>
            <div className="booking-status pending">
              <Loader2 size={16} /> Pending
            </div>
          </div>
          <button className="booking-action">View Details</button>
        </div>
        <div className="booking-card">
          <Plane size={28} className="booking-icon" />
          <div className="booking-details">
            <div className="booking-type">Flight</div>
            <div className="booking-detail">Mumbai → Delhi</div>
            <div className="booking-date">16 June 2025</div>
            <div className="booking-status cancelled">
              <XCircle size={16} /> Cancelled
            </div>
          </div>
          <button className="booking-action" disabled>Cancelled</button>
        </div>
      </div>
    </div>
  );
}