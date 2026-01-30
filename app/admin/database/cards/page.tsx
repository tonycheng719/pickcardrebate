"use client";

import { useState, useEffect, useMemo } from "react";
import { createClient } from "@/lib/supabase/client";
import { 
  CreditCard, 
  RefreshCw, 
  Plus, 
  Search,
  Edit2,
  Trash2,
  Eye,
  ChevronDown,
  ChevronUp,
  Settings,
  FileText,
  ExternalLink,
  Check,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import Link from "next/link";
import { DbCard, DbCardRule, DbCardNote } from "@/lib/types/db-cards";

export default function CardsManagementPage() {
  const [cards, setCards] = useState<DbCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBank, setSelectedBank] = useState<string>("all");
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  const [cardRules, setCardRules] = useState<Record<string, DbCardRule[]>>({});
  const [cardNotes, setCardNotes] = useState<Record<string, DbCardNote[]>>({});
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    setUser(user);
    if (user) {
      fetchCards();
    } else {
      setLoading(false);
    }
  };

  const fetchCards = async () => {
    setLoading(true);
    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("db_cards")
        .select("*")
        .order("bank", { ascending: true })
        .order("name", { ascending: true });

      if (error) throw error;
      setCards(data || []);
    } catch (error) {
      console.error("Failed to fetch cards:", error);
      toast.error("無法載入信用卡數據");
    } finally {
      setLoading(false);
    }
  };

  const fetchCardDetails = async (cardId: string) => {
    const supabase = createClient();
    
    // Fetch rules
    const { data: rules } = await supabase
      .from("db_card_rules")
      .select("*")
      .eq("card_id", cardId)
      .order("priority", { ascending: false });
    
    // Fetch notes
    const { data: notes } = await supabase
      .from("db_card_notes")
      .select("*")
      .eq("card_id", cardId)
      .order("priority", { ascending: false });

    setCardRules(prev => ({ ...prev, [cardId]: rules || [] }));
    setCardNotes(prev => ({ ...prev, [cardId]: notes || [] }));
  };

  const toggleCardExpand = (cardId: string) => {
    if (expandedCard === cardId) {
      setExpandedCard(null);
    } else {
      setExpandedCard(cardId);
      if (!cardRules[cardId]) {
        fetchCardDetails(cardId);
      }
    }
  };

  const deleteCard = async (cardId: string, cardName: string) => {
    if (!confirm(`確定要刪除「${cardName}」嗎？此操作會同時刪除相關的規則和備註。`)) {
      return;
    }

    try {
      const supabase = createClient();
      const { error } = await supabase
        .from("db_cards")
        .delete()
        .eq("id", cardId);

      if (error) throw error;
      
      toast.success(`已刪除「${cardName}」`);
      setCards(prev => prev.filter(c => c.id !== cardId));
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("刪除失敗");
    }
  };

  const toggleCardActive = async (card: DbCard) => {
    try {
      const supabase = createClient();
      const { error } = await supabase
        .from("db_cards")
        .update({ is_active: !card.is_active })
        .eq("id", card.id);

      if (error) throw error;
      
      setCards(prev => prev.map(c => 
        c.id === card.id ? { ...c, is_active: !c.is_active } : c
      ));
      toast.success(card.is_active ? "已停用" : "已啟用");
    } catch (error) {
      console.error("Toggle error:", error);
      toast.error("更新失敗");
    }
  };

  // Get unique banks for filter
  const banks = useMemo(() => {
    const bankSet = new Set(cards.map(c => c.bank));
    return Array.from(bankSet).sort();
  }, [cards]);

  // Filter cards
  const filteredCards = useMemo(() => {
    return cards.filter(card => {
      const matchesSearch = 
        card.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        card.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        card.bank.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesBank = selectedBank === "all" || card.bank === selectedBank;
      
      return matchesSearch && matchesBank;
    });
  }, [cards, searchTerm, selectedBank]);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <CreditCard className="h-12 w-12 text-gray-400 mx-auto mb-4" />
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
            <CreditCard className="h-8 w-8 text-blue-600" />
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">信用卡管理</h1>
              <p className="text-sm text-gray-500">共 {cards.length} 張卡 | 顯示 {filteredCards.length} 張</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={fetchCards} disabled={loading}>
              <RefreshCw className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`} />
              刷新
            </Button>
            <Link href="/admin/database/cards/new">
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                新增卡片
              </Button>
            </Link>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="搜尋卡片名稱、ID 或銀行..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <select
              value={selectedBank}
              onChange={(e) => setSelectedBank(e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="all">所有銀行</option>
              {banks.map(bank => (
                <option key={bank} value={bank}>{bank}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Cards List */}
        <div className="space-y-3">
          {loading ? (
            <div className="text-center py-12">
              <RefreshCw className="h-8 w-8 text-gray-400 animate-spin mx-auto mb-4" />
              <p className="text-gray-500">載入中...</p>
            </div>
          ) : filteredCards.length === 0 ? (
            <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-xl">
              <CreditCard className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">沒有找到信用卡</p>
              {cards.length === 0 && (
                <p className="text-sm text-gray-400 mt-2">
                  請先到 <Link href="/admin/database" className="text-blue-600 hover:underline">數據庫管理</Link> 匯入數據
                </p>
              )}
            </div>
          ) : (
            filteredCards.map(card => (
              <div key={card.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
                {/* Card Header */}
                <div 
                  className="p-4 flex items-center gap-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-750"
                  onClick={() => toggleCardExpand(card.id)}
                >
                  {/* Card Image */}
                  <div className="w-20 h-12 flex-shrink-0">
                    {card.image_url ? (
                      <img 
                        src={card.image_url} 
                        alt={card.name}
                        className="w-full h-full object-contain rounded"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <div 
                        className="w-full h-full rounded flex items-center justify-center text-white text-xs"
                        style={{ backgroundColor: card.style?.bgColor || "#6B7280" }}
                      >
                        {card.bank.slice(0, 4)}
                      </div>
                    )}
                  </div>

                  {/* Card Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium text-gray-900 dark:text-white truncate">
                        {card.name}
                      </h3>
                      {!card.is_active && (
                        <span className="px-2 py-0.5 text-xs bg-red-100 text-red-700 rounded">停用</span>
                      )}
                    </div>
                    <p className="text-sm text-gray-500">{card.bank} | {card.id}</p>
                  </div>

                  {/* Stats */}
                  <div className="hidden md:flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Settings className="h-4 w-4" />
                      <span>{cardRules[card.id]?.length || "?"} 規則</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <FileText className="h-4 w-4" />
                      <span>{cardNotes[card.id]?.length || "?"} 備註</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleCardActive(card);
                      }}
                    >
                      {card.is_active ? (
                        <Check className="h-4 w-4 text-green-600" />
                      ) : (
                        <X className="h-4 w-4 text-red-600" />
                      )}
                    </Button>
                    <Link href={`/admin/database/cards/${card.id}`} onClick={e => e.stopPropagation()}>
                      <Button size="sm" variant="ghost">
                        <Edit2 className="h-4 w-4" />
                      </Button>
                    </Link>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteCard(card.id, card.name);
                      }}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                    {expandedCard === card.id ? (
                      <ChevronUp className="h-5 w-5 text-gray-400" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-gray-400" />
                    )}
                  </div>
                </div>

                {/* Expanded Details */}
                {expandedCard === card.id && (
                  <div className="border-t border-gray-200 dark:border-gray-700 p-4 bg-gray-50 dark:bg-gray-850">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Card Details */}
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white mb-3">基本資料</h4>
                        <dl className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <dt className="text-gray-500">年費</dt>
                            <dd className="text-gray-900 dark:text-white">
                              {card.annual_fee === 0 ? "免年費" : `$${card.annual_fee}`}
                            </dd>
                          </div>
                          {card.fee_waiver_condition && (
                            <div className="flex justify-between">
                              <dt className="text-gray-500">免年費條件</dt>
                              <dd className="text-gray-900 dark:text-white text-right max-w-[200px]">
                                {card.fee_waiver_condition}
                              </dd>
                            </div>
                          )}
                          {card.min_income && (
                            <div className="flex justify-between">
                              <dt className="text-gray-500">最低年薪</dt>
                              <dd className="text-gray-900 dark:text-white">${card.min_income.toLocaleString()}</dd>
                            </div>
                          )}
                          {card.network && (
                            <div className="flex justify-between">
                              <dt className="text-gray-500">網絡</dt>
                              <dd className="text-gray-900 dark:text-white uppercase">{card.network}</dd>
                            </div>
                          )}
                        </dl>
                        
                        {/* Links */}
                        <div className="mt-4 flex gap-2">
                          {card.apply_url && (
                            <a href={card.apply_url} target="_blank" rel="noopener noreferrer">
                              <Button size="sm" variant="outline">
                                <ExternalLink className="h-3 w-3 mr-1" />
                                官方申請
                              </Button>
                            </a>
                          )}
                          {card.partner_apply_url && (
                            <a href={card.partner_apply_url} target="_blank" rel="noopener noreferrer">
                              <Button size="sm" variant="outline">
                                <ExternalLink className="h-3 w-3 mr-1" />
                                合作連結
                              </Button>
                            </a>
                          )}
                        </div>
                      </div>

                      {/* Rules & Notes */}
                      <div>
                        {/* Rules */}
                        <div className="mb-4">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium text-gray-900 dark:text-white">計算規則</h4>
                            <Link href={`/admin/database/cards/${card.id}/rules`}>
                              <Button size="sm" variant="ghost">
                                <Plus className="h-3 w-3 mr-1" /> 管理
                              </Button>
                            </Link>
                          </div>
                          {cardRules[card.id]?.length ? (
                            <ul className="space-y-1 text-sm">
                              {cardRules[card.id].slice(0, 5).map(rule => (
                                <li key={rule.id} className="flex items-center justify-between p-2 bg-white dark:bg-gray-800 rounded">
                                  <span className="text-gray-700 dark:text-gray-300 truncate">{rule.description}</span>
                                  <span className="text-green-600 font-medium">{rule.percentage}%</span>
                                </li>
                              ))}
                              {cardRules[card.id].length > 5 && (
                                <li className="text-gray-500 text-xs">還有 {cardRules[card.id].length - 5} 條規則...</li>
                              )}
                            </ul>
                          ) : (
                            <p className="text-sm text-gray-400">暫無規則</p>
                          )}
                        </div>

                        {/* Notes */}
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium text-gray-900 dark:text-white">備註</h4>
                            <Link href={`/admin/database/cards/${card.id}/notes`}>
                              <Button size="sm" variant="ghost">
                                <Plus className="h-3 w-3 mr-1" /> 管理
                              </Button>
                            </Link>
                          </div>
                          {cardNotes[card.id]?.length ? (
                            <ul className="space-y-1 text-sm">
                              {cardNotes[card.id].slice(0, 3).map(note => (
                                <li key={note.id} className="p-2 bg-amber-50 dark:bg-amber-900/20 rounded text-amber-800 dark:text-amber-200 truncate">
                                  {note.content.slice(0, 50)}...
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <p className="text-sm text-gray-400">暫無備註</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

