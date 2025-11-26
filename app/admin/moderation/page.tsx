"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, X, Info, Loader2, Trash2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";

interface Report {
  id: string;
  merchant_name: string;
  category_id: string;
  amount: string;
  payment_method: string;
  card_id: string; // Added card_id
  card_name: string;
  description: string;
  proposed_reward: string;
  status: "pending" | "approved" | "rejected";
  created_at: string;
  user_id: string;
}

export default function AdminModerationPage() {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  const fetchReports = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("reports")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Failed to fetch reports:", error);
      toast.error("載入回報失敗");
    } else {
      setReports(data as Report[]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const updateReportStatus = async (id: string, status: "approved" | "rejected") => {
    // Optimistic update
    setReports(prev => prev.map(r => r.id === id ? { ...r, status } : r));

    const { error } = await supabase
      .from("reports")
      .update({ status })
      .eq("id", id);

    if (error) {
      console.error("Failed to update report:", error);
      toast.error("更新狀態失敗");
      fetchReports(); // Revert on error
    } else {
      toast.success(status === "approved" ? "已通過回報" : "已拒絕回報");
    }
  };

  const deleteReport = async (id: string) => {
      if (!confirm("確定要刪除此回報嗎？")) return;

      setReports(prev => prev.filter(r => r.id !== id));
      const { error } = await supabase
        .from("reports")
        .delete()
        .eq("id", id);
      
      if (error) {
          toast.error("刪除失敗");
          fetchReports();
      } else {
          toast.success("已刪除");
      }
  };

  const pending = reports.filter((r) => r.status === "pending");

  if (loading) {
      return (
          <div className="flex items-center justify-center h-96">
              <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
          </div>
      );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">回報審核</h1>
          <p className="text-gray-500 dark:text-gray-400">目前有 {pending.length} 個回報待處理。</p>
        </div>
        <Button variant="outline" onClick={fetchReports} size="sm">重新整理</Button>
      </div>

      <div className="grid gap-4">
        {reports.length === 0 ? (
            <p className="text-center text-gray-500 py-8">目前沒有任何回報。</p>
        ) : (
            reports.map((report) => (
            <Card key={report.id} className="dark:bg-gray-800 dark:border-gray-700">
                <CardHeader className="flex-row items-start justify-between space-y-0 pb-2">
                <div>
                    <CardTitle className="text-lg dark:text-white flex items-center gap-2">
                        {report.merchant_name || "未指定商戶"} 
                        <span className="text-sm font-normal text-gray-500">({report.category_id})</span>
                    </CardTitle>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        卡片: {report.card_name || report.card_id || "未指定"} | 支付: {report.payment_method} | User: {report.user_id?.slice(0, 8)}...
                    </div>
                    <div className="text-xs text-gray-400 mt-0.5">
                         {new Date(report.created_at).toLocaleString('zh-HK')}
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        report.status === "approved"
                            ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300"
                            : report.status === "rejected"
                            ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300"
                            : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-200"
                        }`}
                    >
                        {report.status === "pending" ? "審核中" : report.status === "approved" ? "已通過" : "已拒絕"}
                    </span>
                     <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-red-500" onClick={() => deleteReport(report.id)}>
                         <Trash2 className="h-4 w-4" />
                     </Button>
                </div>
                </CardHeader>
                <CardContent className="space-y-4">
                <div className="bg-gray-50 dark:bg-gray-900/50 p-3 rounded-lg text-sm space-y-2">
                     <div className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                        <Info className="h-4 w-4 text-blue-500 mt-0.5 shrink-0" />
                        <div>
                            <span className="font-semibold">問題描述:</span> {report.description}
                        </div>
                    </div>
                    {report.proposed_reward && (
                        <div className="pl-7 text-gray-600 dark:text-gray-400">
                            <span className="font-semibold">建議回贈:</span> {report.proposed_reward}
                        </div>
                    )}
                </div>
                
                {report.status === "pending" && (
                    <div className="flex gap-3 pt-2">
                        <Button
                        variant="default"
                        size="sm"
                        className="gap-2 bg-green-600 hover:bg-green-700"
                        onClick={() => updateReportStatus(report.id, "approved")}
                        >
                        <Check className="h-4 w-4" /> 通過並修正
                        </Button>
                        <Button
                        variant="destructive"
                        size="sm"
                        className="gap-2"
                        onClick={() => updateReportStatus(report.id, "rejected")}
                        >
                        <X className="h-4 w-4" /> 拒絕
                        </Button>
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
