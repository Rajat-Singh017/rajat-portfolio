"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";
import {
  LayoutDashboard,
  FolderPlus,
  MessageSquare,
  Settings,
  LogOut,
} from "lucide-react";
import { Button } from "@/app/components/ui/button";

export default function AdminSidebar() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/admin/login");
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div className="bg-white w-64 min-h-screen p-4 hidden md:flex md:flex-col border-r border-gray-200">
        <div className="flex items-center justify-center h-full">
          <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  const handleLogout = async () => {
    try {
      await logout();
      router.push("/admin/login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const menuItems = [
    {
      href: "/admin/dashboard",
      label: "Dashboard",
      icon: <LayoutDashboard className="w-5 h-5 mr-3" />,
    },
    {
      href: "/admin/projects",
      label: "Projects",
      icon: <FolderPlus className="w-5 h-5 mr-3" />,
    },
    {
      href: "/admin/messages",
      label: "Messages",
      icon: <MessageSquare className="w-5 h-5 mr-3" />,
    },
    {
      href: "/admin/settings",
      label: "Settings",
      icon: <Settings className="w-5 h-5 mr-3" />,
    },
  ];

  return (
    <div className="bg-white w-full md:w-64 md:min-h-screen p-4 flex flex-col border-r border-gray-200">
      <div className="text-2xl font-bold mb-8 text-center py-4 border-b border-gray-200">
        Admin Panel
      </div>
      <nav className="flex-1">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
                  pathname === item.href
                    ? "bg-primary text-white"
                    : "hover:bg-gray-100 text-gray-700"
                }`}
              >
                {item.icon}
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="pt-4 border-t border-gray-200 mt-4">
        <div className="px-4 py-2 mb-4">
          <p className="text-sm text-gray-500">Logged in as:</p>
          <p className="font-medium truncate text-gray-700">{user.email}</p>
        </div>
        <Button
          variant="outline"
          className="w-full flex items-center justify-center border border-gray-200 hover:bg-gray-100 text-gray-700"
          onClick={handleLogout}
        >
          <LogOut className="w-4 h-4 mr-2" />
          Logout
        </Button>
      </div>
    </div>
  );
} 