"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  LayoutGrid,
  MessageSquare,
  Users,
  Layers,
} from "lucide-react";
import ProtectedRoute from "@/app/components/admin/ProtectedRoute";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    projects: 0,
    messages: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Import Firebase on client side only
        const { collection, getDocs } = await import("firebase/firestore");
        const { db } = await import("@/app/firebase");

        // Fetch projects count
        const projectsSnapshot = await getDocs(collection(db, "projects"));
        const projectsCount = projectsSnapshot.size;

        // Fetch messages count
        const messagesSnapshot = await getDocs(collection(db, "messages"));
        const messagesCount = messagesSnapshot.size;

        setStats({
          projects: projectsCount,
          messages: messagesCount,
        });
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const statCards = [
    {
      title: "Total Projects",
      value: stats.projects,
      icon: <Layers className="h-8 w-8 text-blue-500" />,
      color: "bg-blue-50 dark:bg-blue-900/20",
      textColor: "text-blue-700 dark:text-blue-400",
    },
    {
      title: "Messages",
      value: stats.messages,
      icon: <MessageSquare className="h-8 w-8 text-green-500" />,
      color: "bg-green-50 dark:bg-green-900/20",
      textColor: "text-green-700 dark:text-green-400",
    },
    {
      title: "Admin Users",
      value: 1,
      icon: <Users className="h-8 w-8 text-purple-500" />,
      color: "bg-purple-50 dark:bg-purple-900/20",
      textColor: "text-purple-700 dark:text-purple-400",
    },
    {
      title: "Last Updated",
      value: new Date().toLocaleDateString(),
      icon: <LayoutGrid className="h-8 w-8 text-orange-500" />,
      color: "bg-orange-50 dark:bg-orange-900/20",
      textColor: "text-orange-700 dark:text-orange-400",
      isDate: true,
    },
  ];

  return (
    <ProtectedRoute>
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <div className="text-sm text-muted-foreground">
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 h-40">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="rounded-lg border border-border bg-card p-6 animate-pulse"
              >
                <div className="h-8 w-24 bg-muted rounded mb-4"></div>
                <div className="h-8 w-12 bg-muted rounded"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {statCards.map((card, i) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.1 }}
                className={`rounded-lg border border-border bg-card p-6 ${card.color}`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      {card.title}
                    </p>
                    <h3
                      className={`text-2xl font-bold mt-2 ${
                        card.isDate ? "text-lg" : ""
                      } ${card.textColor}`}
                    >
                      {card.value}
                    </h3>
                  </div>
                  <div
                    className={`p-3 rounded-full ${card.color} bg-opacity-50`}
                  >
                    {card.icon}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.4 }}
            className="rounded-lg border border-border bg-card p-6"
          >
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <div className="grid grid-cols-2 gap-4">
              <a
                href="/admin/projects/new"
                className="flex items-center p-4 rounded-lg hover:bg-muted-foreground/10 transition-colors"
              >
                <div className="mr-4 p-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                  <Layers className="h-5 w-5" />
                </div>
                <span>New Project</span>
              </a>
              <a
                href="/admin/messages"
                className="flex items-center p-4 rounded-lg hover:bg-muted-foreground/10 transition-colors"
              >
                <div className="mr-4 p-2 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400">
                  <MessageSquare className="h-5 w-5" />
                </div>
                <span>View Messages</span>
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.5 }}
            className="rounded-lg border border-border bg-card p-6"
          >
            <h3 className="text-xl font-bold mb-4">Admin Info</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Email:</span>
                <span className="font-medium">rajat10rks@gmail.com</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Role:</span>
                <span className="font-medium">Administrator</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">
                  Last Login:
                </span>
                <span className="font-medium">
                  {new Date().toLocaleString()}
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </ProtectedRoute>
  );
} 