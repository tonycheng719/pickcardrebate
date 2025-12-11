"use client";

import { useEffect, useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, X, Info, Loader2, Trash2, AlertTriangle, Edit, CheckCircle2, Lightbulb, ExternalLink, Filter, Plane, MessageSquare, Reply } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

interface Report {
  id: string;
  merchant_name: string;
  card_id: string;
  payment_method: string;
  amount?: number;
  actual_rate: number;
  comment: string;
  status: "pending" | "verified" | "rejected";
  created_at: string;
  user_id: string;
  user_name?: string; // 會員名稱
  report_type?: string;
  conditions?: string[];
  evidence_url?: string;
}

export default function AdminModerationPage() {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [activeTab, setActiveTab] = useState("pending");
  const router = useRouter();
  const supabase = createClient();

  const fetchReports = async () => {
    setLoading(true);
    setErrorMsg(null);

    try {
        const response = await fetch("/api/admin/moderation");
        if (!response.ok) {
            throw new Error(`API Error: ${response.statusText}`);
        }
        const data = await response.json();
        setReports(data as Report[]);
    } catch (err: any) {
        console.error("Fetch reports exception:", err);
        setErrorMsg(err.message || "載入失敗");
        toast.error("載入回報失敗: " + (err.message || "未知錯誤"));
    } finally {
        setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const updateReportStatus = async (id: string, status: "verified" | "rejected") => {
    // Optimistic update
    setReports(prev => prev.map(r => r.id === id ? { ...r, status } : r));
    
    try {
        const response = await fetch("/api/admin/moderation", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id, status }),
        });

        if (!response.ok) {
            throw new Error("Failed to update status");
        }
        
        toast.success(status === "verified" ? "已通過回報" : "已拒絕回報");
        setSelectedIds(prev => {
            const newSet = new Set(prev);
            newSet.delete(id);
            return newSet;
        });
    } catch (error) {
        console.error("Update error:", error);
        toast.error("更新狀態失敗，請重試");
        fetchReports(); // Revert on error
    }
  };

  const batchUpdateStatus = async (status: "verified" | "rejected") => {
      if (selectedIds.size === 0) return;
      const ids = Array.from(selectedIds);
      
      // Optimistic update
      setReports(prev => prev.map(r => ids.includes(r.id) ? { ...r, status } : r));
      setSelectedIds(new Set());

      try {
          // Process one by one for now as API handles single update (or could improve API to handle batch)
          // For simplicity, we'll just loop fetch calls or Promise.all
          await Promise.all(ids.map(id => 
             fetch("/api/admin/moderation", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id, status }),
             })
          ));

          toast.success(`已批量更新 ${ids.length} 個回報`);
      } catch (error) {
          toast.error("批量更新部分失敗");
          fetchReports();
      }
  };

  const deleteReport = async (id: string) => {
      if (!confirm("確定要刪除此回報嗎？")) return;
      setReports(prev => prev.filter(r => r.id !== id));
      
      try {
          const response = await fetch("/api/admin/moderation", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id, action: "delete" }),
        });

        if (!response.ok) throw new Error("Delete failed");
        toast.success("已刪除");
    } catch (error) {
        toast.error("刪除失敗");
        fetchReports();
    }
  };

  // New: Reply to Report (Admin Response)
  const [replyDialogOpen, setReplyDialogOpen] = useState(false);
  const [replyContent, setReplyContent] = useState("");
  const [replyTargetId, setReplyTargetId] = useState<string | null>(null);
  const [isSubmittingReply, setIsSubmittingReply] = useState(false);

  const handleReplyOpen = (id: string) => {
      setReplyTargetId(id);
      setReplyContent(""); // Reset or fetch existing? For now fresh reply.
      setReplyDialogOpen(true);
  };

  const handleReplySubmit = async () => {
      if (!replyTargetId || !replyContent.trim()) return;
      
      setIsSubmittingReply(true);
      try {
          const response = await fetch("/api/reviews/reply", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ 
                  reviewId: replyTargetId, 
                  content: replyContent,
                  isAdminReply: true 
              }),
          });

          if (!response.ok) throw new Error("Reply failed");
          
          toast.success("回應已發送");
          setReplyDialogOpen(false);
          // Optionally mark as verified if responding?
          // updateReportStatus(replyTargetId, "verified"); 
      } catch (error) {
          console.error(error);
          toast.error("發送回應失敗");
      } finally {
          setIsSubmittingReply(false);
      }
  };

  const handleQuickEdit = (cardId: string) => {
      if (!cardId || cardId === 'unknown') return toast.error("無法辨識卡片 ID");
      router.push(`/admin/cards/new?id=${cardId}`);
  };

  const toggleSelection = (id: string) => {
      setSelectedIds(prev => {
          const newSet = new Set(prev);
          if (newSet.has(id)) {
              newSet.delete(id);
          } else {
              newSet.add(id);
          }
          return newSet;
      });
  };

  const toggleAll = (filteredReports: Report[]) => {
      if (selectedIds.size === filteredReports.length && filteredReports.length > 0) {
          setSelectedIds(new Set());
      } else {
          setSelectedIds(new Set(filteredReports.map(r => r.id)));
      }
  };

  // Helper to render report type badge
  const ReportTypeBadge = ({ type }: { type?: string }) => {
      if (type === 'verification') {
          return <span className="flex items-center gap-1 text-green-600 bg-green-50 dark:bg-green-900/20 px-2 py-0.5 rounded text-xs border border-green-200 dark:border-green-800"><CheckCircle2 className="w-3 h-3" /> 回報成功</span>;
      }
      if (type === 'discovery') {
          return <span className="flex items-center gap-1 text-blue-600 bg-blue-50 dark:bg-blue-900/20 px-2 py-0.5 rounded text-xs border border-blue-200 dark:border-blue-800"><Lightbulb className="w-3 h-3" /> 新發現</span>;
      }
      if (type === 'miles_error') {
          return <span className="flex items-center gap-1 text-purple-600 bg-purple-50 dark:bg-purple-900/20 px-2 py-0.5 rounded text-xs border border-purple-200 dark:border-purple-800"><Plane className="w-3 h-3" /> 里數錯誤</span>;
      }
      return <span className="flex items-center gap-1 text-red-600 bg-red-50 dark:bg-red-900/20 px-2 py-0.5 rounded text-xs border border-red-200 dark:border-red-800"><AlertTriangle className="w-3 h-3" /> 計算錯誤</span>;
  };

  // Helper for condition tags
  const ConditionTags = ({ conditions }: { conditions?: string[] }) => {
      if (!conditions || conditions.length === 0) return null;
      const labels: Record<string, string> = {
          'must_register': '需登記',
          'min_spend': '最低簽賬',
          'promo_period': '限時推廣',
          'weekend_only': '指定日子',
          'targeted': '特選客戶'
      };
      return (
          <div className="flex flex-wrap gap-1 mt-2">
              {conditions.map(c => (
                  <span key={c} className="text-xs px-2 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded border border-gray-200 dark:border-gray-600">
                      {labels[c] || c}
                  </span>
              ))}
          </div>
      );
  };

  const pending = reports.filter((r) => r.status === "pending");
  
  const filteredReports = useMemo(() => {
      if (activeTab === "all") return reports;
      return reports.filter(r => r.status === activeTab);
  }, [reports, activeTab]);

  if (loading) {
      return (
          <div className="flex flex-col items-center justify-center h-96 gap-4">
              <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
              <p className="text-gray-500">正在載入回報資料...</p>
          </div>
      );
  }

  if (errorMsg) {
      return (
          <div className="flex flex-col items-center justify-center h-96 gap-4">
              <AlertTriangle className="h-12 w-12 text-red-500" />
              <h3 className="text-lg font-medium">載入失敗</h3>
              <p className="text-gray-500">{errorMsg}</p>
              <Button onClick={fetchReports}>重試</Button>
          </div>
      );
  }

  return (
    <div className="space-y-6 pb-20">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">回報審核 (Community)</h1>
          <p className="text-gray-500 dark:text-gray-400">目前有 {pending.length} 個回報待處理。</p>
        </div>
        <div className="flex gap-2">
             <Button variant="outline" onClick={fetchReports} size="sm">重新整理</Button>
        </div>
      </div>

      <Tabs defaultValue="pending" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList>
              <TabsTrigger value="pending" className="relative">
                  待處理
                  {pending.length > 0 && <span className="ml-2 bg-red-100 text-red-600 text-[10px] px-1.5 rounded-full">{pending.length}</span>}
              </TabsTrigger>
              <TabsTrigger value="verified">已通過</TabsTrigger>
              <TabsTrigger value="rejected">已拒絕</TabsTrigger>
              <TabsTrigger value="all">全部</TabsTrigger>
          </TabsList>
      </Tabs>

      {/* Batch Actions Bar */}
      {selectedIds.size > 0 && (
          <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-lg rounded-full px-6 py-3 flex items-center gap-4 animate-in slide-in-from-bottom-4">
              <span className="text-sm font-medium">已選取 {selectedIds.size} 個</span>
              <div className="h-4 w-px bg-gray-200 dark:bg-gray-700" />
              <div className="flex gap-2">
                  <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white rounded-full" onClick={() => batchUpdateStatus("verified")}>
                      <Check className="w-4 h-4 mr-1" /> 通過選取
                  </Button>
                  <Button size="sm" variant="destructive" className="rounded-full" onClick={() => batchUpdateStatus("rejected")}>
                      <X className="w-4 h-4 mr-1" /> 拒絕選取
                  </Button>
              </div>
              <Button variant="ghost" size="icon" className="h-8 w-8 ml-2 rounded-full" onClick={() => setSelectedIds(new Set())}>
                  <X className="w-4 h-4" />
              </Button>
          </div>
      )}

      <div className="flex items-center mb-2 gap-2">
          <input 
              type="checkbox" 
              className="w-4 h-4 rounded border-gray-300"
              checked={filteredReports.length > 0 && selectedIds.size === filteredReports.length}
              onChange={() => toggleAll(filteredReports)}
          />
          <span className="text-sm text-gray-500">全選本頁</span>
      </div>


      {/* Reply Dialog */}
      <Dialog open={replyDialogOpen} onOpenChange={setReplyDialogOpen}>
          <DialogContent>
              <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                      <MessageSquare className="h-5 w-5 text-blue-600" /> 回覆會員評價
                  </DialogTitle>
                  <DialogDescription>
                      您的回覆將會公開顯示給會員查看。
                  </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-2">
                  <Textarea 
                      value={replyContent} 
                      onChange={(e) => setReplyContent(e.target.value)}
                      placeholder="輸入回覆內容..."
                      rows={4}
                  />
              </div>
              <DialogFooter>
                  <Button variant="ghost" onClick={() => setReplyDialogOpen(false)}>取消</Button>
                  <Button onClick={handleReplySubmit} disabled={isSubmittingReply}>
                      {isSubmittingReply ? <Loader2 className="h-4 w-4 animate-spin" /> : <Reply className="h-4 w-4 mr-2" />}
                      發送回覆
                  </Button>
              </DialogFooter>
          </DialogContent>
      </Dialog>

      <div className="grid gap-4">
        {filteredReports.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-dashed border-gray-200 dark:border-gray-700">
                <p className="text-gray-500">此狀態下沒有回報。</p>
            </div>
        ) : (
            filteredReports.map((report) => (
            <Card key={report.id} className={`dark:bg-gray-800 dark:border-gray-700 transition-colors ${selectedIds.has(report.id) ? 'ring-2 ring-blue-500 bg-blue-50/50 dark:bg-blue-900/10' : ''}`}>
                <CardHeader className="flex-row items-start space-y-0 pb-2 gap-4">
                <div className="pt-1">
                    <input 
                        type="checkbox" 
                        className="w-5 h-5 rounded border-gray-300 cursor-pointer"
                        checked={selectedIds.has(report.id)}
                        onChange={() => toggleSelection(report.id)}
                    />
                </div>
                <div className="flex-1">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 mb-1">
                            <ReportTypeBadge type={report.report_type} />
                            <span className="text-xs text-gray-400">{new Date(report.created_at).toLocaleString('zh-HK')}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                report.status === "verified" ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300" :
                                report.status === "rejected" ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300" :
                                "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-200"
                            }`}>
                                {report.status === "pending" ? "審核中" : report.status === "verified" ? "已通過" : "已拒絕"}
                            </span>
                             <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-red-500" onClick={() => deleteReport(report.id)}>
                                 <Trash2 className="h-4 w-4" />
                             </Button>
                        </div>
                    </div>

                    <CardTitle className="text-lg dark:text-white flex items-center gap-2 mt-1">
                        {report.merchant_name || "未指定商戶"} 
                    </CardTitle>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        卡片: {report.card_id || "未指定"} | 金額: ${report.amount || "未指定"} | 支付: {report.payment_method}
                    </div>
                    <div className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                        👤 會員: {report.user_name || report.user_id || "匿名"}
                    </div>
                </div>
                </CardHeader>
                <CardContent className="pl-12 space-y-4">
                <div className="bg-gray-50 dark:bg-gray-900/50 p-3 rounded-lg text-sm space-y-2">
                     <div className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                        <Info className="h-4 w-4 text-blue-500 mt-0.5 shrink-0" />
                        <div className="flex-1 whitespace-pre-wrap">
                            <span className="font-semibold">描述/備註:</span> {report.comment}
                            <ConditionTags conditions={report.conditions} />
                            
                            {report.evidence_url && (
                                <div className="mt-2">
                                    <a href={report.evidence_url} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline text-xs flex items-center gap-1">
                                        <ExternalLink className="w-3 h-3" /> 查看證據連結/圖片
                                    </a>
                                </div>
                            )}
                        </div>
                    </div>
                    {report.actual_rate != null && (
                        <div className="pl-7 text-gray-600 dark:text-gray-400">
                            <span className="font-semibold">建議/實際回贈:</span> {report.actual_rate}%
                        </div>
                    )}
                </div>
                
                {report.status === "pending" && (
                    <div className="flex gap-3 pt-2 flex-wrap">
                        <Button
                        variant="default"
                        size="sm"
                        className="gap-2 bg-green-600 hover:bg-green-700"
                        onClick={() => updateReportStatus(report.id, "verified")}
                        >
                        <Check className="h-4 w-4" /> 通過
                        </Button>
                        <Button
                        variant="destructive"
                        size="sm"
                        className="gap-2"
                        onClick={() => updateReportStatus(report.id, "rejected")}
                        >
                        <X className="h-4 w-4" /> 拒絕
                        </Button>

                        <Button
                            variant="secondary"
                            size="sm"
                            className="gap-2"
                            onClick={() => handleReplyOpen(report.id)}
                        >
                            <MessageSquare className="h-4 w-4" /> 回覆
                        </Button>

                        {report.card_id && report.card_id !== 'unknown' && (
                            <Button
                                variant="outline"
                                size="sm"
                                className="gap-2 ml-auto"
                                onClick={() => handleQuickEdit(report.card_id)}
                            >
                                <Edit className="h-4 w-4" /> 編輯卡片規則
                            </Button>
                        )}
                    </div>
                )}
                </CardContent>
            </Card>
            ))
        )}
      </div>
    </div>
  );
}
