import Link from "next/link";

export default function AdminSidebar() {
  return (
    <aside className="h-screen w-64 bg-gray-900 text-white flex flex-col py-8 px-4 fixed left-0 top-0 shadow-lg">
      <div className="mb-10 text-center">
        <h2 className="text-2xl font-bold">Admin Panel</h2>
        <span className="text-sm text-gray-400">Signage & Printing Workshop</span>
      </div>
      <nav className="flex flex-col gap-4">
        <Link href="/" className="hover:bg-gray-800 rounded px-4 py-2">Dashboard</Link>
        <Link href="/items" className="hover:bg-gray-800 rounded px-4 py-2">Items</Link>
        <Link href="/contacts" className="hover:bg-gray-800 rounded px-4 py-2">Contacts</Link>
      </nav>
      <div className="mt-auto text-center text-xs text-gray-500">
        &copy; 2025 Narendra Add Agency
      </div>
    </aside>
  );
}
