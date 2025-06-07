import React from "react";
import { Settings, Bell, Lock, Globe, CreditCard, HelpCircle, ChevronRight } from "lucide-react";
import "./SettingsPage.css";

export default function SettingsPage() {
  return (
    <div className="settings-page">
      <h2 className="settings-title"><Settings size={28}/> Settings</h2>
      <div className="settings-list">
        <div className="settings-item">
          <Bell size={20} />
          <span>Notifications</span>
          <ChevronRight size={18} className="settings-arrow" />
        </div>
        <div className="settings-item">
          <Lock size={20} />
          <span>Privacy & Security</span>
          <ChevronRight size={18} className="settings-arrow" />
        </div>
        <div className="settings-item">
          <Globe size={20} />
          <span>Language & Region</span>
          <ChevronRight size={18} className="settings-arrow" />
        </div>
        <div className="settings-item">
          <CreditCard size={20} />
          <span>Payment Methods</span>
          <ChevronRight size={18} className="settings-arrow" />
        </div>
        <div className="settings-item">
          <HelpCircle size={20} />
          <span>Help & Support</span>
          <ChevronRight size={18} className="settings-arrow" />
        </div>
      </div>
    </div>
  );
}