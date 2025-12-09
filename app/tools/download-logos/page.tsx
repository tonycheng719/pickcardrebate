"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, Check, X, RefreshCw, Image } from "lucide-react";
import { toast } from "sonner";

// Merchants with Clearbit domains
const MERCHANTS = [
  { id: 'wellcome', name: '惠康', domain: 'wellcome.com.hk' },
  { id: 'parknshop', name: '百佳', domain: 'parknshop.com' },
  { id: 'yata', name: '一田', domain: 'yata.hk' },
  { id: '759store', name: '759 阿信屋', domain: '759store.com' },
  { id: 'hktvmall', name: 'HKTVmall', domain: 'hktvmall.com' },
  { id: 'dondondonki', name: 'Don Don Donki', domain: 'dondondonki.com' },
  { id: 'mannings', name: '萬寧', domain: 'mannings.com.hk' },
  { id: 'watsons', name: '屈臣氏', domain: 'watsons.com.hk' },
  { id: 'citysuper', name: 'city\'super', domain: 'citysuper.com.hk' },
  { id: 'foodpanda', name: 'foodpanda', domain: 'foodpanda.hk' },
  { id: 'marksandspencer', name: 'M&S', domain: 'marksandspencer.com' },
  { id: 'aeon', name: 'AEON', domain: 'aeon.com.hk' },
  { id: 'ikea', name: 'IKEA', domain: 'ikea.com.hk' },
  { id: 'maxims', name: '美心', domain: 'maxims.com.hk' },
  { id: 'fairwood', name: '大快活', domain: 'fairwood.com.hk' },
  { id: 'mcdonalds', name: '麥當勞', domain: 'mcdonalds.com.hk' },
  { id: 'starbucks', name: 'Starbucks', domain: 'starbucks.com.hk' },
  { id: 'kfc', name: 'KFC', domain: 'kfc.com.hk' },
  { id: 'pizzahut', name: 'Pizza Hut', domain: 'pizzahut.com.hk' },
  { id: 'cathay', name: '國泰航空', domain: 'cathaypacific.com' },
  { id: 'klook', name: 'Klook', domain: 'klook.com' },
  { id: 'trip', name: 'Trip.com', domain: 'trip.com' },
  { id: 'agoda', name: 'Agoda', domain: 'agoda.com' },
  { id: 'booking', name: 'Booking.com', domain: 'booking.com' },
  { id: 'hotels', name: 'Hotels.com', domain: 'hotels.com' },
  { id: 'expedia', name: 'Expedia', domain: 'expedia.com' },
  { id: 'netflix', name: 'Netflix', domain: 'netflix.com' },
  { id: 'spotify', name: 'Spotify', domain: 'spotify.com' },
  { id: 'apple', name: 'Apple', domain: 'apple.com' },
  { id: 'amazon', name: 'Amazon', domain: 'amazon.com' },
  { id: 'taobao', name: '淘寶', domain: 'taobao.com' },
  { id: 'jd', name: '京東', domain: 'jd.com' },
  { id: 'uniqlo', name: 'UNIQLO', domain: 'uniqlo.com' },
  { id: 'zara', name: 'ZARA', domain: 'zara.com' },
  { id: 'hm', name: 'H&M', domain: 'hm.com' },
  { id: 'sephora', name: 'Sephora', domain: 'sephora.com' },
  { id: 'fortress', name: '豐澤', domain: 'fortress.com.hk' },
  { id: 'broadway', name: '百老滙', domain: 'broadway.com.hk' },
  { id: 'shell', name: 'Shell', domain: 'shell.com.hk' },
  { id: 'caltex', name: 'Caltex', domain: 'caltex.com' },
  { id: 'esso', name: 'Esso', domain: 'esso.com.hk' },
  { id: 'octopus', name: '八達通', domain: 'octopus.com.hk' },
  { id: 'mtr', name: 'MTR', domain: 'mtr.com.hk' },
  { id: 'ird', name: '稅務局', domain: 'ird.gov.hk' },
  { id: 'wsd', name: '水務署', domain: 'wsd.gov.hk' },
  { id: 'sogo', name: 'SOGO', domain: 'sogo.com.hk' },
  { id: 'deliveroo', name: 'Deliveroo', domain: 'deliveroo.hk' },
];

interface MerchantStatus {
  id: string;
  status: 'pending' | 'downloading' | 'uploading' | 'success' | 'error';
  error?: string;
  newUrl?: string;
}

