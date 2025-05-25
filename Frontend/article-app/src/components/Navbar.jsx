import React from "react";
import {
  Search,
  Ticket,
  User,
  LogOut,
  LogIn,
  ArrowLeftCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Navbar({ isLoggedIn = false, onLogout }) {
  const navigate = useNavigate();

  const handleHomeButton = () => navigate("/");
  const handleDashboardButton = () => navigate("/dashboard");
  const handleBack = () => navigate(-1);
  const handleLogin = () => navigate("/login");
  const handleLogout = () => {
    if (onLogout) onLogout();
  };

  return (
    <header className=" bg-blue-600 rounded-lgk shadow-md">
      <div className="max-w-screen-xl flex justify-between items-center mx-auto px-6 py-4">
        {/* Logo dan Back */}
        <div className="flex items-center space-x-4">
          <button
            onClick={handleBack}
            className="text-white hover:text-gray-400 transition"
            title="Back"
          >
            <ArrowLeftCircle className="w-6 h-6" />
          </button>
          <div
            onClick={handleHomeButton}
            className="text-3xl font-bold text-white cursor-pointer hover:text-gray-200 transition"
          >
            Bus Celebes
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex space-x-6 items-center">
          {["Dashboard", "Tentang Kami", "Hubungi Kami", "Riwayat"].map(
            (label) => (
              <button
                key={label}
                onClick={() => {
                  if (label === "Dashboard") {
                    handleDashboardButton();
                  } else if (label === "Riwayat") {
                    navigate("/riwayat");
                  } else if (label === "Rute") {
                    navigate("/rute");
                  } else if (label === "Hubungi Kami") {
                    navigate("/contact");
                  } else if (label === "Tentang Kami") {
                    navigate("/about");
                  } else {
                    alert('${label} belum tersedia');
                  }
                }}
                className="text-white text-lg font-medium hover:text-gray-300 transition"
              >
                {label}
              </button>
            )
          )}
        </nav>

        {/* Search, Account, Ticket, Login/Logout */}
        <div className="flex items-center space-x-4">
          <div className="relative w-52">
          </div>

          <div className="flex space-x-4">
            {/* Tampilkan Login atau Logout tergantung status login */}
            {isLoggedIn ? (
              <button
                className="w-8 h-8 flex items-center justify-center"
                onClick={handleLogout}
                title="Logout"
              >
                <LogOut className="text-white w-6 h-6" />
              </button>
            ) : (
              <button
                className="w-8 h-8 flex items-center justify-center"
                onClick={handleLogin}
                title="Login"
              >
                <LogIn className="text-white w-6 h-6" />
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}