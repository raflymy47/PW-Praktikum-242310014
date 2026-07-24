"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import Sidebar from "@/components/cms/components/sidebar";
import { useAuth } from "@/contexts/AuthContext";

import "./cms.css";

export default function CMSLayout({ children }) {
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/sign-in");
    }
  }, [user, loading, router]);

  if (loading) {
    return <div className="p-5">Loading...</div>;
  }

  if (!user) {
    return null;
  }

  return (
    <div className="cms-container">
      <Sidebar />

      <main className="main-content p-4">
        {children}
      </main>
    </div>
  );
}