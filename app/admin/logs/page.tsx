"use client";

import { useMemo, useState } from "react";
import { MOCK_OPERATION_LOGS } from "@/lib/admin/mock-data";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export default function AdminLogsPage() {
  const [keyword, setKeyword] = useState("");
  const filteredLogs = useMemo(
    () =>
      MOCK_OPERATION_LOGS.filter(
        (log) =>
          log.actor.toLowerCase().includes(keyword.toLowerCase()) ||
          log.action.includes(keyword) ||
          log.target.toLowerCase().includes(keyword.toLowerCase())
      ),
    [keyword]
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
            {filteredLogs.map((log) => (
              <tr key={log.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <td className="px-6 py-4 text-gray-900 dark:text-white">{log.actor}</td>
                <td className="px-6 py-4 text-gray-600 dark:text-gray-300">{log.action}</td>
                <td className="px-6 py-4 text-gray-600 dark:text-gray-300">{log.target}</td>
                <td className="px-6 py-4 text-gray-500 dark:text-gray-400">{log.timestamp}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

