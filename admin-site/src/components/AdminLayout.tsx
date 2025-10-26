import * as React from "react";
import AdminSidebar from "./AdminSidebar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col md:flex-row">
      <AdminSidebar />
      <div className="admin-main flex-1 min-h-screen bg-gray-50 md:ml-64">
        {children}
      </div>
    </div>
  );
}
