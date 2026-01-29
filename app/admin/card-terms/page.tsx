"use client";

import { useState, useMemo } from "react";
import { cardTerms, isTermsExpired, isTermsExpiringSoon } from "@/lib/data/card-terms";
import { HK_CARDS } from "@/lib/data/cards";
import { ExternalLink, FileText, AlertTriangle, CheckCircle, Clock, Plus, X, Copy, Sparkles, Loader2 } from "lucide-react";
import { toast } from "sonner";

type FilterStatus = "all" | "active" | "expiring" | "expired";

export default function CardTermsAdminPage() {
  const [filterStatus, setFilterStatus] = useState<FilterStatus>("all");
  const [filterBank, setFilterBank] = useState<string>("all");
  const [sortBy, setSortBy] = useState<"expiry" | "bank" | "updated">("expiry");
  
  // New terms form state
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    bankName: "",
    promoName: "",
    cardIds: [] as string[],
    sourceUrl: "",
    termsContent: "",
  });
  const [isParsing, setIsParsing] = useState(false);
  const [parsedResult, setParsedResult] = useState<{
    parsed: any;
    code: string;
  } | null>(null);

  // 獲取所有銀行
  const banks = useMemo(() => {
    const bankSet = new Set(cardTerms.map(t => t.bank));
    return Array.from(bankSet).sort();
  }, []);

  // 獲取所有卡片（用於選擇適用卡片）
  const allCards = useMemo(() => {
    return HK_CARDS.map(c => ({
      id: c.id,
      name: c.name,
      bank: c.bank,
    })).sort((a, b) => a.bank.localeCompare(b.bank));
  }, []);

  // 計算狀態
  const getStatus = (terms: typeof cardTerms[0]) => {
    if (isTermsExpired(terms, 0)) return "expired";
    if (isTermsExpiringSoon(terms, 30)) return "expiring";
    return "active";
  };

  // 計算剩餘天數
  const getDaysRemaining = (endDate?: string) => {
    if (!endDate) return null;
    const end = new Date(endDate);
    const now = new Date();
    const diff = Math.ceil((end.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    return diff;
  };

  // 從 URL 提取檔案名
  const getDocumentName = (terms: typeof cardTerms[0]) => {
    if (terms.documentName) return terms.documentName;
    if (!terms.officialSource) return "未提供";
    
    try {
      const url = new URL(terms.officialSource);
      const path = url.pathname;
      const filename = path.split('/').pop() || path;
      return filename.replace(/\.(pdf|html|htm)$/i, '').replace(/-/g, ' ');
    } catch {
      return terms.officialSource;
    }
  };

  // 過濾和排序
  const filteredTerms = useMemo(() => {
    let result = [...cardTerms];

    if (filterStatus !== "all") {
      result = result.filter(t => getStatus(t) === filterStatus);
    }

    if (filterBank !== "all") {
      result = result.filter(t => t.bank === filterBank);
    }

    result.sort((a, b) => {
      if (sortBy === "expiry") {
        const daysA = getDaysRemaining(a.promoEndDate) ?? Infinity;
        const daysB = getDaysRemaining(b.promoEndDate) ?? Infinity;
        return daysA - daysB;
      }
      if (sortBy === "bank") {
        return a.bank.localeCompare(b.bank);
      }
      if (sortBy === "updated") {
        return new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime();
      }
      return 0;
    });

    return result;
  }, [filterStatus, filterBank, sortBy]);

  // 統計
  const stats = useMemo(() => {
    const expired = cardTerms.filter(t => getStatus(t) === "expired").length;
    const expiring = cardTerms.filter(t => getStatus(t) === "expiring").length;
    const active = cardTerms.filter(t => getStatus(t) === "active").length;
    const multiCard = cardTerms.filter(t => t.applicableCards && t.applicableCards.length > 0).length;
    return { expired, expiring, active, total: cardTerms.length, multiCard };
  }, []);

  // 解析條款
  const handleParseTerms = async () => {
    if (!formData.termsContent.trim()) {
      toast.error("請輸入條款內容");
      return;
    }

    setIsParsing(true);
    try {
      const res = await fetch("/api/admin/parse-terms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: formData.termsContent,
          bankName: formData.bankName,
          promoName: formData.promoName,
          cardIds: formData.cardIds,
          sourceUrl: formData.sourceUrl,
        }),
      });

      if (!res.ok) {
        throw new Error("解析失敗");
      }

      const data = await res.json();
      setParsedResult(data);
      toast.success("條款解析完成！");
    } catch (error) {
      console.error("Parse error:", error);
      toast.error("解析條款時發生錯誤");
    } finally {
      setIsParsing(false);
    }
  };

  // 複製代碼
  const handleCopyCode = () => {
    if (parsedResult?.code) {
      navigator.clipboard.writeText(parsedResult.code);
      toast.success("已複製代碼到剪貼簿！");
    }
  };

  // 重置表單
  const resetForm = () => {
    setFormData({
      bankName: "",
      promoName: "",
      cardIds: [],
      sourceUrl: "",
      termsContent: "",
    });
    setParsedResult(null);
  };

  // 切換卡片選擇
  const toggleCardSelection = (cardId: string) => {
    setFormData(prev => ({
      ...prev,
      cardIds: prev.cardIds.includes(cardId)
        ? prev.cardIds.filter(id => id !== cardId)
        : [...prev.cardIds, cardId],
    }));
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <FileText className="h-6 w-6" />
          條款管理
        </h1>
        <button
          onClick={() => { setShowAddForm(true); resetForm(); }}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="h-4 w-4" />
          新增條款
        </button>
      </div>

      {/* 新增條款表單 Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4 flex items-center justify-between">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-yellow-500" />
                新增條款（AI 輔助解析）
              </h2>
              <button
                onClick={() => setShowAddForm(false)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* 基本資訊 */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">銀行/發卡機構 *</label>
                  <select
                    value={formData.bankName}
                    onChange={(e) => setFormData(prev => ({ ...prev, bankName: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700"
                  >
                    <option value="">選擇銀行...</option>
                    <option value="美國運通">美國運通</option>
                    <option value="滙豐">滙豐</option>
                    <option value="渣打">渣打</option>
                    <option value="恒生">恒生</option>
                    <option value="中銀">中銀</option>
                    <option value="東亞">東亞</option>
                    <option value="花旗">花旗</option>
                    <option value="信銀國際">信銀國際</option>
                    <option value="建行">建行</option>
                    <option value="大新">大新</option>
                    <option value="富邦">富邦</option>
                    <option value="星展">星展</option>
                    <option value="AEON">AEON</option>
                    <option value="安信">安信</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">優惠名稱 *</label>
                  <input
                    type="text"
                    value={formData.promoName}
                    onChange={(e) => setFormData(prev => ({ ...prev, promoName: e.target.value }))}
                    placeholder="例如：日本 Donki 優惠 2026"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">條款 PDF/URL</label>
                <input
                  type="url"
                  value={formData.sourceUrl}
                  onChange={(e) => setFormData(prev => ({ ...prev, sourceUrl: e.target.value }))}
                  placeholder="https://..."
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700"
                />
              </div>

              {/* 適用卡片選擇 */}
              <div>
                <label className="block text-sm font-medium mb-2">適用信用卡（可多選）</label>
                <div className="border border-gray-300 dark:border-gray-600 rounded-lg p-3 max-h-40 overflow-y-auto">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {allCards.filter(c => !formData.bankName || c.bank.includes(formData.bankName)).map(card => (
                      <label
                        key={card.id}
                        className={`flex items-center gap-2 p-2 rounded cursor-pointer text-sm ${
                          formData.cardIds.includes(card.id)
                            ? "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
                            : "hover:bg-gray-100 dark:hover:bg-gray-700"
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={formData.cardIds.includes(card.id)}
                          onChange={() => toggleCardSelection(card.id)}
                          className="rounded"
                        />
                        <span className="truncate">{card.name}</span>
                      </label>
                    ))}
                  </div>
                </div>
                {formData.cardIds.length > 0 && (
                  <div className="mt-2 text-sm text-gray-500">
                    已選擇 {formData.cardIds.length} 張卡片
                  </div>
                )}
              </div>

              {/* 條款內容輸入 */}
              <div>
                <label className="block text-sm font-medium mb-1">條款內容（從 PDF 複製貼上）*</label>
                <textarea
                  value={formData.termsContent}
                  onChange={(e) => setFormData(prev => ({ ...prev, termsContent: e.target.value }))}
                  placeholder="從條款 PDF 複製內容貼上這裡，AI 會自動解析：&#10;&#10;- 優惠期&#10;- 回贈上限&#10;- 不適用項目&#10;- 重要條款"
                  rows={10}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 font-mono text-sm"
                />
              </div>

              {/* 解析按鈕 */}
              <div className="flex justify-center">
                <button
                  onClick={handleParseTerms}
                  disabled={isParsing || !formData.termsContent.trim()}
                  className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  {isParsing ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      解析中...
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-5 w-5" />
                      AI 解析條款
                    </>
                  )}
                </button>
              </div>

              {/* 解析結果 */}
              {parsedResult && (
                <div className="space-y-4">
                  <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                    <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      解析結果
                    </h3>
                    
                    {/* 解析的資料預覽 */}
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3">
                        <div className="text-sm text-gray-500 mb-1">Card ID</div>
                        <div className="font-mono text-sm">{parsedResult.parsed.cardId || "未能解析"}</div>
                      </div>
                      <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3">
                        <div className="text-sm text-gray-500 mb-1">推廣期</div>
                        <div className="font-mono text-sm">
                          {parsedResult.parsed.promoStartDate || "?"} ~ {parsedResult.parsed.promoEndDate || "?"}
                        </div>
                      </div>
                      {parsedResult.parsed.rewardCap && (
                        <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3">
                          <div className="text-sm text-gray-500 mb-1">回贈上限</div>
                          <div className="font-mono text-sm">
                            ${parsedResult.parsed.rewardCap.amount} / {parsedResult.parsed.rewardCap.period}
                          </div>
                        </div>
                      )}
                      {parsedResult.parsed.exclusions.length > 0 && (
                        <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3">
                          <div className="text-sm text-gray-500 mb-1">排除項目</div>
                          <div className="text-sm">{parsedResult.parsed.exclusions.length} 項</div>
                        </div>
                      )}
                    </div>

                    {/* 生成的代碼 */}
                    <div className="relative">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">生成的 TypeScript 代碼</span>
                        <button
                          onClick={handleCopyCode}
                          className="flex items-center gap-1 px-3 py-1 text-sm bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors"
                        >
                          <Copy className="h-4 w-4" />
                          複製代碼
                        </button>
                      </div>
                      <pre className="bg-gray-900 text-gray-100 rounded-lg p-4 overflow-x-auto text-sm font-mono max-h-80 overflow-y-auto">
                        {parsedResult.code}
                      </pre>
                    </div>

                    {/* 使用說明 */}
                    <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4 mt-4">
                      <h4 className="font-medium text-amber-800 dark:text-amber-300 mb-2">📝 下一步</h4>
                      <ol className="text-sm text-amber-700 dark:text-amber-400 space-y-1 list-decimal list-inside">
                        <li>點擊「複製代碼」按鈕</li>
                        <li>打開 <code className="bg-amber-100 dark:bg-amber-900 px-1 rounded">lib/data/card-terms.ts</code></li>
                        <li>在 <code className="bg-amber-100 dark:bg-amber-900 px-1 rounded">];</code> 前面貼上代碼</li>
                        <li>檢查並修改解析可能不準確的地方</li>
                        <li>確保 <code className="bg-amber-100 dark:bg-amber-900 px-1 rounded">applicableCards</code> 的 cardName 正確</li>
                      </ol>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 統計卡片 */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
          <div className="text-2xl font-bold">{stats.total}</div>
          <div className="text-sm text-gray-500">總條款</div>
        </div>
        <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border border-green-200 dark:border-green-800">
          <div className="text-2xl font-bold text-green-600">{stats.active}</div>
          <div className="text-sm text-green-600">有效</div>
        </div>
        <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4 border border-yellow-200 dark:border-yellow-800">
          <div className="text-2xl font-bold text-yellow-600">{stats.expiring}</div>
          <div className="text-sm text-yellow-600">快到期（30天內）</div>
        </div>
        <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4 border border-red-200 dark:border-red-800">
          <div className="text-2xl font-bold text-red-600">{stats.expired}</div>
          <div className="text-sm text-red-600">已到期</div>
        </div>
        <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4 border border-purple-200 dark:border-purple-800">
          <div className="text-2xl font-bold text-purple-600">{stats.multiCard}</div>
          <div className="text-sm text-purple-600">多卡條款</div>
        </div>
      </div>

      {/* 過濾器 */}
      <div className="flex flex-wrap gap-4 mb-6">
        <div className="flex gap-2">
          {(["all", "active", "expiring", "expired"] as FilterStatus[]).map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                filterStatus === status
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
            >
              {status === "all" && "全部"}
              {status === "active" && "🟢 有效"}
              {status === "expiring" && `🟡 快到期 (${stats.expiring})`}
              {status === "expired" && `🔴 已到期 (${stats.expired})`}
            </button>
          ))}
        </div>

        <select
          value={filterBank}
          onChange={(e) => setFilterBank(e.target.value)}
          className="px-3 py-1.5 rounded-lg text-sm border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
        >
          <option value="all">所有銀行</option>
          {banks.map((bank) => (
            <option key={bank} value={bank}>{bank}</option>
          ))}
        </select>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
          className="px-3 py-1.5 rounded-lg text-sm border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
        >
          <option value="expiry">按到期日排序</option>
          <option value="bank">按銀行排序</option>
          <option value="updated">按更新日期排序</option>
        </select>
      </div>

      {/* 條款表格 */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-900">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">卡片</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">條款名稱</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">推廣期</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">狀態</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">更新日期</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredTerms.map((terms) => {
                const status = getStatus(terms);
                const daysRemaining = getDaysRemaining(terms.promoEndDate);
                
                return (
                  <tr 
                    key={terms.cardId}
                    className={`
                      ${status === "expired" ? "bg-red-50 dark:bg-red-900/10" : ""}
                      ${status === "expiring" ? "bg-yellow-50 dark:bg-yellow-900/10" : ""}
                    `}
                  >
                    <td className="px-4 py-3">
                      <div className="font-medium text-gray-900 dark:text-white">{terms.cardName}</div>
                      <div className="text-sm text-gray-500">{terms.bank}</div>
                      {terms.applicableCards && terms.applicableCards.length > 0 && (
                        <div className="mt-1 flex flex-wrap gap-1">
                          {terms.applicableCards.map((card, idx) => (
                            <span 
                              key={idx}
                              className="inline-flex items-center px-1.5 py-0.5 rounded text-xs bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400"
                              title={card.note || card.cardName}
                            >
                              {card.cardName}
                              {card.note && <span className="ml-0.5 text-purple-500">*</span>}
                            </span>
                          ))}
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <div className="text-sm text-gray-900 dark:text-white max-w-xs truncate" title={getDocumentName(terms)}>
                        {getDocumentName(terms)}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-500">
                      {terms.promoStartDate && terms.promoEndDate ? (
                        <div>
                          <div>{terms.promoStartDate.replace(/-/g, '/')}</div>
                          <div>~ {terms.promoEndDate.replace(/-/g, '/')}</div>
                        </div>
                      ) : terms.promoEndDate ? (
                        <div>至 {terms.promoEndDate.replace(/-/g, '/')}</div>
                      ) : (
                        <span className="text-gray-400">無期限</span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      {status === "active" && (
                        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                          <CheckCircle className="h-3 w-3" />
                          有效
                        </span>
                      )}
                      {status === "expiring" && (
                        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400">
                          <Clock className="h-3 w-3" />
                          {daysRemaining}天
                        </span>
                      )}
                      {status === "expired" && (
                        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400">
                          <AlertTriangle className="h-3 w-3" />
                          已到期
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-500">
                      {terms.lastUpdated}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        {terms.officialSource && (
                          <a
                            href={terms.officialSource}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium bg-blue-100 text-blue-700 hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:hover:bg-blue-900/50 transition-colors"
                            title="查看官方文件"
                          >
                            <ExternalLink className="h-3 w-3" />
                            文件
                          </a>
                        )}
                        <a
                          href={`/cards/${terms.cardId.replace(/-welcome.*$/, '').replace(/-travel-guru$/, '-vs')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 transition-colors"
                          title="查看卡片頁面"
                        >
                          卡片
                        </a>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {filteredTerms.length === 0 && (
          <div className="p-8 text-center text-gray-500">
            沒有符合條件的條款
          </div>
        )}
      </div>

      {/* 提示 */}
      <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
        <h3 className="font-medium text-blue-800 dark:text-blue-400 mb-2">💡 使用提示</h3>
        <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
          <li>• 點擊「<strong>新增條款</strong>」按鈕開始加入新條款</li>
          <li>• 從官方條款 PDF 複製內容，AI 會自動解析關鍵資訊</li>
          <li>• 🟡 快到期（30天內）：需要開始尋找新條款</li>
          <li>• 🔴 已到期：需要更新或移除</li>
          <li>• <span className="inline-flex items-center px-1.5 py-0.5 rounded text-xs bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400">紫色標籤</span> 表示此條款適用於多張卡片</li>
        </ul>
      </div>
    </div>
  );
}
