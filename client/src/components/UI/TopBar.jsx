import React from "react";
import { useNavigate } from "react-router-dom";
import { FiLogOut, FiUser } from "react-icons/fi";
import "../../styles/TopBar.css";

export default function TopBar() {
  const navigate = useNavigate();
  const adminUser = JSON.parse(localStorage.getItem("adminUser"));

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUser");
    navigate("/admin/login");
  };

  return (
    <div className="topbar">
      <div className="topbar-left">
        <FiUser style={{ marginRight: "0.5rem" }} />
        <strong>{adminUser?.email || "necunoscut"}</strong> 
      </div>
      <button className="topbar-logout" onClick={handleLogout}>
        <FiLogOut style={{ marginRight: "0.4rem" }} />
        Logout
      </button>
    </div>
  );
}