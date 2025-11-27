"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Trash2, GitCommit, Tag, Calendar } from "lucide-react";
import { toast } from "sonner";

interface Changelog {
  id: string;
  version: string;
  release_date: string;
  title: string;
  content: string;
  type: "feature" | "fix" | "improvement" | "maintenance";
  created_at: string;
}

export default function AdminChangelogPage() {
  const [logs, setLogs] = useState<Changelog[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  // Form State
  const [formData, setFormData] = useState({
    version: "",
    title: "",
    content: "",
    type: "feature",
    date: new Date().toISOString().split('T')[0]
  });

  const fetchLogs = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/changelog");
      if (!res.ok) throw new Error("Failed to fetch logs");
      const data = await res.json();
      setLogs(data);
    } catch (error) {
      console.error(error);
      toast.error("載入日誌失敗");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  const handleSubmit = async () => {
    if (!formData.version || !formData.title) {
      toast.error("請填寫版本號和標題");
      return;
    }

    try {
      const res = await fetch("/api/admin/changelog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to create log");

      toast.success("已新增更新日誌");
      setIsDialogOpen(false);
      setFormData({
        version: "",
        title: "",
        content: "",
        type: "feature",
        date: new Date().toISOString().split('T')[0]
      });
      fetchLogs();
    } catch (error) {
      toast.error("新增失敗");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("確定要刪除此日誌嗎？")) return;
    try {
      const res = await fetch(`/api/admin/changelog?id=${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete");
      toast.success("已刪除");
      fetchLogs();
    } catch (error) {
      toast.error("刪除失敗");
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "feature": return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300";
      case "fix": return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300";
      case "improvement": return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300";
      default: return "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300";
    }
  };

  const getTypeText = (type: string) => {
    switch (type) {
      case "feature": return "新功能";
      case "fix": return "修復";
      case "improvement": return "優化";
      case "maintenance": return "維護";
      default: return type;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">系統更新日誌</h1>
          <p className="text-gray-500 dark:text-gray-400">記錄網站的版本迭代與重要修改。</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" /> 新增日誌
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>新增更新記錄</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">版本號 (e.g. v1.2.0)</label>
                  <Input 
                    value={formData.version} 
                    onChange={(e) => setFormData(prev => ({ ...prev, version: e.target.value }))}
                    placeholder="v1.0.0" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">日期</label>
                  <Input 
                    type="date" 
                    value={formData.date} 
                    onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">標題</label>
                <Input 
                  value={formData.title} 
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="例如：新增里數計算功能" 
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">類型</label>
                <Select 
                    value={formData.type} 
                    onValueChange={(val) => setFormData(prev => ({ ...prev, type: val as any }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="feature">新功能 (Feature)</SelectItem>
                    <SelectItem value="fix">修復 (Fix)</SelectItem>
                    <SelectItem value="improvement">優化 (Improvement)</SelectItem>
                    <SelectItem value="maintenance">維護 (Maintenance)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">詳細內容</label>
                <Textarea 
                  value={formData.content} 
                  onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                  placeholder="支援換行..." 
                  rows={5}
                />
              </div>

              <Button onClick={handleSubmit} className="w-full">發佈</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="relative border-l-2 border-gray-200 dark:border-gray-700 ml-3 space-y-8 pl-8 py-4">
        {loading ? (
            <p className="text-gray-500">載入中...</p>
        ) : logs.length === 0 ? (
            <p className="text-gray-500">暫無更新記錄。</p>
        ) : (
            logs.map((log) => (
                <div key={log.id} className="relative">
                    <span className={`absolute -left-[41px] top-1 h-6 w-6 rounded-full border-4 border-white dark:border-gray-900 flex items-center justify-center ${
                        log.type === 'feature' ? 'bg-green-500' : 
                        log.type === 'fix' ? 'bg-red-500' : 'bg-blue-500'
                    }`}>
                    </span>
                    
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                        <div className="flex items-center gap-2">
                            <span className="font-mono text-sm font-bold text-gray-500 dark:text-gray-400">{log.version}</span>
                            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${getTypeColor(log.type)}`}>
                                {getTypeText(log.type)}
                            </span>
                        </div>
                        <span className="text-xs text-gray-400 flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {log.release_date}
                        </span>
                    </div>

                    <Card className="dark:bg-gray-800 dark:border-gray-700 hover:shadow-md transition-shadow group">
                        <CardHeader className="py-3 px-4 pb-2 flex flex-row items-center justify-between space-y-0">
                            <CardTitle className="text-base font-bold text-gray-900 dark:text-white">
                                {log.title}
                            </CardTitle>
                            <Button 
                                variant="ghost" 
                                size="icon" 
                                className="h-8 w-8 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                                onClick={() => handleDelete(log.id)}
                            >
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </CardHeader>
                        <CardContent className="px-4 pb-4 pt-0">
                            <div className="text-sm text-gray-600 dark:text-gray-300 whitespace-pre-wrap leading-relaxed">
                                {log.content}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            ))
        )}
      </div>
    </div>
  );
}

