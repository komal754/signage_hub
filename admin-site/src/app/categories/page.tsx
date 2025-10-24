"use client";
import { useState, useEffect } from "react";
import { PlusCircle, Trash2 } from "lucide-react";

export default function CategoriesPage() {
  const [categories, setCategories] = useState<{ _id: string, name: string }[]>([]);
  const [newCategory, setNewCategory] = useState("");
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCategories() {
      setLoading(true);
      try {
  const res = await fetch("https://signage-hub.onrender.com/api/categories");
        const data = await res.json();
        setCategories(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchCategories();
  }, []);

  async function handleAdd() {
    if (!newCategory.trim()) return;
    setAdding(true);
    try {
  const res = await fetch("https://signage-hub.onrender.com/api/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newCategory.trim() }),
      });
      if (!res.ok) throw new Error("Failed to add category");
      const added = await res.json();
      setCategories([...categories, added]);
      setNewCategory("");
    } catch (err) {
      alert("Error adding category");
    } finally {
      setAdding(false);
    }
  }

  async function handleDelete(id: string) {
    if (!id) return;
    if (!confirm("Are you sure you want to delete this category?")) return;
    setDeleting(id);
    try {
  const res = await fetch("https://signage-hub.onrender.com/api/categories", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (!res.ok) throw new Error("Failed to delete category");
      setCategories(categories.filter((cat) => cat._id !== id));
    } catch (err) {
      alert("Error deleting category");
    } finally {
      setDeleting(null);
    }
  }

  return (
  <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8 admin-responsive">
      <div className="max-w-3xl mx-auto space-y-8">
        {/* Title */}
        <h1 className="text-3xl font-extrabold text-gray-800">📂 Manage Categories</h1>

        {/* Add Category */}
        <div className="flex gap-4">
          <input
            type="text"
            value={newCategory}
            onChange={e => setNewCategory(e.target.value)}
            placeholder="Enter a new category"
            className="flex-1 border rounded-lg px-4 py-2 shadow-sm focus:ring-2 focus:ring-teal-400 outline-none"
          />
          <button
            onClick={handleAdd}
            disabled={adding}
            className="flex items-center gap-2 bg-teal-500 text-white font-bold px-5 py-2 rounded-lg shadow hover:bg-teal-600 transition"
          >
            <PlusCircle size={18} /> {adding ? "Adding..." : "Add"}
          </button>
        </div>

        {/* Categories List */}
        {loading ? (
          <p className="text-gray-500">Loading categories...</p>
        ) : categories.length === 0 ? (
          <p className="text-gray-600 italic">No categories found.</p>
        ) : (
          <ul className="space-y-3">
            {categories.map((cat) => (
              <li
                key={cat._id}
                className="bg-white flex justify-between items-center px-5 py-3 rounded-lg shadow hover:shadow-md transition"
              >
                <span className="font-medium text-gray-700">{cat.name}</span>
                <button
                  onClick={() => handleDelete(cat._id)}
                  disabled={deleting === cat._id}
                  className="text-red-500 hover:text-red-600 transition flex items-center gap-1"
                >
                  <Trash2 size={18} /> {deleting === cat._id ? "Deleting..." : "Delete"}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
