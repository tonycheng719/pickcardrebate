"use client";

import { useState, useMemo } from "react";
import { cardTerms, isTermsExpired, isTermsExpiringSoon, formatPeriod } from "@/lib/data/card-terms";
import { ExternalLink, FileText, AlertTriangle, CheckCircle, Clock } from "lucide-react";

type FilterStatus = "all" | "active" | "expiring" | "expired";

export default function CardTermsAdminPage() {
  const [filterStatus, setFilterStatus] = useState<FilterStatus>("all");
  const [filterBank, setFilterBank] = useState<string>("all");
  const [sortBy, setSortBy] = useState<"expiry" | "bank" | "updated">("expiry");

  // 獲取所有銀行
  const banks = useMemo(() => {
    const bankSet = new Set(cardTerms.map(t => t.bank));
    return Array.from(bankSet).sort();
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
      // 移除 .pdf 等副檔名
      return filename.replace(/\.(pdf|html|htm)$/i, '').replace(/-/g, ' ');
    } catch {
      return terms.officialSource;
    }
  };

  // 過濾和排序
  const filteredTerms = useMemo(() => {
    let result = [...cardTerms];

    // 過濾狀態
    if (filterStatus !== "all") {
      result = result.filter(t => getStatus(t) === filterStatus);
    }

    // 過濾銀行
    if (filterBank !== "all") {
      result = result.filter(t => t.bank === filterBank);
    }

    // 排序
    result.sort((a, b) => {
      if (sortBy === "expiry") {
        const daysA = getDaysRemaining(a.promoEndDate) ?? Infinity;
        const daysB = getDaysRemaining(b.promoEndDate) ?? Infinity;
        return daysA - daysB; // 快到期的排前面
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
    return { expired, expiring, active, total: cardTerms.length };
  }, []);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <FileText className="h-6 w-6" />
        條款管理
      </h1>

      {/* 統計卡片 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
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
          <li>• 🟡 快到期（30天內）：需要開始尋找新條款</li>
          <li>• 🔴 已到期：需要更新或移除</li>
          <li>• 點擊「文件」可直接打開官方條款 PDF</li>
          <li>• 條款數據位於 <code className="bg-blue-100 dark:bg-blue-900 px-1 rounded">lib/data/card-terms.ts</code></li>
        </ul>
      </div>
    </div>
  );
}

