"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, XCircle, Loader2, Globe, Database, Shield } from "lucide-react";

export default function DiagnosePage() {
  const [results, setResults] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const supabase = createClient();

  const runDiagnosis = async () => {
    setLoading(true);
    const res: any = {
      timestamp: new Date().toLocaleString(),
      env: {},
      connection: {},
      auth: {},
      rpc: {}
    };

    // 1. Check Env Vars
    res.env.url = process.env.NEXT_PUBLIC_SUPABASE_URL ? "Set" : "Missing";
    res.env.urlValue = process.env.NEXT_PUBLIC_SUPABASE_URL; // Be careful displaying this if sensitive, but URL is usually public
    res.env.key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? "Set" : "Missing";

    // 2. Basic Connection (Public Table)
    try {
      const start = performance.now();
      const { data, error, count } = await supabase
        .from("cards")
        .select("id", { count: "exact", head: true });
      const end = performance.now();
      
      if (error) throw error;
      res.connection.status = "OK";
      res.connection.latency = Math.round(end - start) + "ms";
      res.connection.message = `Successfully connected. Found ${count} cards.`;
    } catch (e: any) {
      res.connection.status = "Error";
      res.connection.message = e.message || "Failed to connect";
    }

    // 3. Check RLS / Auth (Admin table)
    try {
      const { data: { session } } = await supabase.auth.getSession();
      res.auth.status = session ? "Authenticated" : "Anonymous";
      res.auth.user = session?.user?.email || "None";
      res.auth.role = session?.user?.role || "None";
    } catch (e: any) {
      res.auth.status = "Error";
      res.auth.message = e.message;
    }

    // 4. Check RPC (Analytics)
    try {
      const start = performance.now();
      const { data, error } = await supabase.rpc("get_analytics_summary");
      const end = performance.now();

      if (error) throw error;
      res.rpc.status = "OK";
      res.rpc.latency = Math.round(end - start) + "ms";
      res.rpc.dataStatus = data ? "Data Received" : "Empty";
    } catch (e: any) {
      res.rpc.status = "Error";
      res.rpc.message = e.message || "RPC failed";
    }

    setResults(res);
    setLoading(false);
  };

  useEffect(() => {
    runDiagnosis();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">系統診斷 (System Diagnosis)</h1>
        <Button onClick={runDiagnosis} disabled={loading}>
          {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "重新診斷"}
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Environment Variables */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5 text-blue-500" /> 環境變數
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm font-mono">
            <div className="flex justify-between">
              <span>Supabase URL:</span>
              <span className={results.env?.url === "Set" ? "text-green-600" : "text-red-600"}>
                {results.env?.url}
              </span>
            </div>
            <div className="text-xs text-gray-400 break-all">{results.env?.urlValue}</div>
            <div className="flex justify-between">
              <span>Anon Key:</span>
              <span className={results.env?.key === "Set" ? "text-green-600" : "text-red-600"}>
                {results.env?.key}
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Connection Status */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5 text-purple-500" /> 資料庫連線
            </CardTitle>
          </CardHeader>
          <CardContent>
            {results.connection?.status === "OK" ? (
              <div className="flex items-center gap-2 text-green-600">
                <CheckCircle2 className="h-5 w-5" />
                <div>
                  <p className="font-semibold">連線成功</p>
                  <p className="text-xs text-gray-500">延遲: {results.connection.latency}</p>
                  <p className="text-xs text-gray-500">{results.connection.message}</p>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-red-600">
                <XCircle className="h-5 w-5" />
                <div>
                  <p className="font-semibold">連線失敗</p>
                  <p className="text-xs">{results.connection?.message}</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Auth Status */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-orange-500" /> 身份驗證
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>狀態:</span>
              <span className="font-semibold">{results.auth?.status}</span>
            </div>
            <div className="flex justify-between">
              <span>用戶:</span>
              <span className="font-mono">{results.auth?.user}</span>
            </div>
            <div className="flex justify-between">
              <span>角色:</span>
              <span className="font-mono">{results.auth?.role}</span>
            </div>
          </CardContent>
        </Card>

        {/* RPC Status */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Loader2 className="h-5 w-5 text-pink-500" /> RPC 函數測試
            </CardTitle>
          </CardHeader>
          <CardContent>
            {results.rpc?.status === "OK" ? (
              <div className="flex items-center gap-2 text-green-600">
                <CheckCircle2 className="h-5 w-5" />
                <div>
                  <p className="font-semibold">調用成功</p>
                  <p className="text-xs text-gray-500">延遲: {results.rpc.latency}</p>
                  <p className="text-xs text-gray-500">{results.rpc.dataStatus}</p>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-red-600">
                <XCircle className="h-5 w-5" />
                <div>
                  <p className="font-semibold">調用失敗</p>
                  <p className="text-xs">{results.rpc?.message}</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

