import React from "react";
import { User, Mail, Phone, Calendar, MapPin, Edit2, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./ProfilePage.css";

export default function ProfilePage() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('username');
    navigate('/login');
  };

  return (
    <div className="profile-page">
      <div className="profile-card">
        <div className="profile-avatar">
          <User size={56} />
        </div>
        <h2 className="profile-name">Deepayan Das</h2>
        <div className="profile-info">
          <span><Mail size={18} /> deepayandas@example.com</span>
          <span><Phone size={18} /> +91 9876543210</span>
          <span><Calendar size={18} /> Member since: Jan 2023</span>
          <span><MapPin size={18} /> Kolkata, India</span>
        </div>
        <div className="profile-actions">
          <button className="profile-edit-btn">
            <Edit2 size={18} /> Edit Profile
          </button>
          <button className="profile-logout-btn" onClick={handleLogout}>
            <LogOut size={18} /> Logout
          </button>
        </div>
      </div>
    </div>
  );
}