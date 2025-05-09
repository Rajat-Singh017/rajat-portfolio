"use client";

import { AuthProvider } from "@/app/context/AuthContext";
import AdminSidebar from "@/app/components/admin/AdminSidebar";
import { usePathname } from "next/navigation";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/admin/login";

  return (
    <AuthProvider>
      <div className="min-h-screen flex flex-col md:flex-row bg-white">
        {!isLoginPage && <AdminSidebar />}
        <main className={`flex-1 ${!isLoginPage ? "p-6 bg-white" : ""}`}>
          {children}
        </main>
      </div>
    </AuthProvider>
  );
} 