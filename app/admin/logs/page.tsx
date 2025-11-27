"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Search, Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

interface AdminLog {
  id: string;
  admin_email: string;
  action: string;
  target_type: string;
  target_id: string;
  details: any;
  created_at: string;
}

export default function AdminLogsPage() {
  const [logs, setLogs] = useState<AdminLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [keyword, setKeyword] = useState("");
  const supabase = createClient();

  useEffect(() => {
    const fetchLogs = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("admin_audit_logs")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(50);
      
      if (!error && data) {
        setLogs(data as AdminLog[]);
      }
      setLoading(false);
    };
    fetchLogs();
  }, [supabase]);

  const filteredLogs = logs.filter(
    (log) =>
      log.admin_email.toLowerCase().includes(keyword.toLowerCase()) ||
      log.action.toLowerCase().includes(keyword.toLowerCase()) ||
      log.target_type.toLowerCase().includes(keyword.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">操作日誌</h1>
        <p className="text-gray-500 dark:text-gray-400">追蹤管理員在後台的所有操作記錄。</p>
      </div>

      <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border dark:border-gray-700 flex gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="搜尋操作人、動作或目標..."
            className="pl-9 dark:bg-gray-700 dark:border-gray-600"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl border dark:border-gray-700 overflow-hidden">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-50 dark:bg-gray-900/50 text-gray-500 dark:text-gray-400 border-b dark:border-gray-700">
            <tr>
              <th className="px-6 py-4 font-medium">操作人</th>
              <th className="px-6 py-4 font-medium">動作</th>
              <th className="px-6 py-4 font-medium">目標對象</th>
              <th className="px-6 py-4 font-medium">時間</th>
            </tr>
          </thead>
          <tbody className="divide-y dark:divide-gray-700">
            {loading ? (
              <tr>
                <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                  <Loader2 className="h-6 w-6 animate-spin mx-auto mb-2" />
                  載入中...
                </td>
              </tr>
            ) : filteredLogs.length === 0 ? (
               <tr>
                <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                  暫無操作記錄
                </td>
              </tr>
            ) : (
              filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                  <td className="px-6 py-4 text-gray-900 dark:text-white">{log.admin_email}</td>
                  <td className="px-6 py-4 text-gray-600 dark:text-gray-300">
                    <span className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-xs font-medium mr-2">
                        {log.target_type}
                    </span>
                    {log.action}
                  </td>
                  <td className="px-6 py-4 text-gray-600 dark:text-gray-300 text-xs font-mono">
                    {log.target_id || "-"}
                  </td>
                  <td className="px-6 py-4 text-gray-500 dark:text-gray-400">
                    {new Date(log.created_at).toLocaleString('zh-HK')}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

