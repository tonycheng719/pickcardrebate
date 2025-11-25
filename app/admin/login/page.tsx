"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAdminAuth } from "@/components/admin/admin-auth-context";

export default function AdminLoginPage() {
  const router = useRouter();
  const { login } = useAdminAuth();
  const [email, setEmail] = useState("admin@pickcardrebate.hk");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const success = await login(email, password);
    setLoading(false);
    if (!success) {
      setError("帳號或密碼錯誤");
      return;
    }
    router.replace("/admin");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 p-8 space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">PickCardRebate Admin</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm">請輸入管理員帳號登入後台</p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="text-xs font-medium text-gray-500 dark:text-gray-400">Email</label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 dark:bg-gray-700 dark:border-gray-600"
              required
            />
          </div>
          <div>
            <label className="text-xs font-medium text-gray-500 dark:text-gray-400">Password</label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 dark:bg-gray-700 dark:border-gray-600"
              required
            />
          </div>
          {error && <p className="text-sm text-red-500">{error}</p>}
          <Button type="submit" className="w-full h-11" disabled={loading}>
            {loading ? "登入中..." : "登入後台"}
          </Button>
          <p className="text-xs text-gray-400 text-center">預設帳號：admin@pickcardrebate.hk / 密碼：123456</p>
        </form>
      </div>
    </div>
  );
}

