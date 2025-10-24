"use client";
import React, { useState, useEffect } from "react";

import Image from "next/image";

// Data types
interface Category {
  _id: string;
  name: string;
  description?: string;
}
interface Item {
  _id: string;
  name: string;
  description: string;
  category: Category | string;
  bestseller?: boolean;
}
interface SubItem {
  _id: string;
  name: string;
  desc: string;
  image?: string;
  item: Item | string;
  category: Category | string;
}

type Tab = "categories" | "items" | "subitems";

// Subitem CRUD
// Modern SubitemAdmin with grid, modal, toasts
function SubitemAdmin({ subitems, setSubitems, items, categories }: { subitems: SubItem[], setSubitems: (s: SubItem[]) => void, items: Item[], categories: Category[] }) {
  interface SubitemForm {
    name: string;
    desc: string;
    image: string;
    item: string;
    category: string;
  }
  const emptyForm: SubitemForm = { name: "", desc: "", image: "", item: "", category: "" };
  const [form, setForm] = React.useState<SubitemForm>(emptyForm);
  const [editingId, setEditingId] = React.useState<string | null>(null);
  const [showEditModal, setShowEditModal] = React.useState(false);
  const [toast, setToast] = React.useState<{ type: "success" | "error"; message: string } | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [filterCategory, setFilterCategory] = React.useState<string>("");
  const [filterItem, setFilterItem] = React.useState<string>("");

  const fetchSubitems = async () => {
    setLoading(true);
    try {
      // const res = await fetch("http://localhost:5000/api/subitems");
      const res = await fetch("https://signage-hub.onrender.com/api/subitems");
      
      setSubitems(await res.json());
    } catch {
      showToast("error", "Failed to load subitems.");
    } finally {
      setLoading(false);
    }
  };

  const showToast = (type: "success" | "error", message: string) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    // If item is changed, auto-set category
    if (name === "item") {
      const selectedItem = items.find((it) => it._id === value);
      if (selectedItem) {
        let catId: string = "";
        if (typeof selectedItem.category === "object" && selectedItem.category !== null) {
          const catObj = selectedItem.category as Category;
          catId = catObj._id;
        } else if (typeof selectedItem.category === "string") {
          catId = selectedItem.category;
        }
        setForm({ ...form, item: value, category: catId || "" });
        return;
      }
    }
    setForm({ ...form, [name]: value });
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
      setShowEditModal(false);
      fetchSubitems();
    } catch {
      showToast("error", "Failed to save subitem.");
    }
  };

  const handleEdit = (sub: SubItem) => {
    let itemId: string = "";
    if (typeof sub.item === "object" && sub.item !== null) {
      const itemObj = sub.item as Item;
      itemId = itemObj._id;
    } else if (typeof sub.item === "string") {
      itemId = sub.item;
    }
    let categoryId: string = "";
    if (typeof sub.category === "object" && sub.category !== null) {
      const catObj = sub.category as Category;
      categoryId = catObj._id;
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
    setShowEditModal(true);
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
    <div className="p-4 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Manage Subitems</h2>

      {/* Toast */}
      {toast && (
        <div
          className={[
            "fixed top-5 right-5 px-4 py-3 rounded shadow-lg font-medium text-white z-50",
            toast.type === "success" ? "bg-green-500" : "bg-red-500"
          ].join(" ")}
        >
          {toast.message}
        </div>
      )}

      {/* Form */}
      {/* Filter by Category and Item */}
      <div className="mb-6 max-w-xl grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block mb-1 font-medium">Filter by Category:</label>
          <select
            value={filterCategory}
            onChange={e => setFilterCategory(e.target.value)}
            className="border p-2 w-full rounded focus:ring-2 focus:ring-teal-400"
          >
            <option value="">All Categories</option>
            {categories.map(cat => (
              <option key={cat._id} value={cat._id}>{cat.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block mb-1 font-medium">Filter by Item:</label>
          <select
            value={filterItem}
            onChange={e => setFilterItem(e.target.value)}
            className="border p-2 w-full rounded focus:ring-2 focus:ring-teal-400"
          >
            <option value="">All Items</option>
            {items.map(item => (
              <option key={item._id} value={item._id}>{item.name}</option>
            ))}
          </select>
        </div>
      </div>
      {/* Create Subitem Form (only show if not editing) */}
      {!showEditModal && (
        <div className="bg-white p-6 rounded-lg shadow-md max-w-xl mb-8">
          <h2 className="text-xl font-semibold mb-4">Create Subitem</h2>
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
            <select
              name="item"
              value={form.item}
              onChange={handleChange}
              className="border p-2 w-full rounded focus:ring-2 focus:ring-teal-400"
              required
            >
              <option value="">Select Item</option>
              {items.map((item) => (
                <option key={item._id} value={item._id}>{item.name}</option>
              ))}
            </select>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="border p-2 w-full rounded focus:ring-2 focus:ring-teal-400"
              required
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>{cat.name}</option>
              ))}
            </select>
            <div className="flex items-center gap-4">
              <button
                type="submit"
                className="bg-teal-500 hover:bg-teal-600 text-white px-6 py-2 rounded font-bold transition"
              >
                Create
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white p-6 rounded-lg shadow-md max-w-xl w-full">
            <h2 className="text-xl font-semibold mb-4">Edit Subitem</h2>
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
              <select
                name="item"
                value={form.item}
                onChange={handleChange}
                className="border p-2 w-full rounded focus:ring-2 focus:ring-teal-400"
                required
              >
                <option value="">Select Item</option>
                {items.map((item) => (
                  <option key={item._id} value={item._id}>{item.name}</option>
                ))}
              </select>
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className="border p-2 w-full rounded focus:ring-2 focus:ring-teal-400"
                required
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>{cat.name}</option>
                ))}
              </select>
              <div className="flex items-center gap-4">
                <button
                  type="submit"
                  className="bg-teal-500 hover:bg-teal-600 text-white px-6 py-2 rounded font-bold transition"
                >
                  Update
                </button>
                <button
                  type="button"
                  onClick={() => { setShowEditModal(false); setForm(emptyForm); setEditingId(null); }}
                  className="text-gray-500 hover:text-gray-700"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Subitems Grid */}
      {loading ? (
        <div className="text-gray-600">Loading...</div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {subitems
            .filter(sub => {
              let catId: string = "";
              if (typeof sub.category === "object" && sub.category) {
                catId = (sub.category as Category)._id;
              } else if (typeof sub.category === "string") {
                catId = sub.category;
              }
              let itemId: string = "";
              if (typeof sub.item === "object" && sub.item) {
                itemId = (sub.item as Item)._id;
              } else if (typeof sub.item === "string") {
                itemId = sub.item;
              }
              const catMatch = !filterCategory || catId === filterCategory;
              const itemMatch = !filterItem || itemId === filterItem;
              return catMatch && itemMatch;
            })
            .map((sub) => (
              <div
                key={sub._id}
                className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition transform hover:-translate-y-1"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
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
                  Item: {typeof sub.item === "object" && sub.item
                    ? (sub.item as Item).name
                    : (items.find(i => i._id === sub.item)?.name ?? sub.item)}
                </p>
                <p className="text-sm text-gray-500 mb-4">
                  Category: {typeof sub.category === "object" && sub.category ? (sub.category as Category).name : categories.find(c => c._id === sub.category)?.name || sub.category}
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(sub)}
                    className="px-3 py-1 bg-teal-500 text-white rounded hover:bg-teal-600 transition"
                    type="button"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => setConfirmDeleteId(sub._id!)}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
                    type="button"
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
                type="button"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
const AdminPage: React.FC = () => {
  const [tab, setTab] = useState<Tab>("categories");
  const [categories, setCategories] = useState<Category[]>([]);
  const [items, setItems] = useState<Item[]>([]);
  const [subitems, setSubitems] = useState<SubItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch all data
  useEffect(() => {
    async function fetchAll() {
      setLoading(true);
      const [catRes, itemRes, subRes] = await Promise.all([
  fetch("https://signage-hub.onrender.com/api/categories"),
  fetch("https://signage-hub.onrender.com/api/items"),
  fetch("https://signage-hub.onrender.com/api/subitems")
      ]);
      setCategories(await catRes.json());
      setItems(await itemRes.json());
      setSubitems(await subRes.json());
      setLoading(false);
    }
    fetchAll();
  }, []);

  // Tab UI
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-10">
      <div className="max-w-6xl mx-auto space-y-10">
        <h1 className="text-3xl font-extrabold text-gray-800">Admin Panel</h1>
        <div className="flex gap-4 mb-6">
          <button onClick={() => setTab("categories")} className={tab==="categories"?"font-bold text-teal-600 underline":""}>Categories</button>
          <button onClick={() => setTab("items")} className={tab==="items"?"font-bold text-teal-600 underline":""}>Items</button>
          <button onClick={() => setTab("subitems")} className={tab==="subitems"?"font-bold text-teal-600 underline":""}>Subitems</button>
        </div>
        {loading ? <p>Loading...</p> : (
          <>
            {tab === "categories" && <CategoryAdmin categories={categories} setCategories={setCategories} />}
            {tab === "items" && <ItemAdmin items={items} setItems={setItems} categories={categories} />}
            {tab === "subitems" && <SubitemAdmin subitems={subitems} setSubitems={setSubitems} items={items} categories={categories} />}
          </>
        )}
      </div>
    </main>
  );
};


// Category CRUD
function CategoryAdmin({ categories, setCategories }: { categories: Category[], setCategories: (c: Category[]) => void }) {
  interface CategoryForm {
    name: string;
    description: string;
  }
  const emptyForm: CategoryForm = { name: "", description: "" };
  const [form, setForm] = React.useState<CategoryForm>(emptyForm);
  const [editingId, setEditingId] = React.useState<string | null>(null);
  const [toast, setToast] = React.useState<{ type: "success" | "error"; message: string } | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const res = await fetch("https://signage-hub.onrender.com/api/categories");
      setCategories(await res.json());
    } catch {
      showToast("error", "Failed to load categories.");
    } finally {
      setLoading(false);
    }
  };

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
        ? `https://signage-hub.onrender.com/api/categories/${editingId}`
        : "https://signage-hub.onrender.com/api/categories";
      const method = editingId ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      showToast("success", `Category ${editingId ? "updated" : "created"} successfully!`);
      setForm(emptyForm);
      setEditingId(null);
      fetchCategories();
    } catch {
      showToast("error", "Failed to save category.");
    }
  };

  const handleEdit = (cat: Category) => {
    setForm({ name: cat.name, description: cat.description || "" });
    setEditingId(cat._id);
  };

  const handleDelete = async () => {
    if (!confirmDeleteId) return;
    try {
      const res = await fetch(`https://signage-hub.onrender.com/api/categories/${confirmDeleteId}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      showToast("success", "Category deleted successfully!");
      fetchCategories();
    } catch {
      showToast("error", "Failed to delete category.");
    } finally {
      setConfirmDeleteId(null);
    }
  };

  return (
    <div className="p-4 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Manage Categories</h2>
      {/* Toast */}
      {toast && (
        <div
          className={[
            "fixed top-5 right-5 px-4 py-3 rounded shadow-lg font-medium text-white z-50",
            toast.type === "success" ? "bg-green-500" : "bg-red-500"
          ].join(" ")}
        >
          {toast.message}
        </div>
      )}
      {/* Form */}
      <div className="bg-white p-6 rounded-lg shadow-md max-w-xl mb-8">
        <h2 className="text-xl font-semibold mb-4">{editingId ? "Edit Category" : "Create Category"}</h2>
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
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Description"
            className="border p-2 w-full rounded focus:ring-2 focus:ring-teal-400"
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
      {/* Categories Grid */}
      {loading ? (
        <div className="text-gray-600">Loading...</div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat) => (
            <div
              key={cat._id}
              className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition transform hover:-translate-y-1"
            >
              <h3 className="text-lg font-semibold mb-1">{cat.name}</h3>
              <p className="text-gray-600 mb-2">{cat.description}</p>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(cat)}
                  className="px-3 py-1 bg-teal-500 text-white rounded hover:bg-teal-600 transition"
                  type="button"
                >
                  Edit
                </button>
                <button
                  onClick={() => setConfirmDeleteId(cat._id)}
                  className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
                  type="button"
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
            <h3 className="text-lg font-semibold mb-4">Delete Category</h3>
            <p className="mb-4">Are you sure you want to delete this category?</p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setConfirmDeleteId(null)}
                className="px-4 py-2 border rounded hover:bg-gray-100"
                type="button"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                type="button"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Item CRUD
function ItemAdmin({ items, setItems, categories }: { items: Item[], setItems: (i: Item[]) => void, categories: Category[] }) {
  interface ItemForm {
    name: string;
    description: string;
    category: string;
    bestseller: boolean;
  }
  const emptyForm: ItemForm = { name: "", description: "", category: "", bestseller: false };
  const [form, setForm] = React.useState<ItemForm>(emptyForm);
  const [editingId, setEditingId] = React.useState<string | null>(null);
  const [toast, setToast] = React.useState<{ type: "success" | "error"; message: string } | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const res = await fetch("https://signage-hub.onrender.com/api/items");
      setItems(await res.json());
    } catch {
      showToast("error", "Failed to load items.");
    } finally {
      setLoading(false);
    }
  };

  const showToast = (type: "success" | "error", message: string) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
  let fieldValue: string | boolean = value;
    if (type === "checkbox") {
      fieldValue = (e.target as HTMLInputElement).checked;
    }
    setForm({ ...form, [name]: fieldValue });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = editingId
        ? `https://signage-hub.onrender.com/api/items/${editingId}`
        : "https://signage-hub.onrender.com/api/items";
      const method = editingId ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      showToast("success", `Item ${editingId ? "updated" : "created"} successfully!`);
      setForm(emptyForm);
      setEditingId(null);
      fetchItems();
    } catch {
      showToast("error", "Failed to save item.");
    }
  };

  const handleEdit = (item: Item) => {
    let categoryId: string = "";
    if (typeof item.category === "object" && item.category !== null) {
      const catObj = item.category as Category;
      categoryId = catObj._id;
    } else if (typeof item.category === "string") {
      categoryId = item.category;
    }
    setForm({
      name: item.name,
      description: item.description,
      category: categoryId,
      bestseller: !!item.bestseller,
    });
    setEditingId(item._id);
  };

  const handleDelete = async () => {
    if (!confirmDeleteId) return;
    try {
      const res = await fetch(`https://signage-hub.onrender.com/api/items/${confirmDeleteId}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      showToast("success", "Item deleted successfully!");
      fetchItems();
    } catch {
      showToast("error", "Failed to delete item.");
    } finally {
      setConfirmDeleteId(null);
    }
  };

  return (
    <div className="p-4 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Manage Items</h2>
      {/* Toast */}
      {toast && (
        <div
          className={[
            "fixed top-5 right-5 px-4 py-3 rounded shadow-lg font-medium text-white z-50",
            toast.type === "success" ? "bg-green-500" : "bg-red-500"
          ].join(" ")}
        >
          {toast.message}
        </div>
      )}
      {/* Form */}
      <div className="bg-white p-6 rounded-lg shadow-md max-w-xl mb-8">
        <h2 className="text-xl font-semibold mb-4">{editingId ? "Edit Item" : "Create Item"}</h2>
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
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Description"
            className="border p-2 w-full rounded focus:ring-2 focus:ring-teal-400"
            required
          />
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="border p-2 w-full rounded focus:ring-2 focus:ring-teal-400"
            required
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>{cat.name}</option>
            ))}
          </select>
          <label className="ml-2">
            <input type="checkbox" name="bestseller" checked={form.bestseller} onChange={handleChange} className="mr-1" /> Bestseller
          </label>
          <div className="flex items-center gap-4 mt-2">
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
      {/* Items Grid */}
      {loading ? (
        <div className="text-gray-600">Loading...</div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <div
              key={item._id}
              className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition transform hover:-translate-y-1"
            >
              <h3 className="text-lg font-semibold mb-1">{item.name}</h3>
              <p className="text-gray-600 mb-2">{item.description}</p>
              <p className="text-sm text-gray-500 mb-1">
                Category: {typeof item.category === "object" && item.category ? (item.category as Category).name : categories.find(c => c._id === item.category)?.name || item.category}
              </p>
              <p className="text-sm text-gray-500 mb-2">
                Bestseller: {item.bestseller ? "Yes" : "No"}
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(item)}
                  className="px-3 py-1 bg-teal-500 text-white rounded hover:bg-teal-600 transition"
                  type="button"
                >
                  Edit
                </button>
                <button
                  onClick={() => setConfirmDeleteId(item._id)}
                  className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
                  type="button"
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
            <h3 className="text-lg font-semibold mb-4">Delete Item</h3>
            <p className="mb-4">Are you sure you want to delete this item?</p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setConfirmDeleteId(null)}
                className="px-4 py-2 border rounded hover:bg-gray-100"
                type="button"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                type="button"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminPage;
