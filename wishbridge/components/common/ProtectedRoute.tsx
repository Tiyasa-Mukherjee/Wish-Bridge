"use client";
import React from "react";
import { useAuth } from "@/context/AuthContext";
import { usePathname, useRouter } from "next/navigation";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  React.useEffect(() => {
    if (!loading && !user && pathname !== "/login") {
      router.replace("/login");
    }
  }, [user, loading, pathname, router]);

  if (loading || (!user && pathname !== "/login")) {
    return (
      <div className="flex items-center justify-center min-h-screen text-orange-500 text-xl font-bold">Loading...</div>
    );
  }

  return <>{children}</>;
}
