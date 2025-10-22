"use client";
import { useEffect, useState } from "react";
import { Mail, Phone, User } from "lucide-react";

interface Contact {
  _id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  date: string;
}

export default function ContactsPage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/contact")
      .then(res => res.json())
      .then(data => {
        setContacts(data);
        setLoading(false);
      });
  }, []);

  const filteredContacts = contacts.filter(c =>
    (c.name && c.name.toLowerCase().includes(search.toLowerCase())) ||
    (c.email && c.email.toLowerCase().includes(search.toLowerCase())) ||
    (c.phone && c.phone.includes(search))
  );

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString(undefined, {
      weekday: "short",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      {/* Header */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-3xl font-extrabold text-gray-800">📩 Contact Submissions</h1>
        <input
          type="text"
          placeholder="🔍 Search by name, email, phone..."
          className="px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-teal-400 outline-none"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      {/* Content */}
      {loading ? (
        <p className="text-gray-500 animate-pulse">Loading contacts...</p>
      ) : filteredContacts.length === 0 ? (
        <p className="text-gray-600 italic">No contact submissions found.</p>
      ) : (
        <ul className="space-y-4">
          {filteredContacts.map(contact => (
            <li
              key={contact._id}
              className="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg hover:scale-[1.01] transition transform"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                {/* Contact Info */}
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <User className="text-teal-500" size={18} />
                    <span className="font-semibold text-gray-800">{contact.name}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600 text-sm">
                    <Mail className="text-indigo-500" size={16} />
                    <span>{contact.email}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600 text-sm mt-1">
                    <Phone className="text-amber-500" size={16} />
                    <span>{contact.phone}</span>
                  </div>
                  <p className="text-gray-700 text-sm mt-3 italic">“{contact.message}”</p>
                </div>

                {/* Date */}
                <span className="text-gray-400 text-xs whitespace-nowrap">
                  {formatDate(contact.date)}
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
