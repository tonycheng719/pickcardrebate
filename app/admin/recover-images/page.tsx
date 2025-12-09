"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RefreshCw, Check, X, Image, Database } from "lucide-react";
import { toast } from "sonner";

interface StorageFile {
  name: string;
  url: string;
  createdAt?: string;
}

interface CardInfo {
  id: string;
  name: string;
  hasImage: boolean;
  imageUrl: string | null;
}

interface Suggestion {
  cardId: string;
  cardName: string;
  currentImageUrl: string | null;
  suggestedImageUrl: string;
  fileName: string;
}

export default function RecoverImagesPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isRecovering, setIsRecovering] = useState(false);
  const [files, setFiles] = useState<StorageFile[]>([]);
  const [cards, setCards] = useState<CardInfo[]>([]);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [selectedUpdates, setSelectedUpdates] = useState<Map<string, string>>(new Map());
  const [results, setResults] = useState<Array<{ cardId: string; success: boolean; error?: string }>>([]);

  const scanStorage = async () => {
    setIsLoading(true);
    setResults([]);
    try {
      const res = await fetch("/api/admin/recover-card-images");
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || "Failed to scan storage");
      }
      
      const data = await res.json();
      setFiles(data.files || []);
      setCards(data.cards || []);
      setSuggestions(data.suggestions || []);
      
      // Auto-select suggested updates for cards without images
      const autoSelect = new Map<string, string>();
      data.suggestions?.forEach((s: Suggestion) => {
        if (!s.currentImageUrl) {
          autoSelect.set(s.cardId, s.suggestedImageUrl);
        }
      });
      setSelectedUpdates(autoSelect);
      
      toast.success(`找到 ${data.files?.length || 0} 個圖片文件`);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleSelection = (cardId: string, imageUrl: string) => {
    const newSelected = new Map(selectedUpdates);
    if (newSelected.has(cardId)) {
      newSelected.delete(cardId);
    } else {
      newSelected.set(cardId, imageUrl);
    }
    setSelectedUpdates(newSelected);
  };

  const applyRecovery = async () => {
    if (selectedUpdates.size === 0) {
      toast.error("請先選擇要恢復的圖片");
      return;
    }

    setIsRecovering(true);
    try {
      const updates = Array.from(selectedUpdates.entries()).map(([cardId, imageUrl]) => ({
        cardId,
        imageUrl
      }));

      const res = await fetch("/api/admin/recover-card-images", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ updates })
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || "Failed to apply recovery");
      }

      const data = await res.json();
      setResults(data.results || []);
      
      const successCount = data.results?.filter((r: any) => r.success).length || 0;
      toast.success(`成功恢復 ${successCount} 張卡片的圖片！`);
      
      // Refresh the data
      await scanStorage();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsRecovering(false);
    }
  };

  const cardsWithoutImages = cards.filter(c => !c.hasImage);

  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <Image className="w-6 h-6" />
        恢復信用卡圖片
      </h1>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-lg">第一步：掃描 Storage</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600 mb-4">
            點擊下方按鈕掃描 Supabase Storage 中的圖片，並自動匹配到對應的信用卡。
          </p>
          <Button onClick={scanStorage} disabled={isLoading}>
            <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            {isLoading ? "掃描中..." : "掃描 Storage"}
          </Button>
        </CardContent>
      </Card>

      {files.length > 0 && (
        <>
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Database className="w-5 h-5" />
                Storage 中的圖片 ({files.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {files.map((file) => (
                  <div key={file.name} className="border rounded-lg p-2">
                    <img 
                      src={file.url} 
                      alt={file.name}
                      className="w-full h-20 object-contain bg-gray-100 rounded mb-2"
                    />
                    <p className="text-xs text-gray-600 truncate">{file.name}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {cardsWithoutImages.length > 0 && (
            <Card className="mb-6 border-orange-200 bg-orange-50">
              <CardHeader>
                <CardTitle className="text-lg text-orange-800">
                  ⚠️ 缺少圖片的卡片 ({cardsWithoutImages.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-sm space-y-1">
                  {cardsWithoutImages.map(card => (
                    <li key={card.id} className="text-orange-700">• {card.name} ({card.id})</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          {suggestions.length > 0 && (
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="text-lg">第二步：選擇要恢復的圖片</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {suggestions.map((s) => (
                    <div 
                      key={`${s.cardId}-${s.fileName}`}
                      className={`flex items-center gap-4 p-3 border rounded-lg cursor-pointer transition-colors ${
                        selectedUpdates.has(s.cardId) 
                          ? 'border-green-500 bg-green-50' 
                          : 'hover:bg-gray-50'
                      }`}
                      onClick={() => toggleSelection(s.cardId, s.suggestedImageUrl)}
                    >
                      <div className={`w-6 h-6 rounded border-2 flex items-center justify-center ${
                        selectedUpdates.has(s.cardId) ? 'border-green-500 bg-green-500' : 'border-gray-300'
                      }`}>
                        {selectedUpdates.has(s.cardId) && <Check className="w-4 h-4 text-white" />}
                      </div>
                      <img 
                        src={s.suggestedImageUrl} 
                        alt={s.cardName}
                        className="w-16 h-10 object-contain bg-gray-100 rounded"
                      />
                      <div className="flex-1">
                        <p className="font-medium">{s.cardName}</p>
                        <p className="text-xs text-gray-500">{s.fileName}</p>
                      </div>
                      {s.currentImageUrl ? (
                        <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded">已有圖片</span>
                      ) : (
                        <span className="text-xs px-2 py-1 bg-orange-100 text-orange-700 rounded">缺少圖片</span>
                      )}
                    </div>
                  ))}
                </div>

                {suggestions.length === 0 && (
                  <p className="text-gray-500 text-center py-4">
                    無法自動匹配任何圖片。請手動在 /admin/cards 編輯卡片。
                  </p>
                )}
              </CardContent>
            </Card>
          )}

          {selectedUpdates.size > 0 && (
            <Card className="mb-6 border-green-200 bg-green-50">
              <CardHeader>
                <CardTitle className="text-lg text-green-800">第三步：確認恢復</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-green-700 mb-4">
                  已選擇 {selectedUpdates.size} 張卡片的圖片進行恢復。
                </p>
                <Button 
                  onClick={applyRecovery} 
                  disabled={isRecovering}
                  className="bg-green-600 hover:bg-green-700"
                >
                  {isRecovering ? (
                    <>
                      <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                      恢復中...
                    </>
                  ) : (
                    <>
                      <Check className="w-4 h-4 mr-2" />
                      確認恢復 ({selectedUpdates.size})
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          )}

          {results.length > 0 && (
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="text-lg">恢復結果</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {results.map((r) => (
                    <div 
                      key={r.cardId}
                      className={`flex items-center gap-2 text-sm ${
                        r.success ? 'text-green-600' : 'text-red-600'
                      }`}
                    >
                      {r.success ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
                      {r.cardId}
                      {r.error && <span className="text-gray-500">- {r.error}</span>}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </>
      )}

      {files.length === 0 && !isLoading && (
        <Card className="border-dashed">
          <CardContent className="py-12 text-center text-gray-500">
            <Image className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>點擊「掃描 Storage」開始</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

