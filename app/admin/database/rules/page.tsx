"use client";

import { useState, useEffect, useMemo } from "react";
import { createClient } from "@/lib/supabase/client";
import { 
  Settings, 
  RefreshCw, 
  Plus, 
  Search,
  Edit2,
  Trash2,
  ChevronDown,
  ChevronUp,
  CreditCard,
  Calendar,
  AlertTriangle,
  CheckCircle2,
  Filter
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import Link from "next/link";
import { DbCardRule, DbCard } from "@/lib/types/db-cards";

export default function RulesManagementPage() {
  const [rules, setRules] = useState<DbCardRule[]>([]);
  const [cards, setCards] = useState<DbCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCard, setSelectedCard] = useState<string>("all");
  const [selectedMatchType, setSelectedMatchType] = useState<string>("all");
  const [showExpired, setShowExpired] = useState(false);
  const [expandedRule, setExpandedRule] = useState<string | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const supabase = createClient();
      
      // Fetch all rules
      const { data: rulesData, error: rulesError } = await supabase
        .from("db_card_rules")
        .select("*")
        .order("card_id", { ascending: true })
        .order("priority", { ascending: false });

      if (rulesError) throw rulesError;
      
      // Fetch all cards for mapping
      const { data: cardsData, error: cardsError } = await supabase
        .from("db_cards")
        .select("id, name, bank")
        .order("name", { ascending: true });

      if (cardsError) throw cardsError;

      setRules(rulesData || []);
      setCards(cardsData || []);
    } catch (error) {
      console.error("Failed to fetch data:", error);
      toast.error("無法載入數據");
    } finally {
      setLoading(false);
    }
  };

  const deleteRule = async (ruleId: string) => {
    if (!confirm("確定要刪除這條規則嗎？")) return;

    try {
      const supabase = createClient();
      const { error } = await supabase
        .from("db_card_rules")
        .delete()
        .eq("id", ruleId);

      if (error) throw error;
      
      toast.success("規則已刪除");
      setRules(prev => prev.filter(r => r.id !== ruleId));
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("刪除失敗");
    }
  };

  const toggleRuleActive = async (rule: DbCardRule) => {
    try {
      const supabase = createClient();
      const { error } = await supabase
        .from("db_card_rules")
        .update({ is_active: !rule.is_active })
        .eq("id", rule.id);

      if (error) throw error;
      
      setRules(prev => prev.map(r => 
        r.id === rule.id ? { ...r, is_active: !r.is_active } : r
      ));
      toast.success(rule.is_active ? "已停用" : "已啟用");
    } catch (error) {
      console.error("Toggle error:", error);
      toast.error("更新失敗");
    }
  };

  // Get card name by ID
  const getCardName = (cardId: string) => {
    const card = cards.find(c => c.id === cardId);
    return card ? card.name : cardId;
  };

  const getCardBank = (cardId: string) => {
    const card = cards.find(c => c.id === cardId);
    return card ? card.bank : "";
  };

  // Check if rule is expired
  const isExpired = (rule: DbCardRule) => {
    if (!rule.valid_until) return false;
    return new Date(rule.valid_until) < new Date();
  };

  // Get expiry status
  const getExpiryStatus = (rule: DbCardRule) => {
    if (!rule.valid_until) return null;
    const expiryDate = new Date(rule.valid_until);
    const now = new Date();
    const daysUntil = Math.ceil((expiryDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    
    if (daysUntil < 0) {
      return { type: "expired", text: `過期 ${Math.abs(daysUntil)} 天`, color: "text-red-600 bg-red-50" };
    } else if (daysUntil <= 7) {
      return { type: "expiring", text: `${daysUntil} 天後到期`, color: "text-orange-600 bg-orange-50" };
    } else if (daysUntil <= 30) {
      return { type: "soon", text: `${daysUntil} 天後到期`, color: "text-yellow-600 bg-yellow-50" };
    }
    return { type: "active", text: `${daysUntil} 天後到期`, color: "text-green-600 bg-green-50" };
  };

  // Get unique card IDs for filter
  const uniqueCardIds = useMemo(() => {
    const cardSet = new Set(rules.map(r => r.card_id));
    return Array.from(cardSet).sort((a, b) => getCardName(a).localeCompare(getCardName(b)));
  }, [rules, cards]);

  // Filter rules
  const filteredRules = useMemo(() => {
    return rules.filter(rule => {
      const matchesSearch = 
        rule.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        rule.card_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        getCardName(rule.card_id).toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCard = selectedCard === "all" || rule.card_id === selectedCard;
      const matchesType = selectedMatchType === "all" || rule.match_type === selectedMatchType;
      const matchesExpired = showExpired || !isExpired(rule);
      
      return matchesSearch && matchesCard && matchesType && matchesExpired;
    });
  }, [rules, searchTerm, selectedCard, selectedMatchType, showExpired, cards]);

  // Group by card
  const groupedRules = useMemo(() => {
    const groups: Record<string, DbCardRule[]> = {};
    filteredRules.forEach(rule => {
      if (!groups[rule.card_id]) {
        groups[rule.card_id] = [];
      }
      groups[rule.card_id].push(rule);
    });
    return groups;
  }, [filteredRules]);

  // Stats
  const stats = useMemo(() => {
    const expired = rules.filter(r => isExpired(r)).length;
    const active = rules.filter(r => r.is_active && !isExpired(r)).length;
    const inactive = rules.filter(r => !r.is_active).length;
    return { total: rules.length, expired, active, inactive };
  }, [rules]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Link href="/admin/database" className="text-gray-500 hover:text-gray-700">
              ← 返回
            </Link>
            <Settings className="h-8 w-8 text-green-600" />
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">計算規則管理</h1>
              <p className="text-sm text-gray-500">
                共 {stats.total} 條規則 | 啟用 {stats.active} | 停用 {stats.inactive} | 過期 {stats.expired}
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={fetchData} disabled={loading}>
              <RefreshCw className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`} />
              刷新
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-500">總規則</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.total}</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700">
            <p className="text-sm text-green-600">啟用中</p>
            <p className="text-2xl font-bold text-green-600">{stats.active}</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-500">已停用</p>
            <p className="text-2xl font-bold text-gray-400">{stats.inactive}</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700">
            <p className="text-sm text-red-600">已過期</p>
            <p className="text-2xl font-bold text-red-600">{stats.expired}</p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="搜尋規則描述或卡片名稱..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <select
              value={selectedCard}
              onChange={(e) => setSelectedCard(e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="all">所有卡片</option>
              {uniqueCardIds.map(cardId => (
                <option key={cardId} value={cardId}>{getCardName(cardId)}</option>
              ))}
            </select>
            <select
              value={selectedMatchType}
              onChange={(e) => setSelectedMatchType(e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="all">所有類型</option>
              <option value="base">基礎回贈</option>
              <option value="category">類別回贈</option>
              <option value="merchant">商戶回贈</option>
              <option value="payment">支付方式</option>
            </select>
            <label className="flex items-center gap-2 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer">
              <input
                type="checkbox"
                checked={showExpired}
                onChange={(e) => setShowExpired(e.target.checked)}
                className="rounded"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">顯示過期</span>
            </label>
          </div>
        </div>

        {/* Rules List */}
        <div className="space-y-4">
          {loading ? (
            <div className="text-center py-12">
              <RefreshCw className="h-8 w-8 text-gray-400 animate-spin mx-auto mb-4" />
              <p className="text-gray-500">載入中...</p>
            </div>
          ) : Object.keys(groupedRules).length === 0 ? (
            <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-xl">
              <Settings className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">沒有找到規則</p>
            </div>
          ) : (
            Object.entries(groupedRules).map(([cardId, cardRules]) => (
              <div key={cardId} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
                {/* Card Header */}
                <div className="p-4 bg-gray-50 dark:bg-gray-750 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <CreditCard className="h-5 w-5 text-gray-400" />
                      <div>
                        <h3 className="font-medium text-gray-900 dark:text-white">{getCardName(cardId)}</h3>
                        <p className="text-sm text-gray-500">{getCardBank(cardId)} | {cardRules.length} 條規則</p>
                      </div>
                    </div>
                    <Link href={`/admin/database/cards/${cardId}`}>
                      <Button size="sm" variant="outline">
                        查看卡片
                      </Button>
                    </Link>
                  </div>
                </div>

                {/* Rules */}
                <div className="divide-y divide-gray-100 dark:divide-gray-700">
                  {cardRules.map(rule => {
                    const expiryStatus = getExpiryStatus(rule);
                    return (
                      <div 
                        key={rule.id} 
                        className={`p-4 hover:bg-gray-50 dark:hover:bg-gray-750 ${!rule.is_active || isExpired(rule) ? "opacity-60" : ""}`}
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-medium text-gray-900 dark:text-white">
                                {rule.description}
                              </span>
                              {!rule.is_active && (
                                <span className="px-2 py-0.5 text-xs bg-gray-100 text-gray-600 rounded">停用</span>
                              )}
                              {isExpired(rule) && (
                                <span className="px-2 py-0.5 text-xs bg-red-100 text-red-600 rounded">過期</span>
                              )}
                            </div>
                            <div className="flex items-center gap-3 text-sm text-gray-500">
                              <span className="px-2 py-0.5 bg-blue-50 text-blue-700 rounded text-xs">
                                {rule.match_type === "base" && "基礎"}
                                {rule.match_type === "category" && "類別"}
                                {rule.match_type === "merchant" && "商戶"}
                                {rule.match_type === "payment" && "支付"}
                              </span>
                              <span className="text-green-600 font-medium">{rule.percentage}%</span>
                              {rule.cap && (
                                <span>上限 ${rule.cap}/{rule.cap_period === "monthly" ? "月" : rule.cap_period === "quarterly" ? "季" : rule.cap_period === "annual" ? "年" : "次"}</span>
                              )}
                              {expiryStatus && (
                                <span className={`px-2 py-0.5 rounded text-xs ${expiryStatus.color}`}>
                                  {expiryStatus.text}
                                </span>
                              )}
                            </div>
                            {/* Details */}
                            {(rule.categories?.length > 0 || rule.merchants?.length > 0) && (
                              <div className="mt-2 text-xs text-gray-500">
                                {rule.categories?.length > 0 && (
                                  <span className="mr-2">類別: {rule.categories.join(", ")}</span>
                                )}
                                {rule.merchants?.length > 0 && (
                                  <span>商戶: {rule.merchants.join(", ")}</span>
                                )}
                              </div>
                            )}
                          </div>

                          {/* Actions */}
                          <div className="flex items-center gap-2">
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => toggleRuleActive(rule)}
                            >
                              {rule.is_active ? (
                                <CheckCircle2 className="h-4 w-4 text-green-600" />
                              ) : (
                                <AlertTriangle className="h-4 w-4 text-gray-400" />
                              )}
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => deleteRule(rule.id)}
                              className="text-red-600 hover:text-red-700 hover:bg-red-50"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

