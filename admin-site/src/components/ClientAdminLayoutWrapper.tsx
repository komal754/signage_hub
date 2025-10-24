"use client";
import dynamic from "next/dynamic";
import React from "react";

const AdminLayout = dynamic(() => import("./AdminLayout"), { ssr: false });

export default function ClientAdminLayoutWrapper({ children }: { children: React.ReactNode }) {
  return <AdminLayout>{children}</AdminLayout>;
}
