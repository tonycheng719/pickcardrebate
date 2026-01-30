"use client";

import { useState, useEffect, useMemo } from "react";
import { createClient } from "@/lib/supabase/client";
import { HK_CARDS } from "@/lib/data/cards";
import { PROMOS } from "@/lib/data/promos";
import { 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  RefreshCw,
  Database,
  FileText,
  CreditCard,
  Settings,
  ArrowRight,
  ChevronDown,
  ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Link from "next/link";

interface ValidationResult {
  cardId: string;
  cardName: string;
  issues: ValidationIssue[];
  status: "ok" | "warning" | "error";
}

interface ValidationIssue {
  type: "missing" | "mismatch" | "extra";
  field: string;
  localValue?: any;
  dbValue?: any;
  severity: "low" | "medium" | "high";
}

export default function ValidatePage() {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<ValidationResult[]>([]);
  const [summary, setSummary] = useState<{
    total: number;
    ok: number;
    warning: number;
    error: number;
  } | null>(null);
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  const [filter, setFilter] = useState<"all" | "issues">("all");

  const runValidation = async () => {
    setLoading(true);
    setResults([]);
    setSummary(null);

    try {
      const supabase = createClient();
      
      // Fetch all DB data
      const [cardsRes, rulesRes, notesRes] = await Promise.all([
        supabase.from("db_cards").select("*"),
        supabase.from("db_card_rules").select("*"),
        supabase.from("db_card_notes").select("*"),
      ]);

      if (cardsRes.error) throw cardsRes.error;
      
      const dbCards = cardsRes.data || [];
      const dbRules = rulesRes.data || [];
      const dbNotes = notesRes.data || [];

      // Index DB data
      const dbCardMap = new Map<string, any>(dbCards.map((c: any) => [c.id, c]));
      const dbRulesByCard = new Map<string, any[]>();
      const dbNotesByCard = new Map<string, any[]>();
      
      dbRules.forEach((r: any) => {
        if (!dbRulesByCard.has(r.card_id)) dbRulesByCard.set(r.card_id, []);
        dbRulesByCard.get(r.card_id)!.push(r);
      });
      
      dbNotes.forEach((n: any) => {
        if (!dbNotesByCard.has(n.card_id)) dbNotesByCard.set(n.card_id, []);
        dbNotesByCard.get(n.card_id)!.push(n);
      });

      const validationResults: ValidationResult[] = [];

      // Validate each local card
      for (const localCard of HK_CARDS) {
        const issues: ValidationIssue[] = [];
        const dbCard = dbCardMap.get(localCard.id);

        if (!dbCard) {
          issues.push({
            type: "missing",
            field: "card",
            localValue: localCard.name,
            severity: "high",
          });
        } else {
          // Check basic fields
          if (localCard.name !== dbCard.name) {
            issues.push({
              type: "mismatch",
              field: "name",
              localValue: localCard.name,
              dbValue: dbCard.name,
              severity: "medium",
            });
          }
          
          if (localCard.bank !== dbCard.bank) {
            issues.push({
              type: "mismatch",
              field: "bank",
              localValue: localCard.bank,
              dbValue: dbCard.bank,
              severity: "medium",
            });
          }

          // Check rules count
          const localRulesCount = localCard.rules?.length || 0;
          const dbRulesCount = dbRulesByCard.get(localCard.id)?.length || 0;
          
          if (localRulesCount !== dbRulesCount) {
            issues.push({
              type: "mismatch",
              field: "rules count",
              localValue: localRulesCount,
              dbValue: dbRulesCount,
              severity: localRulesCount > dbRulesCount ? "high" : "low",
            });
          }

          // Check note
          const localNote = localCard.note || "";
          const dbNotesList = dbNotesByCard.get(localCard.id) || [];
          const dbNote = dbNotesList.map(n => n.content).join("\n\n");
          
          if (localNote && !dbNote) {
            issues.push({
              type: "missing",
              field: "note",
              localValue: localNote.slice(0, 50) + "...",
              severity: "medium",
            });
          }
        }

        // Determine status
        let status: "ok" | "warning" | "error" = "ok";
        if (issues.some(i => i.severity === "high")) status = "error";
        else if (issues.length > 0) status = "warning";

        validationResults.push({
          cardId: localCard.id,
          cardName: localCard.name,
          issues,
          status,
        });
      }

      // Check for extra cards in DB that are not in local
      const localCardIds = new Set(HK_CARDS.map(c => c.id));
      dbCards.forEach(dbCard => {
        if (!localCardIds.has(dbCard.id)) {
          validationResults.push({
            cardId: dbCard.id,
            cardName: dbCard.name,
            issues: [{
              type: "extra",
              field: "card",
              dbValue: dbCard.name,
              severity: "low",
            }],
            status: "warning",
          });
        }
      });

      // Calculate summary
      const ok = validationResults.filter(r => r.status === "ok").length;
      const warning = validationResults.filter(r => r.status === "warning").length;
      const error = validationResults.filter(r => r.status === "error").length;

      setResults(validationResults);
      setSummary({
        total: validationResults.length,
        ok,
        warning,
        error,
      });

      toast.success(`驗證完成！${ok} 正常, ${warning} 警告, ${error} 錯誤`);

    } catch (error) {
      console.error("Validation error:", error);
      toast.error("驗證失敗");
    } finally {
      setLoading(false);
    }
  };

  const filteredResults = useMemo(() => {
    if (filter === "all") return results;
    return results.filter(r => r.status !== "ok");
  }, [results, filter]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Link href="/admin/database" className="text-gray-500 hover:text-gray-700">
              ← 返回
            </Link>
            <Database className="h-8 w-8 text-blue-600" />
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">數據一致性驗證</h1>
              <p className="text-sm text-gray-500">比較本地 cards.ts 與資料庫數據</p>
            </div>
          </div>
          <Button onClick={runValidation} disabled={loading}>
            <RefreshCw className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`} />
            {loading ? "驗證中..." : "開始驗證"}
          </Button>
        </div>

        {/* Summary */}
        {summary && (
          <div className="grid grid-cols-4 gap-4 mb-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700">
              <p className="text-sm text-gray-500">總卡片</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{summary.total}</p>
            </div>
            <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-4 shadow-sm border border-green-200 dark:border-green-800">
              <p className="text-sm text-green-600">正常</p>
              <p className="text-2xl font-bold text-green-600">{summary.ok}</p>
            </div>
            <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-xl p-4 shadow-sm border border-yellow-200 dark:border-yellow-800">
              <p className="text-sm text-yellow-600">警告</p>
              <p className="text-2xl font-bold text-yellow-600">{summary.warning}</p>
            </div>
            <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-4 shadow-sm border border-red-200 dark:border-red-800">
              <p className="text-sm text-red-600">錯誤</p>
              <p className="text-2xl font-bold text-red-600">{summary.error}</p>
            </div>
          </div>
        )}

        {/* Filter */}
        {results.length > 0 && (
          <div className="flex gap-2 mb-4">
            <Button
              variant={filter === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("all")}
            >
              全部 ({results.length})
            </Button>
            <Button
              variant={filter === "issues" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("issues")}
            >
              有問題 ({results.filter(r => r.status !== "ok").length})
            </Button>
          </div>
        )}

        {/* Results */}
        <div className="space-y-2">
          {loading && (
            <div className="text-center py-12">
              <RefreshCw className="h-8 w-8 text-gray-400 animate-spin mx-auto mb-4" />
              <p className="text-gray-500">驗證中...</p>
            </div>
          )}
          
          {!loading && results.length === 0 && (
            <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-xl">
              <Database className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">點擊「開始驗證」以比較數據</p>
            </div>
          )}

          {filteredResults.map(result => (
            <div 
              key={result.cardId}
              className={`bg-white dark:bg-gray-800 rounded-lg shadow-sm border overflow-hidden ${
                result.status === "ok" ? "border-green-200 dark:border-green-800" :
                result.status === "warning" ? "border-yellow-200 dark:border-yellow-800" :
                "border-red-200 dark:border-red-800"
              }`}
            >
              <div
                className="p-3 flex items-center justify-between cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-750"
                onClick={() => setExpandedCard(expandedCard === result.cardId ? null : result.cardId)}
              >
                <div className="flex items-center gap-3">
                  {result.status === "ok" ? (
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                  ) : result.status === "warning" ? (
                    <AlertTriangle className="h-5 w-5 text-yellow-500" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-500" />
                  )}
                  <div>
                    <span className="font-medium text-gray-900 dark:text-white">{result.cardName}</span>
                    <span className="text-sm text-gray-500 ml-2">{result.cardId}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {result.issues.length > 0 && (
                    <span className="text-sm text-gray-500">{result.issues.length} 問題</span>
                  )}
                  {expandedCard === result.cardId ? (
                    <ChevronDown className="h-4 w-4 text-gray-400" />
                  ) : (
                    <ChevronRight className="h-4 w-4 text-gray-400" />
                  )}
                </div>
              </div>

              {expandedCard === result.cardId && result.issues.length > 0 && (
                <div className="border-t border-gray-200 dark:border-gray-700 p-4 bg-gray-50 dark:bg-gray-850">
                  <ul className="space-y-2 text-sm">
                    {result.issues.map((issue, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className={`px-2 py-0.5 rounded text-xs ${
                          issue.severity === "high" ? "bg-red-100 text-red-700" :
                          issue.severity === "medium" ? "bg-yellow-100 text-yellow-700" :
                          "bg-gray-100 text-gray-700"
                        }`}>
                          {issue.type === "missing" && "缺失"}
                          {issue.type === "mismatch" && "不一致"}
                          {issue.type === "extra" && "多餘"}
                        </span>
                        <span className="text-gray-700 dark:text-gray-300">
                          <strong>{issue.field}:</strong>{" "}
                          {issue.localValue && `本地="${issue.localValue}"`}
                          {issue.localValue && issue.dbValue && " → "}
                          {issue.dbValue && `DB="${issue.dbValue}"`}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Actions */}
        {summary && summary.error + summary.warning > 0 && (
          <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
            <h3 className="font-medium text-blue-900 dark:text-blue-100 mb-2">修復建議</h3>
            <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
              <li>• 如果本地有新增/修改的卡片，請到「數據庫管理」重新匯入</li>
              <li>• 「缺失」問題表示 DB 缺少本地的數據</li>
              <li>• 「不一致」問題表示本地和 DB 的值不同</li>
              <li>• 「多餘」問題表示 DB 有本地沒有的數據（通常無害）</li>
            </ul>
            <div className="mt-4">
              <Link href="/admin/database">
                <Button size="sm">
                  <ArrowRight className="h-4 w-4 mr-2" />
                  前往數據庫管理
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

