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
  Filter,
  X,
  Save
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import Link from "next/link";
import { DbCardRule, DbCard, DbCardRuleInsert } from "@/lib/types/db-cards";
import { CATEGORIES } from "@/lib/data/categories";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

// Default empty rule for the form
const emptyRule: Partial<DbCardRuleInsert> = {
  card_id: "",
  description: "",
  match_type: "base",
  categories: [],
  merchants: [],
  payment_methods: [],
  percentage: 0,
  cap: null,
  cap_type: "reward",
  cap_period: "monthly",
  min_spend: null,
  exclude_categories: [],
  valid_from: null,
  valid_until: null,
  priority: 0,
  requires_registration: false,
  registration_url: null,
  notes: null,
  is_active: true,
};

export default function RulesManagementPage() {
  const [rules, setRules] = useState<DbCardRule[]>([]);
  const [cards, setCards] = useState<DbCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCard, setSelectedCard] = useState<string>("all");
  const [selectedMatchType, setSelectedMatchType] = useState<string>("all");
  const [showExpired, setShowExpired] = useState(false);
  const [expandedRule, setExpandedRule] = useState<string | null>(null);
  
  // Rule editor state
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingRule, setEditingRule] = useState<Partial<DbCardRuleInsert> & { id?: string }>(emptyRule);
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);

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

  // Open editor for new rule
  const openNewRuleEditor = (cardId?: string) => {
    setEditingRule({ ...emptyRule, card_id: cardId || "" });
    setIsEditing(false);
    setIsEditorOpen(true);
  };

  // Open editor for existing rule
  const openEditRuleEditor = (rule: DbCardRule) => {
    setEditingRule({
      id: rule.id,
      card_id: rule.card_id,
      description: rule.description,
      match_type: rule.match_type,
      categories: rule.categories || [],
      merchants: rule.merchants || [],
      payment_methods: rule.payment_methods || [],
      percentage: rule.percentage,
      cap: rule.cap,
      cap_type: rule.cap_type || "reward",
      cap_period: rule.cap_period || "monthly",
      min_spend: rule.min_spend,
      exclude_categories: rule.exclude_categories || [],
      valid_from: rule.valid_from,
      valid_until: rule.valid_until,
      priority: rule.priority || 0,
      requires_registration: rule.requires_registration || false,
      registration_url: rule.registration_url,
      notes: rule.notes,
      is_active: rule.is_active,
    });
    setIsEditing(true);
    setIsEditorOpen(true);
  };

  // Save rule (create or update)
  const saveRule = async () => {
    if (!editingRule.card_id || !editingRule.description || !editingRule.percentage) {
      toast.error("請填寫必填欄位（卡片、描述、回贈率）");
      return;
    }

    setSaving(true);
    try {
      const supabase = createClient();

      const ruleData = {
        card_id: editingRule.card_id,
        description: editingRule.description,
        match_type: editingRule.match_type || "base",
        categories: editingRule.categories || [],
        merchants: editingRule.merchants || [],
        payment_methods: editingRule.payment_methods || [],
        percentage: editingRule.percentage,
        cap: editingRule.cap || null,
        cap_type: editingRule.cap_type || "reward",
        cap_period: editingRule.cap_period || "monthly",
        min_spend: editingRule.min_spend || null,
        exclude_categories: editingRule.exclude_categories || [],
        valid_from: editingRule.valid_from || null,
        valid_until: editingRule.valid_until || null,
        priority: editingRule.priority || 0,
        requires_registration: editingRule.requires_registration || false,
        registration_url: editingRule.registration_url || null,
        notes: editingRule.notes || null,
        is_active: editingRule.is_active ?? true,
      };

      if (isEditing && editingRule.id) {
        // Update
        const { error } = await supabase
          .from("db_card_rules")
          .update(ruleData)
          .eq("id", editingRule.id);

        if (error) throw error;
        toast.success("規則已更新");
      } else {
        // Create
        const { error } = await supabase
          .from("db_card_rules")
          .insert([ruleData]);

        if (error) throw error;
        toast.success("規則已新增");
      }

      setIsEditorOpen(false);
      fetchData();
    } catch (error) {
      console.error("Save error:", error);
      toast.error("儲存失敗");
    } finally {
      setSaving(false);
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
            <Button onClick={() => openNewRuleEditor()}>
              <Plus className="h-4 w-4 mr-2" />
              新增規則
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
                              onClick={() => openEditRuleEditor(rule)}
                              className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                            >
                              <Edit2 className="h-4 w-4" />
                            </Button>
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

      {/* Rule Editor Dialog */}
      <Dialog open={isEditorOpen} onOpenChange={setIsEditorOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5 text-green-600" />
              {isEditing ? "編輯規則" : "新增規則"}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-4">
            {/* Card Selection */}
            <div className="space-y-2">
              <Label>信用卡 *</Label>
              <select
                value={editingRule.card_id || ""}
                onChange={(e) => setEditingRule(prev => ({ ...prev, card_id: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700"
                disabled={isEditing}
              >
                <option value="">選擇信用卡</option>
                {cards.map(card => (
                  <option key={card.id} value={card.id}>{card.name} ({card.bank})</option>
                ))}
              </select>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label>規則描述 *</Label>
              <Input
                placeholder="例如：🔥 網購 4% 回贈"
                value={editingRule.description || ""}
                onChange={(e) => setEditingRule(prev => ({ ...prev, description: e.target.value }))}
              />
            </div>

            {/* Match Type & Percentage */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>匹配類型</Label>
                <select
                  value={editingRule.match_type || "base"}
                  onChange={(e) => setEditingRule(prev => ({ ...prev, match_type: e.target.value as any }))}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700"
                >
                  <option value="base">基礎回贈（所有消費）</option>
                  <option value="category">類別回贈</option>
                  <option value="merchant">商戶回贈</option>
                  <option value="payment">支付方式</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label>回贈率 (%) *</Label>
                <Input
                  type="number"
                  step="0.1"
                  placeholder="4"
                  value={editingRule.percentage || ""}
                  onChange={(e) => setEditingRule(prev => ({ ...prev, percentage: parseFloat(e.target.value) || 0 }))}
                />
              </div>
            </div>

            {/* Categories (if match_type is category) */}
            {editingRule.match_type === "category" && (
              <div className="space-y-2">
                <Label>適用類別</Label>
                <div className="flex flex-wrap gap-2 p-3 border border-gray-200 dark:border-gray-700 rounded-lg max-h-40 overflow-y-auto">
                  {CATEGORIES.map(cat => (
                    <label key={cat.id} className="flex items-center gap-1.5 text-sm cursor-pointer">
                      <input
                        type="checkbox"
                        checked={editingRule.categories?.includes(cat.id) || false}
                        onChange={(e) => {
                          const cats = editingRule.categories || [];
                          if (e.target.checked) {
                            setEditingRule(prev => ({ ...prev, categories: [...cats, cat.id] }));
                          } else {
                            setEditingRule(prev => ({ ...prev, categories: cats.filter(c => c !== cat.id) }));
                          }
                        }}
                        className="rounded"
                      />
                      {cat.name}
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Merchants (if match_type is merchant) */}
            {editingRule.match_type === "merchant" && (
              <div className="space-y-2">
                <Label>適用商戶（以逗號分隔）</Label>
                <Input
                  placeholder="McDonald's, KFC, Starbucks"
                  value={editingRule.merchants?.join(", ") || ""}
                  onChange={(e) => setEditingRule(prev => ({ 
                    ...prev, 
                    merchants: e.target.value.split(",").map(s => s.trim()).filter(Boolean) 
                  }))}
                />
              </div>
            )}

            {/* Payment Methods (if match_type is payment) */}
            {editingRule.match_type === "payment" && (
              <div className="space-y-2">
                <Label>適用支付方式</Label>
                <div className="flex flex-wrap gap-2">
                  {["apple_pay", "google_pay", "samsung_pay", "alipay", "wechat_pay", "payme", "octopus"].map(method => (
                    <label key={method} className="flex items-center gap-1.5 text-sm cursor-pointer">
                      <input
                        type="checkbox"
                        checked={editingRule.payment_methods?.includes(method) || false}
                        onChange={(e) => {
                          const methods = editingRule.payment_methods || [];
                          if (e.target.checked) {
                            setEditingRule(prev => ({ ...prev, payment_methods: [...methods, method] }));
                          } else {
                            setEditingRule(prev => ({ ...prev, payment_methods: methods.filter(m => m !== method) }));
                          }
                        }}
                        className="rounded"
                      />
                      {method.replace("_", " ").toUpperCase()}
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Cap Settings */}
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>回贈上限</Label>
                <Input
                  type="number"
                  placeholder="600"
                  value={editingRule.cap || ""}
                  onChange={(e) => setEditingRule(prev => ({ ...prev, cap: e.target.value ? parseInt(e.target.value) : null }))}
                />
              </div>
              <div className="space-y-2">
                <Label>上限類型</Label>
                <select
                  value={editingRule.cap_type || "reward"}
                  onChange={(e) => setEditingRule(prev => ({ ...prev, cap_type: e.target.value as any }))}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700"
                >
                  <option value="reward">回贈金額</option>
                  <option value="spending">簽賬金額</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label>上限週期</Label>
                <select
                  value={editingRule.cap_period || "monthly"}
                  onChange={(e) => setEditingRule(prev => ({ ...prev, cap_period: e.target.value as any }))}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700"
                >
                  <option value="monthly">每月</option>
                  <option value="quarterly">每季</option>
                  <option value="annual">每年</option>
                  <option value="transaction">每次交易</option>
                </select>
              </div>
            </div>

            {/* Min Spend */}
            <div className="space-y-2">
              <Label>最低消費金額</Label>
              <Input
                type="number"
                placeholder="300"
                value={editingRule.min_spend || ""}
                onChange={(e) => setEditingRule(prev => ({ ...prev, min_spend: e.target.value ? parseInt(e.target.value) : null }))}
              />
            </div>

            {/* Valid Date Range */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>生效日期</Label>
                <Input
                  type="date"
                  value={editingRule.valid_from || ""}
                  onChange={(e) => setEditingRule(prev => ({ ...prev, valid_from: e.target.value || null }))}
                />
              </div>
              <div className="space-y-2">
                <Label>到期日期</Label>
                <Input
                  type="date"
                  value={editingRule.valid_until || ""}
                  onChange={(e) => setEditingRule(prev => ({ ...prev, valid_until: e.target.value || null }))}
                />
              </div>
            </div>

            {/* Registration Required */}
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="requires_registration"
                checked={editingRule.requires_registration || false}
                onChange={(e) => setEditingRule(prev => ({ ...prev, requires_registration: e.target.checked }))}
                className="rounded"
              />
              <Label htmlFor="requires_registration" className="cursor-pointer">需要登記才能享用</Label>
            </div>

            {editingRule.requires_registration && (
              <div className="space-y-2">
                <Label>登記連結</Label>
                <Input
                  placeholder="https://..."
                  value={editingRule.registration_url || ""}
                  onChange={(e) => setEditingRule(prev => ({ ...prev, registration_url: e.target.value || null }))}
                />
              </div>
            )}

            {/* Notes */}
            <div className="space-y-2">
              <Label>備註</Label>
              <textarea
                placeholder="額外說明..."
                value={editingRule.notes || ""}
                onChange={(e) => setEditingRule(prev => ({ ...prev, notes: e.target.value || null }))}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 min-h-[80px]"
              />
            </div>

            {/* Priority & Active */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>優先級（數值越大越優先）</Label>
                <Input
                  type="number"
                  placeholder="0"
                  value={editingRule.priority || ""}
                  onChange={(e) => setEditingRule(prev => ({ ...prev, priority: parseInt(e.target.value) || 0 }))}
                />
              </div>
              <div className="flex items-center gap-3 pt-6">
                <input
                  type="checkbox"
                  id="is_active"
                  checked={editingRule.is_active ?? true}
                  onChange={(e) => setEditingRule(prev => ({ ...prev, is_active: e.target.checked }))}
                  className="rounded"
                />
                <Label htmlFor="is_active" className="cursor-pointer">立即啟用</Label>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button variant="outline" onClick={() => setIsEditorOpen(false)}>
              取消
            </Button>
            <Button onClick={saveRule} disabled={saving}>
              {saving ? (
                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <Save className="h-4 w-4 mr-2" />
              )}
              {isEditing ? "更新規則" : "新增規則"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

