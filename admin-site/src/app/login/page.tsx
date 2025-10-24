"use client";
import { useState } from "react";

export default function AdminLogin() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    // TODO: Replace with real authentication API call
    if (form.username === "admin" && form.password === "password") {
      // Simulate login success
      window.location.href = "/dashboard";
    } else {
      setError("Invalid credentials");
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-lg w-full max-w-sm flex flex-col gap-6">
        <h1 className="text-2xl font-bold text-center mb-4">Admin Login</h1>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          required
          className="border border-gray-300 rounded px-4 py-2"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
          className="border border-gray-300 rounded px-4 py-2"
        />
        <button type="submit" className="bg-teal-500 text-white font-bold px-6 py-2 rounded shadow hover:bg-teal-600 transition">Login</button>
        {error && <p className="text-red-500 text-center font-semibold mt-2">{error}</p>}
      </form>
    </main>
  );
}
