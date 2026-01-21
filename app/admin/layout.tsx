"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import {
  LayoutDashboard,
  Users,
  CreditCard,
  Tag,
  BarChart3,
  MessageSquare,
  MessageCircle,
  Settings,
  LogOut,
  Shield,
  History,
  Store,
  BookOpen,
  GitCommit,
  Calculator,
  Scale,
  Gift,
  Eye,
  Wrench,
  FileText,
  Bell,
  Receipt,
  Clock,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { AdminAuthProvider, useAdminAuth } from "@/components/admin/admin-auth-context";

const menuItems = [
  { name: "總覽儀表板", href: "/admin", icon: LayoutDashboard },
  { name: "系統說明書", href: "/admin/guide", icon: BookOpen }, 
  { name: "更新日誌", href: "/admin/changelog", icon: GitCommit },
  { name: "會員管理", href: "/admin/users", icon: Users },
  { name: "消費記錄", href: "/admin/transactions", icon: Receipt },
  { name: "推送通知", href: "/admin/notifications", icon: Bell },
  { name: "優惠到期提醒", href: "/admin/offer-reminders", icon: Clock },
  { name: "信用卡庫", href: "/admin/cards", icon: CreditCard },
  { name: "條款管理", href: "/admin/card-terms", icon: FileText },
  { name: "合作夥伴迎新", href: "/admin/partner-offers", icon: Gift },
  { name: "商戶資料", href: "/admin/merchants", icon: Store },
  { name: "探索內容", href: "/admin/discover", icon: Eye },
  { name: "搜尋分析", href: "/admin/analytics", icon: BarChart3 },
  { name: "App Analytics", href: "/admin/app-analytics", icon: Receipt },
  { name: "計算機記錄", href: "/admin/search-logs", icon: Calculator },
  { name: "比較功能統計", href: "/admin/compare-stats", icon: Scale },
  { name: "回報審核", href: "/admin/moderation", icon: MessageSquare },
  { name: "信用卡評論", href: "/admin/comments", icon: MessageCircle },
  { name: "操作日誌", href: "/admin/logs", icon: History },
  { name: "API 工具", href: "/admin/api-tools", icon: Wrench },
  { name: "系統設定", href: "/admin/settings", icon: Settings },
];

function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { admin, logout } = useAdminAuth();
  const isLoginPage = pathname === "/admin/login";

  useEffect(() => {
    if (!admin && !isLoginPage) {
      router.replace("/admin/login");
    }
    if (admin && isLoginPage) {
      router.replace("/admin");
    }
  }, [admin, isLoginPage, router]);

  if (!admin && !isLoginPage) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 text-gray-500">
        驗證中...
      </div>
    );
  }

  if (isLoginPage) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex">
      <aside className="w-64 bg-white dark:bg-gray-800 border-r dark:border-gray-700 hidden md:flex flex-col fixed inset-y-0">
        <div className="h-16 flex items-center px-6 border-b dark:border-gray-700">
          <div className="flex items-center gap-2 font-bold text-xl text-blue-600 dark:text-blue-400">
            <Shield className="h-6 w-6" />
            <span>Jetso Admin</span>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {menuItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <div
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                  pathname === item.href
                    ? "bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400"
                    : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700"
                )}
              >
                <item.icon className="h-5 w-5" />
                {item.name}
              </div>
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t dark:border-gray-700">
          <div className="px-4 py-2 text-xs text-gray-400 dark:text-gray-500 border-b dark:border-gray-700 mb-3">
            {admin?.email}
          </div>
          <button
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 w-full transition-colors"
            onClick={logout}
          >
            <LogOut className="h-5 w-5" />
            登出管理員
          </button>
        </div>
      </aside>

      <main className="flex-1 md:ml-64 p-8">{children}</main>
    </div>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminAuthProvider>
      <AdminShell>{children}</AdminShell>
    </AdminAuthProvider>
  );
}
