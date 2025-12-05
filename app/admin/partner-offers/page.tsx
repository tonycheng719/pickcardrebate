"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HK_CARDS } from "@/lib/data/cards";
import { createClient } from "@/lib/supabase/client";
import { 
  ArrowLeft, Save, Trash2, Plus, ExternalLink, 
  Gift, Search, Check, X, AlertCircle, Settings, MousePointerClick, Wand2
} from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";
import { PartnerOffer } from "@/lib/types";

interface CardWithPartnerOffer {
  id: string;
  name: string;
  bank: string;
  partnerOffer?: PartnerOffer;
}

interface ClickStats {
  card_id: string;
  card_name: string;
  click_count: number;
  last_clicked_at: string;
}

export default function AdminPartnerOffersPage() {
  const [cards, setCards] = useState<CardWithPartnerOffer[]>([]);
  const [selectedCardId, setSelectedCardId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [globalEnabled, setGlobalEnabled] = useState(false);
  const [clickStats, setClickStats] = useState<ClickStats[]>([]);
  const [totalClicks, setTotalClicks] = useState(0);
  const [isSeeding, setIsSeeding] = useState(false);
  
  // Partner Offer Form State
  const [formData, setFormData] = useState<PartnerOffer>({
    enabled: false,
    applyUrl: "",
    bonusValue: 0,
    bonusDescription: "",
    bonusItems: [],
    validFrom: new Date().toISOString().split('T')[0],
    validTo: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    requirements: [],
    minSpend: 0,
    minSpendDays: 30,
    notes: "",
  });
  const [bonusItemInput, setBonusItemInput] = useState("");
  const [requirementInput, setRequirementInput] = useState("");

  // Fetch cards and their partner offers from database
  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      try {
        const supabase = createClient();
        
        // Fetch global setting
        const { data: settingData } = await supabase
          .from("system_settings")
          .select("value")
          .eq("key", "partner_offers_enabled")
          .single();
        
        setGlobalEnabled(settingData?.value === "true");
        
        // Fetch partner offers from database
        const { data: offersData } = await supabase
          .from("cards")
          .select("id, partner_offer");
        
        // Merge with HK_CARDS
        const mergedCards = HK_CARDS.map(card => ({
          id: card.id,
          name: card.name,
          bank: card.bank,
          partnerOffer: offersData?.find((o: { id: string; partner_offer: PartnerOffer }) => o.id === card.id)?.partner_offer as PartnerOffer | undefined,
        }));
        
        setCards(mergedCards);
        
        // Fetch click stats
        try {
          const clickResponse = await fetch('/api/stats/partner-click');
          if (clickResponse.ok) {
            const clickData = await clickResponse.json();
            setClickStats(clickData.stats || []);
            setTotalClicks(clickData.totalClicks || 0);
          }
        } catch (e) {
          console.log('Click stats not available yet');
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("載入失敗");
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchData();
  }, []);

  // Filter cards by search
  const filteredCards = cards.filter(card => 
    card.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    card.bank.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Cards with partner offers
  const cardsWithOffers = cards.filter(c => c.partnerOffer?.enabled);
  
  // Get click count for a card
  const getClickCount = (cardId: string): number => {
    const stat = clickStats.find(s => s.card_id === cardId);
    return stat?.click_count || 0;
  };

  // Select a card to edit
  const handleSelectCard = (cardId: string) => {
    setSelectedCardId(cardId);
    const card = cards.find(c => c.id === cardId);
    if (card?.partnerOffer) {
      setFormData(card.partnerOffer);
    } else {
      // Reset form for new offer
      setFormData({
        enabled: true,
        applyUrl: "",
        bonusValue: 500,
        bonusDescription: "",
        bonusItems: [],
        validFrom: new Date().toISOString().split('T')[0],
        validTo: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        requirements: [],
        minSpend: 100,
        minSpendDays: 30,
        notes: "",
      });
    }
  };

  // Save partner offer
  const handleSave = async () => {
    if (!selectedCardId) return;
    
    setIsSaving(true);
    try {
      const response = await fetch('/api/admin/cards/update-partner-offer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cardId: selectedCardId,
          partnerOffer: formData,
        }),
      });

      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.error || '儲存失敗');
      }

      // Update local state
      setCards(prev => prev.map(c => 
        c.id === selectedCardId ? { ...c, partnerOffer: formData } : c
      ));
      
      toast.success("已儲存！");
    } catch (error: any) {
      console.error("Error saving:", error);
      toast.error("儲存失敗：" + error.message);
    } finally {
      setIsSaving(false);
    }
  };

  // Delete partner offer
  const handleDelete = async () => {
    if (!selectedCardId) return;
    
    if (!confirm("確定要刪除此額外迎新資料？")) return;
    
    setIsSaving(true);
    try {
      const response = await fetch('/api/admin/cards/update-partner-offer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cardId: selectedCardId,
          partnerOffer: null,
        }),
      });

      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.error || '刪除失敗');
      }

      // Update local state
      setCards(prev => prev.map(c => 
        c.id === selectedCardId ? { ...c, partnerOffer: undefined } : c
      ));
      
      setSelectedCardId(null);
      toast.success("已刪除！");
    } catch (error: any) {
      console.error("Error deleting:", error);
      toast.error("刪除失敗：" + error.message);
    } finally {
      setIsSaving(false);
    }
  };

  // Toggle global setting
  const handleToggleGlobal = async () => {
    try {
      const newValue = !globalEnabled;
      const response = await fetch('/api/admin/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          key: "partner_offers_enabled",
          value: newValue ? "true" : "false",
        }),
      });

      if (!response.ok) {
        throw new Error('更新失敗');
      }

      setGlobalEnabled(newValue);
      toast.success(newValue ? "已啟用額外迎新功能" : "已停用額外迎新功能");
    } catch (error: any) {
      toast.error("更新失敗：" + error.message);
    }
  };

  // Seed MoneyHero partner offers
  const handleSeedSampleData = async () => {
    if (!confirm("這會從 MoneyHero 導入真實的額外迎新優惠資料（約20張信用卡），要繼續嗎？")) {
      return;
    }
    
    setIsSeeding(true);
    toast.info("正在導入 MoneyHero 資料...");
    
    try {
      const response = await fetch('/api/admin/partner-offers/seed', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'seed' }),
      });

      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.error || '添加失敗');
      }

      toast.success(result.message);
      
      // Refresh data
      window.location.reload();
    } catch (error: any) {
      toast.error("添加失敗：" + error.message);
      setIsSeeding(false);
    }
  };

  // Add bonus item
  const addBonusItem = () => {
    if (bonusItemInput.trim()) {
      setFormData(prev => ({
        ...prev,
        bonusItems: [...(prev.bonusItems || []), bonusItemInput.trim()],
      }));
      setBonusItemInput("");
    }
  };

  // Remove bonus item
  const removeBonusItem = (index: number) => {
    setFormData(prev => ({
      ...prev,
      bonusItems: prev.bonusItems?.filter((_, i) => i !== index) || [],
    }));
  };

  // Add requirement
  const addRequirement = () => {
    if (requirementInput.trim()) {
      setFormData(prev => ({
        ...prev,
        requirements: [...(prev.requirements || []), requirementInput.trim()],
      }));
      setRequirementInput("");
    }
  };

  // Remove requirement
  const removeRequirement = (index: number) => {
    setFormData(prev => ({
      ...prev,
      requirements: prev.requirements?.filter((_, i) => i !== index) || [],
    }));
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" /> 返回
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <Gift className="h-6 w-6 text-amber-500" />
              合作夥伴額外迎新
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              管理經本網指定連結申請的額外獎賞
            </p>
          </div>
        </div>
        
        {/* Global Toggle & Seed Button */}
        <div className="flex items-center gap-3">
          <Button 
            variant="outline"
            size="sm"
            onClick={handleSeedSampleData}
            disabled={isSeeding}
            className="text-purple-600 border-purple-200 hover:bg-purple-50"
          >
            {isSeeding ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-purple-600 mr-1"></div>
                導入中...
              </>
            ) : (
              <>
                <Wand2 className="h-4 w-4 mr-1" />
                導入 MoneyHero 資料
              </>
            )}
          </Button>
          <span className="text-sm text-gray-500">前台顯示：</span>
          <Button 
            variant={globalEnabled ? "default" : "outline"}
            size="sm"
            onClick={handleToggleGlobal}
            className={globalEnabled ? "bg-green-600 hover:bg-green-700" : ""}
          >
            {globalEnabled ? <Check className="h-4 w-4 mr-1" /> : <X className="h-4 w-4 mr-1" />}
            {globalEnabled ? "已啟用" : "已停用"}
          </Button>
        </div>
      </div>

      {/* Warning if disabled */}
      {!globalEnabled && (
        <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4 flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5" />
          <div>
            <p className="font-medium text-amber-800 dark:text-amber-200">前台顯示已停用</p>
            <p className="text-sm text-amber-700 dark:text-amber-300">
              你仍可以編輯額外迎新資料，但用戶不會在信用卡頁面看到。準備好後請點擊「已啟用」按鈕。
            </p>
          </div>
        </div>
      )}

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left: Card List */}
        <div className="lg:col-span-1 space-y-4">
          {/* Stats */}
          <Card>
            <CardContent className="p-4">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-2xl font-bold text-blue-600">{cards.length}</p>
                  <p className="text-xs text-gray-500">全部信用卡</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-amber-600">{cardsWithOffers.length}</p>
                  <p className="text-xs text-gray-500">有額外迎新</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-green-600">{totalClicks}</p>
                  <p className="text-xs text-gray-500">總點擊數</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="搜尋信用卡..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          
          {/* Card List */}
          <div className="bg-white dark:bg-gray-900 rounded-lg border dark:border-gray-800 overflow-hidden max-h-[600px] overflow-y-auto">
            {filteredCards.map((card) => {
              const clicks = getClickCount(card.id);
              return (
                <button
                  key={card.id}
                  onClick={() => handleSelectCard(card.id)}
                  className={`w-full text-left px-4 py-3 border-b dark:border-gray-800 last:border-0 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors ${
                    selectedCardId === card.id ? "bg-blue-50 dark:bg-blue-900/20" : ""
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white text-sm">{card.name}</p>
                      <p className="text-xs text-gray-500">{card.bank}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      {clicks > 0 && (
                        <span className="flex items-center gap-1 px-2 py-0.5 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-xs rounded-full">
                          <MousePointerClick className="h-3 w-3" />
                          {clicks}
                        </span>
                      )}
                      {card.partnerOffer?.enabled && (
                        <span className="px-2 py-0.5 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 text-xs rounded-full">
                          +${card.partnerOffer.bonusValue}
                        </span>
                      )}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right: Edit Form */}
        <div className="lg:col-span-2">
          {selectedCardId ? (
            <Card>
              <CardHeader className="border-b dark:border-gray-800">
                <CardTitle className="flex items-center justify-between">
                  <div>
                    <span>編輯額外迎新：{cards.find(c => c.id === selectedCardId)?.name}</span>
                    {getClickCount(selectedCardId) > 0 && (
                      <div className="flex items-center gap-2 mt-2">
                        <span className="flex items-center gap-1 px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-sm rounded-full">
                          <MousePointerClick className="h-4 w-4" />
                          申請點擊：{getClickCount(selectedCardId)} 次
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={handleDelete} disabled={isSaving}>
                      <Trash2 className="h-4 w-4 mr-1" /> 刪除
                    </Button>
                    <Button size="sm" onClick={handleSave} disabled={isSaving}>
                      <Save className="h-4 w-4 mr-1" /> {isSaving ? "儲存中..." : "儲存"}
                    </Button>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                {/* Enabled Toggle */}
                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">啟用此卡額外迎新</p>
                    <p className="text-sm text-gray-500">關閉後此卡不會顯示額外迎新</p>
                  </div>
                  <Button
                    variant={formData.enabled ? "default" : "outline"}
                    size="sm"
                    onClick={() => setFormData(prev => ({ ...prev, enabled: !prev.enabled }))}
                    className={formData.enabled ? "bg-green-600 hover:bg-green-700" : ""}
                  >
                    {formData.enabled ? "已啟用" : "已停用"}
                  </Button>
                </div>

                {/* Apply URL */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    申請連結 *
                  </label>
                  <Input
                    value={formData.applyUrl}
                    onChange={(e) => setFormData(prev => ({ ...prev, applyUrl: e.target.value }))}
                    placeholder="https://www.moneyhero.com.hk/..."
                  />
                </div>

                {/* Bonus Value & Description */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      額外獎賞價值 (HKD) *
                    </label>
                    <Input
                      type="number"
                      value={formData.bonusValue}
                      onChange={(e) => setFormData(prev => ({ ...prev, bonusValue: parseInt(e.target.value) || 0 }))}
                      placeholder="500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      獎賞描述 *
                    </label>
                    <Input
                      value={formData.bonusDescription}
                      onChange={(e) => setFormData(prev => ({ ...prev, bonusDescription: e.target.value }))}
                      placeholder="$500現金回贈"
                    />
                  </div>
                </div>

                {/* Bonus Items */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    獎賞選項（可選多項）
                  </label>
                  <div className="flex gap-2 mb-2">
                    <Input
                      value={bonusItemInput}
                      onChange={(e) => setBonusItemInput(e.target.value)}
                      placeholder="如：$500現金回贈"
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addBonusItem())}
                    />
                    <Button type="button" onClick={addBonusItem} size="sm">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {formData.bonusItems?.map((item, index) => (
                      <span key={index} className="inline-flex items-center px-3 py-1 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 rounded-full text-sm">
                        {item}
                        <button onClick={() => removeBonusItem(index)} className="ml-2 text-amber-500 hover:text-amber-700">
                          <X className="h-3 w-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Valid Period */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      有效期開始 *
                    </label>
                    <Input
                      type="date"
                      value={formData.validFrom}
                      onChange={(e) => setFormData(prev => ({ ...prev, validFrom: e.target.value }))}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      有效期結束 *
                    </label>
                    <Input
                      type="date"
                      value={formData.validTo}
                      onChange={(e) => setFormData(prev => ({ ...prev, validTo: e.target.value }))}
                    />
                  </div>
                </div>

                {/* Min Spend */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      最低簽賬金額 (HKD)
                    </label>
                    <Input
                      type="number"
                      value={formData.minSpend || 0}
                      onChange={(e) => setFormData(prev => ({ ...prev, minSpend: parseInt(e.target.value) || 0 }))}
                      placeholder="100"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      簽賬期限（天）
                    </label>
                    <Input
                      type="number"
                      value={formData.minSpendDays || 30}
                      onChange={(e) => setFormData(prev => ({ ...prev, minSpendDays: parseInt(e.target.value) || 30 }))}
                      placeholder="30"
                    />
                  </div>
                </div>

                {/* Requirements */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    其他申請要求
                  </label>
                  <div className="flex gap-2 mb-2">
                    <Input
                      value={requirementInput}
                      onChange={(e) => setRequirementInput(e.target.value)}
                      placeholder="如：必須為全新客戶"
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addRequirement())}
                    />
                    <Button type="button" onClick={addRequirement} size="sm">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <ul className="space-y-1">
                    {formData.requirements?.map((req, index) => (
                      <li key={index} className="flex items-center justify-between bg-gray-50 dark:bg-gray-800 px-3 py-2 rounded">
                        <span className="text-sm text-gray-700 dark:text-gray-300">{req}</span>
                        <button onClick={() => removeRequirement(index)} className="text-red-500 hover:text-red-700">
                          <X className="h-4 w-4" />
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Notes */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    其他備註
                  </label>
                  <textarea
                    value={formData.notes || ""}
                    onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                    placeholder="如：連同銀行外幣迎新，簽HK$10,000等值外幣可賺合共$1,500"
                    className="w-full min-h-[80px] rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-sm"
                  />
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="p-12 text-center">
                <Gift className="h-12 w-12 mx-auto text-gray-300 dark:text-gray-600 mb-4" />
                <p className="text-gray-500 dark:text-gray-400">請從左側選擇一張信用卡以編輯額外迎新資料</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

