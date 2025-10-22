"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
  import { useEffect } from "react";

export default function CarouselAdmin() {
  const API_BASE = "http://localhost:5000/api/carousel";
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");
  const [images, setImages] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch images from backend (MongoDB)
  const fetchImages = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(API_BASE);
      const data = await res.json();
      setImages(data);
    } catch (e) {
      setError("Failed to fetch images");
    }
    setLoading(false);
  };

  // Add new carousel image
  const handleAdd = async () => {
    if (!url.trim()) {
      setError("Image URL is required");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const res = await fetch(API_BASE, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url, title })
      });
      if (!res.ok) throw new Error("Failed to add image");
      setUrl("");
      setTitle("");
      fetchImages();
    } catch (e) {
      setError("Failed to add image");
    }
    setLoading(false);
  };

  // Edit image
  const [editId, setEditId] = useState<string | null>(null);
  const [editUrl, setEditUrl] = useState("");
  const [editTitle, setEditTitle] = useState("");

  const handleEdit = (img: any) => {
    setEditId(img._id);
    setEditUrl(img.url);
    setEditTitle(img.title || "");
    setError("");
  };

  const handleUpdate = async () => {
    if (!editUrl.trim()) {
      setError("Image URL is required");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${API_BASE}/${editId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: editUrl, title: editTitle })
      });
      if (!res.ok) throw new Error("Failed to update image");
      setEditId(null);
      setEditUrl("");
      setEditTitle("");
      fetchImages();
    } catch (e) {
      setError("Failed to update image");
    }
    setLoading(false);
  };

  // Delete image
  const handleDelete = async (id: string) => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${API_BASE}/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete image");
      fetchImages();
    } catch (e) {
      setError("Failed to delete image");
    }
    setLoading(false);
  };

  // Initial fetch
  useEffect(() => { fetchImages(); }, []);

  return (
    <div className="max-w-2xl mx-auto py-10">
      <h2 className="text-2xl font-bold mb-6">Carousel Images Admin</h2>
      <div className="mb-6 flex flex-col gap-4">
        {editId ? (
          <>
            <input
              type="text"
              placeholder="Cloudinary Image URL"
              value={editUrl}
              onChange={e => setEditUrl(e.target.value)}
              className="border px-4 py-2 rounded w-full"
            />
            <input
              type="text"
              placeholder="Title (optional)"
              value={editTitle}
              onChange={e => setEditTitle(e.target.value)}
              className="border px-4 py-2 rounded w-full"
            />
            <Button onClick={handleUpdate} disabled={loading} className="w-full bg-teal-500 text-white">
              {loading ? "Updating..." : "Update Image"}
            </Button>
            <Button onClick={() => setEditId(null)} className="w-full bg-gray-400 text-white mt-2">Cancel</Button>
          </>
        ) : (
          <>
            <input
              type="text"
              placeholder="Cloudinary Image URL"
              value={url}
              onChange={e => setUrl(e.target.value)}
              className="border px-4 py-2 rounded w-full"
            />
            <input
              type="text"
              placeholder="Title (optional)"
              value={title}
              onChange={e => setTitle(e.target.value)}
              className="border px-4 py-2 rounded w-full"
            />
            <Button onClick={handleAdd} disabled={loading} className="w-full bg-teal-500 text-white">
              {loading ? "Adding..." : "Add Image"}
            </Button>
          </>
        )}
        {error && <div className="text-red-500 mt-2">{error}</div>}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Array.isArray(images) ? (
          images.map(img => (
            <div key={img._id} className="border rounded-lg p-4 flex flex-col items-center">
              <img src={img.url} alt={img.title || "Carousel Image"} className="w-full h-40 object-cover rounded mb-2" />
              <div className="font-semibold text-gray-700 mb-2">{img.title || <span className="italic text-gray-400">No title</span>}</div>
              <Button onClick={() => handleEdit(img)} className="bg-blue-500 text-white w-full mb-2">Edit</Button>
              <Button onClick={() => handleDelete(img._id)} className="bg-red-500 text-white w-full">Delete</Button>
            </div>
          ))
        ) : (
          <div className="text-red-500">
            {images?.error ? `Error: ${images.error}` : "Failed to load images"}
          </div>
        )}
      </div>
    </div>
  );
}












