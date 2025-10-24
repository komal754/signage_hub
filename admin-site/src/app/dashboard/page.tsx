import Link from "next/link";
import { Layers, Package } from "lucide-react"; // icons

export default function AdminDashboard() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-10 admin-responsive">
      {/* Header */}
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-extrabold text-gray-800">⚙️ Admin Dashboard</h1>
        <p className="text-gray-600 mt-2">
          Welcome back! Quickly manage your categories and items.
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {/* <Link href="/categories" className="block">
          <div className="bg-white rounded-2xl shadow-md p-8 border border-gray-100 hover:shadow-xl hover:scale-105 hover:border-teal-400 transition transform cursor-pointer">
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-teal-100 text-teal-600 p-3 rounded-xl">
                <Layers size={28} />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Manage Categories</h2>
            </div>
            <p className="text-gray-600">
              Add, edit, or delete service categories to organize your platform.
            </p>
          </div>
        </Link> */}

        <Link href="/items" className="block">
          <div className="bg-white rounded-2xl shadow-md p-8 border border-gray-100 hover:shadow-xl hover:scale-105 hover:border-indigo-400 transition transform cursor-pointer">
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-indigo-100 text-indigo-600 p-3 rounded-xl">
                <Package size={28} />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Manage Items</h2>
            </div>
            <p className="text-gray-600">
              Add, edit, or delete services and individual items with ease.
            </p>
          </div>
        </Link>
      </div>
    </main>
  );
}
