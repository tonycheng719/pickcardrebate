"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { History, Plus, Loader2, Trash2 } from "lucide-react";
import ReactMarkdown from "react-markdown";

interface Changelog {
  id: string;
  version: string;
  release_date: string;
  title: string;
  type: "feature" | "fix" | "improvement" | "maintenance";
  content: string;
}

export default function ChangelogManagementPage() {
  const [logs, setLogs] = useState<Changelog[]>([]);
  const [loading, setLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Form State
  const [version, setVersion] = useState("");
  const [title, setTitle] = useState("");
  const [type, setType] = useState<string>("feature");
  const [content, setContent] = useState("");
  const [releaseDate, setReleaseDate] = useState(new Date().toISOString().split('T')[0]);

  const fetchLogs = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/changelog");
      if (response.ok) {
        const data = await response.json();
        setLogs(data);
      }
    } catch (error) {
      toast.error("無法載入日誌列表");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/changelog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          version,
          title,
          type,
          content,
          releaseDate
        })
      });

      if (!response.ok) throw new Error("Failed to submit");

      toast.success("日誌發佈成功！");
      // Reset form
      setVersion("");
      setTitle("");
      setContent("");
      setType("feature");
      fetchLogs();
    } catch (error) {
      toast.error("發佈失敗");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <History className="w-8 h-8" /> 更新日誌管理
        </h1>
        <p className="text-gray-500 dark:text-gray-400">
          發佈系統更新通知，讓用戶了解最新功能與修復。
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Editor */}
        <Card>
          <CardHeader>
            <CardTitle>發佈新日誌</CardTitle>
            <CardDescription>支援 Markdown 語法</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>版本號 (Version)</Label>
                  <Input 
                    placeholder="v1.0.0" 
                    value={version} 
                    onChange={e => setVersion(e.target.value)} 
                    required 
                  />
                </div>
                <div className="space-y-2">
                  <Label>發佈日期</Label>
                  <Input 
                    type="date" 
                    value={releaseDate} 
                    onChange={e => setReleaseDate(e.target.value)} 
                    required 
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>類型 (Type)</Label>
                <Select value={type} onValueChange={setType}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="feature">🚀 Feature (新功能)</SelectItem>
                    <SelectItem value="fix">🐛 Fix (修復)</SelectItem>
                    <SelectItem value="improvement">✨ Improvement (優化)</SelectItem>
                    <SelectItem value="maintenance">🔧 Maintenance (維護)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>標題 (Title)</Label>
                <Input 
                  placeholder="例如：新增深色模式與首頁改版" 
                  value={title} 
                  onChange={e => setTitle(e.target.value)} 
                  required 
                />
              </div>

              <div className="space-y-2">
                <Label>內容 (Content)</Label>
                <Textarea 
                  placeholder="使用 Markdown 描述更新詳情...
- 新增功能 A
- 修復 Bug B" 
                  className="min-h-[200px] font-mono text-sm"
                  value={content}
                  onChange={e => setContent(e.target.value)}
                  required
                />
              </div>

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Plus className="mr-2 h-4 w-4" />}
                發佈更新
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Preview & History */}
        <div className="space-y-6">
          <Card className="bg-gray-50 dark:bg-gray-900 border-dashed">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-gray-500">預覽 (Preview)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose prose-sm max-w-none dark:prose-invert bg-white dark:bg-gray-800 p-4 rounded-md border min-h-[100px]">
                 {content ? <ReactMarkdown>{content}</ReactMarkdown> : <span className="text-gray-400 italic">內容將顯示於此...</span>}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>歷史記錄</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
                {loading ? (
                  <div className="text-center py-4 text-gray-500">載入中...</div>
                ) : logs.length === 0 ? (
                  <div className="text-center py-4 text-gray-500">暫無記錄</div>
                ) : (
                  logs.map(log => (
                    <div key={log.id} className="p-3 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm">{log.version}</span>
                          <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                            log.type === 'feature' ? 'bg-green-100 text-green-700' :
                            log.type === 'fix' ? 'bg-red-100 text-red-700' :
                            log.type === 'improvement' ? 'bg-blue-100 text-blue-700' :
                            'bg-gray-100 text-gray-700'
                          }`}>
                            {log.type}
                          </span>
                        </div>
                        <span className="text-xs text-gray-400">{log.release_date}</span>
                      </div>
                      <div className="font-medium text-sm truncate">{log.title}</div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
