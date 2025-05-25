import React, { useState } from "react";
import { useNavigate } from "react-router";

const Register = () => {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    // Buat objek user
    const newUser = { fullname, email, password };

    // Simpan ke localStorage (overwrite user lama)
    localStorage.setItem("user", JSON.stringify(newUser));

    alert("Registrasi berhasil! Silakan login.");
    navigate("/login");
  };

  return (
    <main className="flex items-center justify-center min-h-screen bg-gradient-to-r from-sky-300 to-sky-600">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-sky-700 mb-6">Register Akun</h1>
        <form onSubmit={handleRegister} className="flex flex-col gap-4">
          <input
            type="text"
            name="fullname"
            placeholder="Nama Lengkap"
            className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-sky-500"
            required
            onChange={(e) => setFullname(e.target.value)}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-sky-500"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-sky-500"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="bg-sky-600 hover:bg-sky-700 text-white font-semibold py-3 rounded-lg transition duration-300"
          >
            Daftar
          </button>
        </form>
        <p className="text-center text-sm text-gray-500 mt-4">
          Sudah punya akun?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-sky-700 cursor-pointer hover:underline"
          >
            Login di sini
          </span>
        </p>
      </div>
    </main>
  );
};

export default Register;
//angel
