"use client";

import React, { createContext, useCallback, useContext, useEffect, useState } from "react";

type AdminUser = {
  email: string;
  name: string;
};

type AdminAuthContextValue = {
  admin: AdminUser | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
};

const AdminAuthContext = createContext<AdminAuthContextValue | undefined>(undefined);

const STORAGE_KEY = "pickcardrebate-admin-auth";

// Admin credentials should be managed via Supabase Auth
// This fallback is only used if Supabase is not available
const getAdminCredentials = () => ({
  email: process.env.NEXT_PUBLIC_ADMIN_EMAIL || "",
  password: process.env.ADMIN_PASSWORD || "",
  name: "PickCardRebate Admin",
});

export function AdminAuthProvider({ children }: { children: React.ReactNode }) {
  const [admin, setAdmin] = useState<AdminUser | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      setAdmin(JSON.parse(stored));
    }
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    // Use Supabase Auth for login
    try {
      const { createClient } = await import("@/lib/supabase/client");
      const supabase = createClient();
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error || !data.user) {
        console.error("Login error:", error);
        return false;
      }

      const user = { email: data.user.email || email, name: "PickCardRebate Admin" };
      setAdmin(user);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
      return true;
    } catch (err) {
      console.error("Login error:", err);
      return false;
    }
  }, []);

  const logout = useCallback(() => {
    setAdmin(null);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  return (
    <AdminAuthContext.Provider value={{ admin, login, logout }}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const ctx = useContext(AdminAuthContext);
  if (!ctx) {
    throw new Error("useAdminAuth must be used within AdminAuthProvider");
  }
  return ctx;
}

