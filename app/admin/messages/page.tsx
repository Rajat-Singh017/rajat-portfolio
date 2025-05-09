"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Trash2, Mail, Search } from "lucide-react";
import ProtectedRoute from "@/app/components/admin/ProtectedRoute";
import { Button } from "@/app/components/ui/button";

type Message = {
  id: string;
  name: string;
  email: string;
  subject?: string;
  message: string;
  createdAt: any;
};

export default function MessagesPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        // Import Firebase on client side only
        const { collection, getDocs, query, orderBy } = await import("firebase/firestore");
        const { db } = await import("@/app/firebase");
        
        const messagesQuery = query(
          collection(db, "messages"),
          orderBy("createdAt", "desc")
        );
        
        const snapshot = await getDocs(messagesQuery);
        const messagesData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt?.toDate() || new Date(),
        })) as Message[];
        
        setMessages(messagesData);
      } catch (error) {
        console.error("Error fetching messages:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchMessages();
  }, []);

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this message?")) {
      try {
        const { doc, deleteDoc } = await import("firebase/firestore");
        const { db } = await import("@/app/firebase");
        
        await deleteDoc(doc(db, "messages", id));
        setMessages(messages.filter((message) => message.id !== id));
        
        if (selectedMessage?.id === id) {
          setSelectedMessage(null);
        }
      } catch (error) {
        console.error("Error deleting message:", error);
      }
    }
  };

  const filteredMessages = messages.filter((message) =>
    message.name.toLowerCase().includes(search.toLowerCase()) ||
    message.email.toLowerCase().includes(search.toLowerCase()) ||
    message.subject?.toLowerCase().includes(search.toLowerCase()) ||
    message.message.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <ProtectedRoute>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
          <h1 className="text-3xl font-bold text-gray-800">Messages</h1>
          
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
            <input
              type="text"
              placeholder="Search messages..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full md:w-64 pl-10 pr-4 py-2 rounded-lg border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-primary/50 text-gray-800"
            />
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 gap-4 h-64">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="border border-gray-200 rounded-lg p-4 animate-pulse bg-white"
              >
                <div className="h-5 bg-gray-100 rounded w-1/4 mb-2"></div>
                <div className="h-4 bg-gray-100 rounded w-1/3 mb-4"></div>
                <div className="h-3 bg-gray-100 rounded w-full mb-2"></div>
                <div className="h-3 bg-gray-100 rounded w-3/4"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 space-y-4 h-[700px] overflow-auto pr-2">
              {filteredMessages.length === 0 ? (
                <div className="text-center py-8 border border-gray-200 rounded-lg bg-white">
                  <Mail className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                  <p className="text-gray-500">No messages found</p>
                </div>
              ) : (
                filteredMessages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`border rounded-lg p-4 cursor-pointer transition-colors bg-white ${
                      selectedMessage?.id === message.id
                        ? "bg-primary/5 border-primary"
                        : "border-gray-200 hover:bg-gray-50"
                    }`}
                    onClick={() => setSelectedMessage(message)}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold truncate text-gray-800">{message.name}</h3>
                      <span className="text-xs text-gray-500">
                        {new Date(message.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 mb-1 truncate">
                      {message.email}
                    </p>
                    <p className="text-sm truncate text-gray-700">
                      {message.subject || "No subject"}
                    </p>
                  </motion.div>
                ))
              )}
            </div>

            <div className="lg:col-span-2 border border-gray-200 rounded-lg h-[700px] flex flex-col bg-white">
              {selectedMessage ? (
                <>
                  <div className="border-b border-gray-200 p-4 flex justify-between items-center">
                    <div>
                      <h2 className="font-semibold text-lg text-gray-800">
                        {selectedMessage.subject || "No subject"}
                      </h2>
                      <p className="text-sm text-gray-500">
                        From: {selectedMessage.name} ({selectedMessage.email})
                      </p>
                      <p className="text-xs text-gray-500">
                        Received: {new Date(selectedMessage.createdAt).toLocaleString()}
                      </p>
                    </div>
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => handleDelete(selectedMessage.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="p-6 flex-1 overflow-auto text-gray-700">
                    <p className="whitespace-pre-wrap">{selectedMessage.message}</p>
                  </div>
                  <div className="border-t border-gray-200 p-4">
                    <a
                      href={`mailto:${selectedMessage.email}`}
                      className="flex items-center justify-center w-full bg-primary text-white rounded-lg py-2 hover:opacity-90 transition-opacity"
                    >
                      <Mail className="h-4 w-4 mr-2" />
                      Reply via Email
                    </a>
                  </div>
                </>
              ) : (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center p-6">
                    <Mail className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium mb-2 text-gray-800">No message selected</h3>
                    <p className="text-gray-500 max-w-md">
                      Select a message from the list to view its contents
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
} 