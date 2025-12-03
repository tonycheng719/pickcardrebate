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

export function AdminAuthProvider({ children }: { children: React.ReactNode }) {
  const [admin, setAdmin] = useState<AdminUser | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      setAdmin(JSON.parse(stored));
    }
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    // Try Supabase Auth first
    try {
      const { createClient } = await import("@/lib/supabase/client");
      const supabase = createClient();
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (!error && data.user) {
        const user = { email: data.user.email || email, name: "PickCardRebate Admin" };
        setAdmin(user);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
        return true;
      }
      
      // Fallback: Check hardcoded admin credentials
      // This is a backup in case Supabase user doesn't exist
      if (email === "admin@pickcardrebate.hk" && password === "solomo21522813") {
        const user = { email, name: "PickCardRebate Admin" };
        setAdmin(user);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
        return true;
      }

      console.error("Login error:", error);
      return false;
    } catch (err) {
      console.error("Login error:", err);
      
      // Fallback for network errors
      if (email === "admin@pickcardrebate.hk" && password === "solomo21522813") {
        const user = { email, name: "PickCardRebate Admin" };
        setAdmin(user);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
        return true;
      }
      
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

