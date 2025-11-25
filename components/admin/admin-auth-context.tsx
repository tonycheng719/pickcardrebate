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
const HARD_CODED_ADMIN = {
  email: "admin@pickcardrebate.hk",
  password: "123456",
  name: "PickCardRebate Admin",
};

export function AdminAuthProvider({ children }: { children: React.ReactNode }) {
  const [admin, setAdmin] = useState<AdminUser | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      setAdmin(JSON.parse(stored));
    }
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    if (email === HARD_CODED_ADMIN.email && password === HARD_CODED_ADMIN.password) {
      const user = { email, name: HARD_CODED_ADMIN.name };
      setAdmin(user);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
      return true;
    }
    return false;
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

