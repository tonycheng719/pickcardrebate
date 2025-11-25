"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MOCK_PROMO_REPORTS, PromoReport } from "@/lib/admin/mock-data";
import { Check, X, Info } from "lucide-react";

export default function AdminModerationPage() {
  const [reports, setReports] = useState(MOCK_PROMO_REPORTS);

  const updateReport = (id: string, status: PromoReport["status"]) => {
    setReports((prev) => prev.map((report) => (report.id === id ? { ...report, status } : report)));
  };

  const pending = reports.filter((r) => r.status === "pending");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">回報審核</h1>
          <p className="text-gray-500 dark:text-gray-400">目前有 {pending.length} 個回報待處理。</p>
        </div>
        <div className="text-xs text-gray-400 dark:text-gray-500">最後更新：剛剛</div>
      </div>

      <div className="grid gap-4">
        {reports.map((report) => (
          <Card key={report.id} className="dark:bg-gray-800 dark:border-gray-700">
            <CardHeader className="flex-row items-start justify-between space-y-0">
              <div>
                <CardTitle className="text-lg dark:text-white">{report.title}</CardTitle>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  由 {report.reporter} 於 {report.submittedAt} 提交
                </div>
              </div>
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
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3 text-sm text-gray-700 dark:text-gray-300">
                <Info className="h-4 w-4 text-gray-400 mt-1" />
                <p>{report.message}</p>
              </div>
              <div className="flex gap-3">
                <Button
                  variant="default"
                  size="sm"
                  className="gap-2"
                  onClick={() => updateReport(report.id, "approved")}
                  disabled={report.status === "approved"}
                >
                  <Check className="h-4 w-4" /> 通過
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  className="gap-2"
                  onClick={() => updateReport(report.id, "rejected")}
                  disabled={report.status === "rejected"}
                >
                  <X className="h-4 w-4" /> 拒絕
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