export default function DownloadLogosPage() {
  const [statuses, setStatuses] = useState<Map<string, MerchantStatus>>(new Map());
  const [isRunning, setIsRunning] = useState(false);

  const updateStatus = (id: string, status: Partial<MerchantStatus>) => {
    setStatuses(prev => {
      const newMap = new Map(prev);
      newMap.set(id, { ...prev.get(id), id, ...status } as MerchantStatus);
      return newMap;
    });
  };

  const downloadAndUpload = async (merchant: typeof MERCHANTS[0]) => {
    const { id, domain } = merchant;
    
    try {
      updateStatus(id, { status: 'downloading' });
      
      // Fetch logo from Clearbit (browser can access it)
      const clearbitUrl = `https://logo.clearbit.com/${domain}`;
      const response = await fetch(clearbitUrl);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch: ${response.status}`);
      }
      
      const blob = await response.blob();
      
      updateStatus(id, { status: 'uploading' });
      
      // Upload to our server
      const formData = new FormData();
      formData.append('file', blob, `${id}.png`);
      formData.append('bucket', 'images');
      formData.append('folder', 'merchants');
      
      const uploadRes = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData
      });
      
      if (!uploadRes.ok) {
        const err = await uploadRes.json();
        throw new Error(err.error || 'Upload failed');
      }
      
      const { url } = await uploadRes.json();
      
      // Update merchant in DB
      const updateRes = await fetch('/api/admin/merchants', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id,
          name: merchant.name,
          logo: url
        })
      });
      
      if (!updateRes.ok) {
        console.warn('Failed to update merchant in DB');
      }
      
      updateStatus(id, { status: 'success', newUrl: url });
      return true;
    } catch (err: any) {
      updateStatus(id, { status: 'error', error: err.message });
      return false;
    }
  };

  const downloadSingle = async (merchant: typeof MERCHANTS[0]) => {
    await downloadAndUpload(merchant);
  };

  const downloadAll = async () => {
    setIsRunning(true);
    let successCount = 0;
    
    for (const merchant of MERCHANTS) {
      const success = await downloadAndUpload(merchant);
      if (success) successCount++;
      // Small delay to avoid overwhelming the server
      await new Promise(r => setTimeout(r, 300));
    }
    
    toast.success(`完成！成功下載 ${successCount}/${MERCHANTS.length} 個 logo`);
    setIsRunning(false);
  };

  const getStatusIcon = (status?: MerchantStatus['status']) => {
    switch (status) {
      case 'downloading':
      case 'uploading':
        return <RefreshCw className="w-4 h-4 animate-spin text-blue-500" />;
      case 'success':
        return <Check className="w-4 h-4 text-green-500" />;
      case 'error':
        return <X className="w-4 h-4 text-red-500" />;
      default:
        return null;
    }
  };

  const successCount = Array.from(statuses.values()).filter(s => s.status === 'success').length;
  const errorCount = Array.from(statuses.values()).filter(s => s.status === 'error').length;

  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <Image className="w-6 h-6" />
        下載商戶 Logo
      </h1>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-lg">從 Clearbit 下載 Logo</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600 mb-4">
            點擊下方按鈕從 Clearbit 下載商戶 logo 並上傳到 Supabase Storage。
            這樣就不用依賴第三方服務了。
          </p>
          <div className="flex gap-4 items-center">
            <Button onClick={downloadAll} disabled={isRunning}>
              <Download className="w-4 h-4 mr-2" />
              {isRunning ? '下載中...' : '批量下載全部'}
            </Button>
            {(successCount > 0 || errorCount > 0) && (
              <span className="text-sm text-gray-500">
                ✅ {successCount} 成功 | ❌ {errorCount} 失敗
              </span>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">商戶列表 ({MERCHANTS.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {MERCHANTS.map(merchant => {
              const status = statuses.get(merchant.id);
              return (
                <div 
                  key={merchant.id}
                  className={`flex items-center gap-3 p-3 border rounded-lg ${
                    status?.status === 'success' ? 'bg-green-50 border-green-200' :
                    status?.status === 'error' ? 'bg-red-50 border-red-200' :
                    'bg-white'
                  }`}
                >
                  <img 
                    src={status?.newUrl || `https://logo.clearbit.com/${merchant.domain}`}
                    alt={merchant.name}
                    className="w-10 h-10 object-contain rounded bg-gray-100"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/placeholder-logo.png';
                    }}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">{merchant.name}</p>
                    <p className="text-xs text-gray-500 truncate">{merchant.id}</p>
                    {status?.error && (
                      <p className="text-xs text-red-500 truncate">{status.error}</p>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    {getStatusIcon(status?.status)}
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => downloadSingle(merchant)}
                      disabled={isRunning || status?.status === 'downloading' || status?.status === 'uploading'}
                    >
                      <Download className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

