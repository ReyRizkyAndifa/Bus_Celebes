import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = (e) => {
    e.preventDefault();

    const storedUserJSON = localStorage.getItem("user");
    if (!storedUserJSON) {
      alert("Belum ada akun, silakan daftar dulu.");
      return;
    }

    const storedUser = JSON.parse(storedUserJSON);

    if (email === storedUser.email && password === storedUser.password) {
      login(storedUser);
      navigate("/dashboard");
    } else {
      alert("Email atau password salah.");
    }
  };

  return (
    <main className="flex items-center justify-center min-h-screen bg-gradient-to-r from-sky-300 to-sky-600">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-sky-700 mb-6">Login Akun</h1>
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-sky-500"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-sky-500"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="bg-sky-600 hover:bg-sky-700 text-white font-semibold py-3 rounded-lg transition duration-300"
          >
            Login
          </button>
        </form>
        <p className="text-center text-sm text-gray-500 mt-4">
          Belum punya akun?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-sky-700 cursor-pointer hover:underline"
          >
            Daftar di sini
          </span>
        </p>
      </div>
    </main>
  );
};

export default Login;
//
