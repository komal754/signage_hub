"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Package2, Users2 } from "lucide-react";

export default function AdminSidebar() {
  const pathname = usePathname();
  const links = [
    { href: "/", label: "Dashboard", icon: LayoutDashboard },
    { href: "/items", label: "Items", icon: Package2 },
    { href: "/contacts", label: "Contacts", icon: Users2 },
  ];

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex h-screen w-64 bg-gradient-to-b from-gray-900 via-gray-850 to-gray-950 text-gray-100 flex-col py-8 px-5 fixed left-0 top-0 border-r border-gray-800 shadow-xl z-40">
        {/* Logo / Header */}
        <div className="mb-10 text-center">
          <h2 className="text-2xl font-bold text-white tracking-tight">Admin Panel</h2>
          <span className="text-sm text-gray-400">
            Signage & Printing Workshop
          </span>
        </div>
        {/* Nav Links */}
        <nav className="flex flex-col gap-2 mt-4">
          {links.map(({ href, label, icon: Icon }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                  active
                    ? "bg-indigo-600 text-white shadow-md"
                    : "hover:bg-gray-800 hover:text-white text-gray-300"
                }`}
              >
                <Icon className={`w-5 h-5 ${active ? "text-white" : "text-indigo-400"}`} />
                <span className="font-medium">{label}</span>
              </Link>
            );
          })}
        </nav>
        <div className="flex-grow" />
        <div className="border-t border-gray-800 pt-6 mt-6 text-center">
          <p className="mt-4 text-xs text-gray-500">&copy; 2025 Narendra Add Agency</p>
        </div>
      </aside>

      {/* Mobile Bottom Bar */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-gray-900 border-t border-gray-800 flex md:hidden justify-around items-center py-2 px-2 shadow-xl">
        {links.map(({ href, label, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`flex flex-col items-center gap-1 px-2 py-1 rounded-xl transition-all duration-200 ${
                active
                  ? "bg-indigo-600 text-white shadow-md"
                  : "hover:bg-gray-800 hover:text-white text-gray-300"
              }`}
            >
              <Icon className={`w-6 h-6 ${active ? "text-white" : "text-indigo-400"}`} />
              <span className="text-xs font-medium">{label}</span>
            </Link>
          );
        })}
      </nav>
    </>
  );
}
