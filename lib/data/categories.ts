import { Category } from "../types";

export const CATEGORIES: Category[] = [
  // 常用類別
  { id: "supermarket", name: "超市", icon: "ShoppingCart", accentColor: "text-emerald-600", bgColor: "bg-emerald-50" },
  { id: "dining", name: "餐飲", icon: "Utensils", accentColor: "text-orange-500", bgColor: "bg-orange-50" },
  { id: "travel", name: "旅遊/外幣", icon: "Plane", accentColor: "text-sky-500", bgColor: "bg-sky-50" },
  { id: "online", name: "網購/串流", icon: "Globe", accentColor: "text-purple-500", bgColor: "bg-purple-50" },
  { id: "transport", name: "交通", icon: "Bus", accentColor: "text-rose-500", bgColor: "bg-rose-50" },
  { id: "entertainment", name: "娛樂/影音", icon: "Tv", accentColor: "text-pink-500", bgColor: "bg-pink-50" },
  
  // 繳費類別
  { id: "government", name: "政府繳費", icon: "Building2", accentColor: "text-gray-600", bgColor: "bg-gray-100" },
  { id: "tax", name: "交稅", icon: "FileText", accentColor: "text-amber-600", bgColor: "bg-amber-50" },
  { id: "insurance", name: "保險", icon: "ShieldCheck", accentColor: "text-blue-600", bgColor: "bg-blue-50" },
  { id: "utilities", name: "水電煤", icon: "Zap", accentColor: "text-yellow-500", bgColor: "bg-yellow-50" },
  
  // 支付方式
  { id: "ewallet", name: "電子錢包", icon: "Wallet", accentColor: "text-teal-600", bgColor: "bg-teal-50" },
  
  // 購物類別
  { id: "electronics", name: "電器/數碼", icon: "Smartphone", accentColor: "text-indigo-600", bgColor: "bg-indigo-50" },
  { id: "beauty", name: "美容/護理", icon: "Sparkles", accentColor: "text-fuchsia-500", bgColor: "bg-fuchsia-50" },
  { id: "personal_care", name: "藥妝護理", icon: "HeartPulse", accentColor: "text-rose-600", bgColor: "bg-rose-50" },
  { id: "department_store", name: "百貨公司", icon: "Building", accentColor: "text-blue-700", bgColor: "bg-blue-50" },
  { id: "convenience", name: "便利店", icon: "Store", accentColor: "text-lime-600", bgColor: "bg-lime-50" },
  
  // 新增類別 (根據 T&C)
  { id: "home", name: "家居", icon: "Home", accentColor: "text-amber-600", bgColor: "bg-amber-50" },
  { id: "lifestyle", name: "生活品味", icon: "Heart", accentColor: "text-pink-600", bgColor: "bg-pink-50" },
  { id: "petrol", name: "油站", icon: "Fuel", accentColor: "text-orange-600", bgColor: "bg-orange-50" },
  { id: "sports_apparel", name: "運動服飾", icon: "Shirt", accentColor: "text-cyan-600", bgColor: "bg-cyan-50" },
  { id: "telecom", name: "電訊", icon: "Phone", accentColor: "text-violet-600", bgColor: "bg-violet-50" },
  { id: "tunnel_fee", name: "隧道費", icon: "Car", accentColor: "text-slate-600", bgColor: "bg-slate-50" },
  { id: "parking", name: "停車場", icon: "ParkingCircle", accentColor: "text-blue-600", bgColor: "bg-blue-50" },
  { id: "ev_charging", name: "電動車充電", icon: "BatteryCharging", accentColor: "text-green-600", bgColor: "bg-green-50" },
  
  // 中銀狂賞派 7大類別 (2026)
  { id: "pet", name: "寵物", icon: "Dog", accentColor: "text-amber-500", bgColor: "bg-amber-50" },
  { id: "medical", name: "醫療", icon: "Stethoscope", accentColor: "text-red-600", bgColor: "bg-red-50" },
  { id: "jewelry_fashion", name: "珠寶服飾", icon: "Gem", accentColor: "text-purple-600", bgColor: "bg-purple-50" },
  { id: "hotel_flight", name: "機票酒店", icon: "Plane", accentColor: "text-sky-600", bgColor: "bg-sky-50" },
  
  { id: "other", name: "其他", icon: "MoreHorizontal", accentColor: "text-gray-500", bgColor: "bg-gray-50" },
  
  // 一般消費
  { id: "general", name: "一般消費", icon: "CreditCard", accentColor: "text-gray-600", bgColor: "bg-gray-100" },
];

