"use client";

import { useState, useEffect, useMemo } from "react";
import { createClient } from "@/lib/supabase/client";
import { 
  FileText, 
  RefreshCw, 
  Plus, 
  Search,
  Edit2,
  Trash2,
  Pin,
  Clock,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  ExternalLink,
  Eye
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import Link from "next/link";
import { DbPromo } from "@/lib/types/db-cards";

type FilterStatus = "all" | "active" | "expiring" | "expired" | "pinned";

export default function PromosManagementPage() {
  const [promos, setPromos] = useState<DbPromo[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<FilterStatus>("all");
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    setUser(user);
    if (user) {
      fetchPromos();
    } else {
      setLoading(false);
    }
  };

  const fetchPromos = async () => {
    setLoading(true);
    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("db_promos")
        .select("*")
        .order("sort_order", { ascending: false })
        .order("updated_at", { ascending: false });

      if (error) throw error;
      setPromos(data || []);
    } catch (error) {
      console.error("Failed to fetch promos:", error);
      toast.error("無法載入優惠文章");
    } finally {
      setLoading(false);
    }
  };

  const deletePromo = async (promoId: string, title: string) => {
    if (!confirm(`確定要刪除「${title}」嗎？`)) {
      return;
    }

    try {
      const supabase = createClient();
      const { error } = await supabase
        .from("db_promos")
        .delete()
        .eq("id", promoId);

      if (error) throw error;
      
      toast.success("已刪除");
      setPromos(prev => prev.filter(p => p.id !== promoId));
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("刪除失敗");
    }
  };

  const togglePinned = async (promo: DbPromo) => {
    try {
      const supabase = createClient();
      const { error } = await supabase
        .from("db_promos")
        .update({ is_pinned: !promo.is_pinned })
        .eq("id", promo.id);

      if (error) throw error;
      
      setPromos(prev => prev.map(p => 
        p.id === promo.id ? { ...p, is_pinned: !p.is_pinned } : p
      ));
      toast.success(promo.is_pinned ? "已取消置頂" : "已置頂");
    } catch (error) {
      console.error("Toggle error:", error);
      toast.error("更新失敗");
    }
  };

  const toggleActive = async (promo: DbPromo) => {
    try {
      const supabase = createClient();
      const { error } = await supabase
        .from("db_promos")
        .update({ is_active: !promo.is_active })
        .eq("id", promo.id);

      if (error) throw error;
      
      setPromos(prev => prev.map(p => 
        p.id === promo.id ? { ...p, is_active: !p.is_active } : p
      ));
      toast.success(promo.is_active ? "已停用" : "已啟用");
    } catch (error) {
      console.error("Toggle error:", error);
      toast.error("更新失敗");
    }
  };

  // Calculate status for each promo
  const getPromoStatus = (promo: DbPromo) => {
    if (!promo.is_active) return "inactive";
    if (!promo.expiry_date) return "active";
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const expiry = new Date(promo.expiry_date);
    const daysUntilExpiry = Math.ceil((expiry.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    
    if (daysUntilExpiry < 0) return "expired";
    if (daysUntilExpiry <= 7) return "expiring";
    return "active";
  };

  // Filter promos
  const filteredPromos = useMemo(() => {
    return promos.filter(promo => {
      const matchesSearch = 
        promo.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        promo.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (promo.merchant?.toLowerCase().includes(searchTerm.toLowerCase()));
      
      if (!matchesSearch) return false;
      
      const status = getPromoStatus(promo);
      
      switch (filterStatus) {
        case "active":
          return status === "active" || status === "expiring";
        case "expiring":
          return status === "expiring";
        case "expired":
          return status === "expired";
        case "pinned":
          return promo.is_pinned;
        default:
          return true;
      }
    });
  }, [promos, searchTerm, filterStatus]);

  // Stats
  const stats = useMemo(() => {
    const activeCount = promos.filter(p => getPromoStatus(p) === "active").length;
    const expiringCount = promos.filter(p => getPromoStatus(p) === "expiring").length;
    const expiredCount = promos.filter(p => getPromoStatus(p) === "expired").length;
    const pinnedCount = promos.filter(p => p.is_pinned).length;
    return { activeCount, expiringCount, expiredCount, pinnedCount };
  }, [promos]);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">需要登入</h2>
          <Link href="/login"><Button>登入</Button></Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Link href="/admin/database" className="text-gray-500 hover:text-gray-700">
              ← 返回
            </Link>
            <FileText className="h-8 w-8 text-purple-600" />
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">優惠文章管理</h1>
              <p className="text-sm text-gray-500">共 {promos.length} 篇 | 顯示 {filteredPromos.length} 篇</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={fetchPromos} disabled={loading}>
              <RefreshCw className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`} />
              刷新
            </Button>
            <Link href="/admin/database/promos/new">
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                新增文章
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <button
            onClick={() => setFilterStatus("active")}
            className={`p-4 rounded-xl border ${filterStatus === "active" ? "bg-green-50 border-green-200" : "bg-white border-gray-200"}`}
          >
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-600" />
              <span className="text-sm text-gray-600">進行中</span>
            </div>
            <p className="text-2xl font-bold text-gray-900 mt-1">{stats.activeCount}</p>
          </button>
          <button
            onClick={() => setFilterStatus("expiring")}
            className={`p-4 rounded-xl border ${filterStatus === "expiring" ? "bg-amber-50 border-amber-200" : "bg-white border-gray-200"}`}
          >
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-amber-600" />
              <span className="text-sm text-gray-600">即將過期</span>
            </div>
            <p className="text-2xl font-bold text-gray-900 mt-1">{stats.expiringCount}</p>
          </button>
          <button
            onClick={() => setFilterStatus("expired")}
            className={`p-4 rounded-xl border ${filterStatus === "expired" ? "bg-red-50 border-red-200" : "bg-white border-gray-200"}`}
          >
            <div className="flex items-center gap-2">
              <XCircle className="h-5 w-5 text-red-600" />
              <span className="text-sm text-gray-600">已過期</span>
            </div>
            <p className="text-2xl font-bold text-gray-900 mt-1">{stats.expiredCount}</p>
          </button>
          <button
            onClick={() => setFilterStatus("pinned")}
            className={`p-4 rounded-xl border ${filterStatus === "pinned" ? "bg-blue-50 border-blue-200" : "bg-white border-gray-200"}`}
          >
            <div className="flex items-center gap-2">
              <Pin className="h-5 w-5 text-blue-600" />
              <span className="text-sm text-gray-600">已置頂</span>
            </div>
            <p className="text-2xl font-bold text-gray-900 mt-1">{stats.pinnedCount}</p>
          </button>
        </div>

        {/* Filters */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="搜尋文章標題、ID 或商戶..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button
              variant={filterStatus === "all" ? "default" : "outline"}
              onClick={() => setFilterStatus("all")}
            >
              全部
            </Button>
          </div>
        </div>

        {/* Promos List */}
        <div className="space-y-3">
          {loading ? (
            <div className="text-center py-12">
              <RefreshCw className="h-8 w-8 text-gray-400 animate-spin mx-auto mb-4" />
              <p className="text-gray-500">載入中...</p>
            </div>
          ) : filteredPromos.length === 0 ? (
            <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-xl">
              <FileText className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">沒有找到優惠文章</p>
            </div>
          ) : (
            filteredPromos.map(promo => {
              const status = getPromoStatus(promo);
              const daysUntilExpiry = promo.expiry_date 
                ? Math.ceil((new Date(promo.expiry_date).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
                : null;
              
              return (
                <div key={promo.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4">
                  <div className="flex items-start gap-4">
                    {/* Image */}
                    <div className="w-24 h-16 flex-shrink-0 rounded overflow-hidden bg-gray-100">
                      {promo.image_url ? (
                        <img 
                          src={promo.image_url} 
                          alt={promo.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                          <FileText className="h-8 w-8" />
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-medium text-gray-900 dark:text-white truncate">
                          {promo.title}
                        </h3>
                        {promo.is_pinned && (
                          <span className="px-2 py-0.5 text-xs bg-blue-100 text-blue-700 rounded flex items-center gap-1">
                            <Pin className="h-3 w-3" /> 置頂
                          </span>
                        )}
                        {status === "expiring" && (
                          <span className="px-2 py-0.5 text-xs bg-amber-100 text-amber-700 rounded flex items-center gap-1">
                            <Clock className="h-3 w-3" /> {daysUntilExpiry} 天後過期
                          </span>
                        )}
                        {status === "expired" && (
                          <span className="px-2 py-0.5 text-xs bg-red-100 text-red-700 rounded">
                            已過期
                          </span>
                        )}
                        {!promo.is_active && (
                          <span className="px-2 py-0.5 text-xs bg-gray-100 text-gray-700 rounded">
                            停用
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-500 mt-1">
                        {promo.merchant && `${promo.merchant} | `}
                        {promo.expiry_date && `到期: ${promo.expiry_date}`}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        ID: {promo.id} | 更新: {new Date(promo.updated_at).toLocaleDateString()}
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-1">
                      <Link href={`/discover/${promo.slug || promo.id}`} target="_blank">
                        <Button size="sm" variant="ghost">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </Link>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => togglePinned(promo)}
                        className={promo.is_pinned ? "text-blue-600" : ""}
                      >
                        <Pin className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => toggleActive(promo)}
                        className={promo.is_active ? "text-green-600" : "text-red-600"}
                      >
                        {promo.is_active ? <CheckCircle2 className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
                      </Button>
                      <Link href={`/admin/database/promos/${promo.id}`}>
                        <Button size="sm" variant="ghost">
                          <Edit2 className="h-4 w-4" />
                        </Button>
                      </Link>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => deletePromo(promo.id, promo.title)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Bulk Actions for Expired */}
        {stats.expiredCount > 0 && filterStatus === "expired" && (
          <div className="mt-6 p-4 bg-red-50 dark:bg-red-900/20 rounded-xl border border-red-200 dark:border-red-800">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-red-600" />
                <span className="text-red-800 dark:text-red-200">
                  有 {stats.expiredCount} 篇已過期文章
                </span>
              </div>
              <Button
                size="sm"
                variant="destructive"
                onClick={async () => {
                  if (!confirm(`確定要刪除所有 ${stats.expiredCount} 篇已過期文章嗎？`)) return;
                  
                  const supabase = createClient();
                  const expiredIds = promos
                    .filter(p => getPromoStatus(p) === "expired")
                    .map(p => p.id);
                  
                  const { error } = await supabase
                    .from("db_promos")
                    .delete()
                    .in("id", expiredIds);
                  
                  if (error) {
                    toast.error("刪除失敗");
                  } else {
                    toast.success(`已刪除 ${expiredIds.length} 篇文章`);
                    fetchPromos();
                  }
                }}
              >
                <Trash2 className="h-4 w-4 mr-1" />
                刪除全部過期文章
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

