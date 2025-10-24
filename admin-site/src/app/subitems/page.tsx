"use client";
import React, { useEffect, useState } from "react";

import Image from "next/image";

interface SubItem {
  _id?: string;
  name: string;
  desc: string;
  image?: string;
  item: string;
  category: string;
}

const emptyForm: Omit<SubItem, "_id"> = {
  name: "",
  desc: "",
  image: "",
  item: "",
  category: "",
};

export default function SubitemsPage() {
  const [subitems, setSubitems] = useState<SubItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState<Omit<SubItem, "_id">>(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [toast, setToast] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  const fetchSubitems = React.useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("https://signage-hub.onrender.com/api/subitems");
      const data = await res.json();
      setSubitems(data);
    } catch {
      showToast("error", "Failed to load subitems.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSubitems();
  }, [fetchSubitems]);

  const showToast = (type: "success" | "error", message: string) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = editingId
        ? `https://signage-hub.onrender.com/api/subitems/${editingId}`
        : "https://signage-hub.onrender.com/api/subitems";
      const method = editingId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();

      showToast("success", `Subitem ${editingId ? "updated" : "created"} successfully!`);
      setForm(emptyForm);
      setEditingId(null);
      fetchSubitems();
    } catch {
      showToast("error", "Failed to save subitem.");
    }
  };

  const handleEdit = (sub: SubItem) => {
    let itemId: string = "";
    if (typeof sub.item === "object" && sub.item !== null) {
      itemId = (sub.item as { _id: string })._id;
    } else if (typeof sub.item === "string") {
      itemId = sub.item;
    }
    let categoryId: string = "";
    if (typeof sub.category === "object" && sub.category !== null) {
      categoryId = (sub.category as { _id: string })._id;
    } else if (typeof sub.category === "string") {
      categoryId = sub.category;
    }
    setForm({
      name: sub.name,
      desc: sub.desc,
      image: sub.image || "",
      item: itemId,
      category: categoryId,
    });
    setEditingId(sub._id!);
  };

  const handleDelete = async () => {
    if (!confirmDeleteId) return;
    try {
      const res = await fetch(`https://signage-hub.onrender.com/api/subitems/${confirmDeleteId}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      showToast("success", "Subitem deleted successfully!");
      fetchSubitems();
    } catch {
      showToast("error", "Failed to delete subitem.");
    } finally {
      setConfirmDeleteId(null);
    }
  };

  return (
  <main className="p-8 bg-gray-50 min-h-screen admin-responsive">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Manage Subitems</h1>

      {/* Toast */}
      {toast && (
        <div
          className={`fixed top-5 right-5 px-4 py-3 rounded shadow-lg font-medium text-white z-50 ${
            toast.type === "success" ? "bg-green-500" : "bg-red-500"
          }`}
        >
          {toast.message}
        </div>
      )}

      {/* Form */}
      <div className="bg-white p-6 rounded-lg shadow-md max-w-xl mb-8">
        <h2 className="text-xl font-semibold mb-4">{editingId ? "Edit Subitem" : "Create Subitem"}</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Name"
            className="border p-2 w-full rounded focus:ring-2 focus:ring-teal-400"
            required
          />
          <input
            name="desc"
            value={form.desc}
            onChange={handleChange}
            placeholder="Description"
            className="border p-2 w-full rounded focus:ring-2 focus:ring-teal-400"
            required
          />
          <input
            name="image"
            value={form.image}
            onChange={handleChange}
            placeholder="Image URL"
            className="border p-2 w-full rounded focus:ring-2 focus:ring-teal-400"
          />
          <input
            name="item"
            value={form.item}
            onChange={handleChange}
            placeholder="Item ID"
            className="border p-2 w-full rounded focus:ring-2 focus:ring-teal-400"
            required
          />
          <input
            name="category"
            value={form.category}
            onChange={handleChange}
            placeholder="Category ID"
            className="border p-2 w-full rounded focus:ring-2 focus:ring-teal-400"
            required
          />

          <div className="flex items-center gap-4">
            <button
              type="submit"
              className="bg-teal-500 hover:bg-teal-600 text-white px-6 py-2 rounded font-bold transition"
            >
              {editingId ? "Update" : "Create"}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={() => { setForm(emptyForm); setEditingId(null); }}
                className="text-gray-500 hover:text-gray-700"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Subitems Grid */}
      {loading ? (
        <div className="text-gray-600">Loading...</div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {subitems.map((sub) => (
            <div
              key={sub._id}
              className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition transform hover:-translate-y-1"
            >
              <Image
                src={sub.image || "/placeholder.png"}
                alt={sub.name}
                width={400}
                height={192}
                className="w-full h-48 object-contain mb-4 rounded"
                unoptimized
              />
              <h3 className="text-lg font-semibold mb-1">{sub.name}</h3>
              <p className="text-gray-600 mb-2">{sub.desc}</p>
              <p className="text-sm text-gray-500">
                Item: {typeof sub.item === "object" && sub.item !== null ? (sub.item as { name?: string }).name ?? "" : sub.item}
              </p>
              <p className="text-sm text-gray-500 mb-4">
                Category: {typeof sub.category === "object" && sub.category !== null ? (sub.category as { name?: string }).name ?? "" : sub.category}
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(sub)}
                  className="px-3 py-1 bg-teal-500 text-white rounded hover:bg-teal-600 transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => setConfirmDeleteId(sub._id!)}
                  className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete Modal */}
      {confirmDeleteId && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white p-6 rounded-lg shadow-md max-w-sm w-full">
            <h3 className="text-lg font-semibold mb-4">Delete Subitem</h3>
            <p className="mb-4">Are you sure you want to delete this subitem?</p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setConfirmDeleteId(null)}
                className="px-4 py-2 border rounded hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
