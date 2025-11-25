"use client";

export type AdminUser = {
  id: string;
  name: string;
  email: string;
  role: "admin" | "user";
  status: "active" | "suspended";
  joinDate: string;
  lastLogin?: string;
  totalSearches?: number;
  favoriteMerchants?: string[];
};

export const MOCK_ADMIN_USERS: AdminUser[] = [
  {
    id: "u1",
    name: "Alex Chan",
    email: "alex@example.com",
    role: "user",
    status: "active",
    joinDate: "2023-10-12",
    lastLogin: "2024-11-10 09:23",
    totalSearches: 186,
    favoriteMerchants: ["壽司郎", "麥當勞", "Klook"],
  },
  {
    id: "u2",
    name: "Sarah Lee",
    email: "sarah@example.com",
    role: "admin",
    status: "active",
    joinDate: "2023-09-05",
    lastLogin: "2024-11-09 22:10",
    totalSearches: 92,
    favoriteMerchants: ["PARKnSHOP", "機票"],
  },
  {
    id: "u3",
    name: "John Doe",
    email: "john@test.com",
    role: "user",
    status: "suspended",
    joinDate: "2024-01-15",
    lastLogin: "2024-10-30 14:55",
    totalSearches: 41,
    favoriteMerchants: ["淘寶", "電費"],
  },
  {
    id: "u4",
    name: "Demo User",
    email: "demo@pickcardrebate.hk",
    role: "user",
    status: "active",
    joinDate: "2024-02-20",
    lastLogin: "2024-11-08 18:42",
    totalSearches: 12,
    favoriteMerchants: ["Netflix", "PayMe"],
  },
];

export type PromoReport = {
  id: string;
  title: string;
  reporter: string;
  type: "new" | "update" | "expire";
  submittedAt: string;
  status: "pending" | "approved" | "rejected";
  message: string;
};

export const MOCK_PROMO_REPORTS: PromoReport[] = [
  {
    id: "r1",
    title: "HSBC Red 網購回贈已調整",
    reporter: "Alex Chan",
    type: "update",
    submittedAt: "2024-11-10 09:21",
    status: "pending",
    message: "HSBC 宣布由 2024/12 起網購加碼 5%，請更新。",
  },
  {
    id: "r2",
    title: "麥當勞 PayMe 週末優惠",
    reporter: "Demo User",
    type: "new",
    submittedAt: "2024-11-09 17:05",
    status: "pending",
    message: "週末滿 $80 回贈 $20 限量 5,000 名。",
  },
  {
    id: "r3",
    title: "Klook x Citi 優惠已過期",
    reporter: "Sarah Lee",
    type: "expire",
    submittedAt: "2024-11-08 12:40",
    status: "pending",
    message: "App 內顯示仍有效，實際已完結。",
  },
];

export type SystemSetting = {
  id: string;
  label: string;
  description: string;
  enabled: boolean;
};

export const DEFAULT_SYSTEM_SETTINGS: SystemSetting[] = [
  {
    id: "maintenance_mode",
    label: "系統維護模式",
    description: "啟用時前台將顯示維護公告並限制登入。",
    enabled: false,
  },
  {
    id: "promo_notifications",
    label: "推播最新優惠",
    description: "向所有登入用戶推送最新優惠通知。",
    enabled: true,
  },
  {
    id: "auto_archive",
    label: "自動封存過期優惠",
    description: "優惠到期後自動移除前台顯示。",
    enabled: true,
  },
];

export type OperationLog = {
  id: string;
  actor: string;
  action: string;
  target: string;
  timestamp: string;
};

export const MOCK_OPERATION_LOGS: OperationLog[] = [
  { id: "log1", actor: "Alex Chan", action: "新增優惠", target: "HSBC Red 新春賞", timestamp: "2024-11-10 10:12" },
  { id: "log2", actor: "Sarah Lee", action: "封鎖會員", target: "john@test.com", timestamp: "2024-11-10 09:55" },
  { id: "log3", actor: "Demo User", action: "更新信用卡", target: "SC Smart Card", timestamp: "2024-11-09 21:14" },
  { id: "log4", actor: "Alex Chan", action: "批准回報", target: "麥當勞 PayMe 週末優惠", timestamp: "2024-11-09 18:02" },
];

