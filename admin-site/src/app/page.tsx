export default function HomePage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-indigo-100 px-4">
      <div className="bg-white/70 backdrop-blur-md rounded-3xl shadow-2xl p-12 max-w-xl w-full text-center border border-indigo-100">
        
        {/* Heading */}
        <h1 className="text-5xl font-extrabold text-indigo-700 flex items-center justify-center gap-2">
          Admin Panel <span className="animate-wave">👋</span>
        </h1>

        {/* Subtext */}
        <p className="text-gray-600 mt-4 text-lg">
          Welcome back! Manage your <span className="font-semibold text-indigo-600">dashboard</span>, 
          stay on top of <span className="font-semibold text-indigo-600">contacts</span>, 
          and keep insights flowing.
        </p>

        {/* Links */}
        <div className="flex justify-center gap-6 mt-10">
          <a
            href="/dashboard"
            className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-xl shadow-md hover:bg-indigo-700 hover:scale-105 transition transform"
          >
            📊 Dashboard
          </a>
          <a
            href="/contacts"
            className="flex items-center gap-2 border border-indigo-200 px-6 py-3 rounded-xl text-indigo-700 bg-white hover:bg-indigo-50 hover:scale-105 transition transform"
          >
            🧑‍🤝‍🧑 Contacts
          </a>
          <a
            href="/carousel"
            className="flex items-center gap-2 border border-teal-200 px-6 py-3 rounded-xl text-teal-700 bg-white hover:bg-teal-50 hover:scale-105 transition transform"
          >
            🖼️ Carousel Images
          </a>
        </div>
      </div>
    </div>
  );
}
