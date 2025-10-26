"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function UsersPage() {
  const router = useRouter();
  useEffect(() => {
    if (typeof window !== "undefined") {
      const isLoggedIn = localStorage.getItem("isAdminLoggedIn");
      if (!isLoggedIn) {
        router.replace("/login");
      }
    }
  }, [router]);
  const [users, setUsers] = useState<{ username: string; password: string }[]>([]);
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  useEffect(() => {
    let demo = [
      { username: "admin", password: "admin" },
      { username: "manager", password: "manager123" },
    ];
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("adminUsers");
      if (stored) {
        try {
          setUsers(JSON.parse(stored));
        } catch {
          setUsers(demo);
        }
      } else {
        setUsers(demo);
      }
    }
  }, []);

  const saveUsers = (newUsers: typeof users) => {
    setUsers(newUsers);
    if (typeof window !== "undefined") {
      localStorage.setItem("adminUsers", JSON.stringify(newUsers));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!form.username || !form.password) {
      setError("Username and password required");
      return;
    }
    if (users.some(u => u.username === form.username)) {
      setError("Username already exists");
      return;
    }
    const newUsers = [...users, { ...form }];
    saveUsers(newUsers);
    setForm({ username: "", password: "" });
  };

  const handleDelete = (username: string) => {
    const newUsers = users.filter(u => u.username !== username);
    saveUsers(newUsers);
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-8">
      <div className="bg-white p-8 rounded shadow-lg w-full max-w-lg flex flex-col gap-6">
        <h1 className="text-2xl font-bold text-center mb-4">User Management</h1>
        <form onSubmit={handleAdd} className="flex gap-4 mb-6">
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
            required
            className="border border-gray-300 rounded px-4 py-2 flex-1"
          />
          <input
            type="text"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            className="border border-gray-300 rounded px-4 py-2 flex-1"
          />
          <button type="submit" className="bg-teal-500 text-white font-bold px-6 py-2 rounded shadow hover:bg-teal-600 transition">Add</button>
        </form>
        {error && <p className="text-red-500 text-center font-semibold mt-2">{error}</p>}
        <div>
          <h2 className="text-lg font-semibold mb-2">Current Users</h2>
          <ul className="divide-y divide-gray-200">
            {users.map(u => (
              <li key={u.username} className="flex items-center justify-between py-2">
                <span className="font-mono text-gray-700">{u.username}</span>
                <span className="text-xs text-gray-400 ml-2">{u.password}</span>
                <button onClick={() => handleDelete(u.username)} className="ml-4 text-red-500 hover:text-red-700 text-xs font-bold">Delete</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
}