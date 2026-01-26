"use client";

import { useState, useEffect } from "react";
import { Navbar } from "@/components/navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Calculator, CreditCard, Sparkles, TrendingUp, 
  ShoppingCart, Utensils, Plane, Bus, Tv, Zap, 
  HelpCircle, ArrowRight, CheckCircle, Save
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

interface Category {
  id: string;
  name: string;
  field: string;
  icon: React.ReactNode;
}

interface StrategyCard {
  cardId: string;
  cardName: string;
  bank: string;
  categories: { id: string; name: string; amount: number; reward: number }[];
  totalReward: number;
}

interface StrategyResult {
  cards: StrategyCard[];
  categoryAllocation: Record<string, string>;
  totalMonthlyReward: number;
  totalYearlyReward: number;
  singleCardReward: number;
  improvementPercentage: number;
  totalSpending: number;
}

const CATEGORIES: Category[] = [
  { id: 'supermarket', name: '超市', field: 'supermarket_monthly', icon: <ShoppingCart className="h-5 w-5" /> },
  { id: 'dining', name: '餐飲', field: 'dining_monthly', icon: <Utensils className="h-5 w-5" /> },
  { id: 'online', name: '網購', field: 'online_monthly', icon: <CreditCard className="h-5 w-5" /> },
  { id: 'transport', name: '交通', field: 'transport_monthly', icon: <Bus className="h-5 w-5" /> },
  { id: 'overseas', name: '海外/旅遊', field: 'overseas_monthly', icon: <Plane className="h-5 w-5" /> },
  { id: 'entertainment', name: '娛樂', field: 'entertainment_monthly', icon: <Tv className="h-5 w-5" /> },
  { id: 'utilities', name: '水電煤', field: 'utilities_monthly', icon: <Zap className="h-5 w-5" /> },
  { id: 'other', name: '其他', field: 'other_monthly', icon: <HelpCircle className="h-5 w-5" /> },
];

export default function StrategyPage() {
  const [spending, setSpending] = useState<Record<string, number>>({
    supermarket_monthly: 2000,
    dining_monthly: 3000,
    online_monthly: 1500,
    transport_monthly: 500,
    overseas_monthly: 0,
    entertainment_monthly: 500,
    utilities_monthly: 500,
    other_monthly: 1000,
  });
  const [preferMiles, setPreferMiles] = useState(false);
  const [noAnnualFeeOnly, setNoAnnualFeeOnly] = useState(false);
  const [maxCards, setMaxCards] = useState(3);
  const [result, setResult] = useState<StrategyResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const totalSpending = Object.values(spending).reduce((a, b) => a + b, 0);

  const handleCalculate = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/strategy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...spending,
          prefer_miles: preferMiles,
          no_annual_fee_only: noAnnualFeeOnly,
          max_cards: maxCards,
        }),
      });
      
      const data = await response.json();
      if (data.success) {
        setResult(data.strategy);
      } else {
        toast.error(data.error || '計算失敗');
      }
    } catch (e) {
      toast.error('無法連接伺服器');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const response = await fetch('/api/strategy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...spending,
          prefer_miles: preferMiles,
          no_annual_fee_only: noAnnualFeeOnly,
          max_cards: maxCards,
          save_profile: true,
        }),
      });
      
      const data = await response.json();
      if (data.success) {
        toast.success('消費習慣已儲存！');
      }
    } catch (e) {
      toast.error('儲存失敗');
    } finally {
      setSaving(false);
    }
  };

  const updateSpending = (field: string, value: number) => {
    setSpending(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8 max-w-5xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2 flex items-center justify-center gap-2">
            <Calculator className="h-8 w-8 text-emerald-500" />
            多卡策略規劃
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            輸入你的每月消費習慣，我們幫你計算最佳信用卡組合
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShoppingCart className="h-5 w-5" />
                  每月消費金額
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {CATEGORIES.map((cat) => (
                  <div key={cat.id} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label className="flex items-center gap-2">
                        {cat.icon}
                        {cat.name}
                      </Label>
                      <span className="text-sm text-gray-500">
                        ${spending[cat.field].toLocaleString()}
                      </span>
                    </div>
                    <Slider
                      value={[spending[cat.field]]}
                      onValueChange={(v) => updateSpending(cat.field, v[0])}
                      max={20000}
                      step={100}
                      className="py-2"
                    />
                  </div>
                ))}
                
                <div className="pt-4 border-t">
                  <div className="flex items-center justify-between font-bold">
                    <span>每月總消費</span>
                    <span className="text-emerald-600">${totalSpending.toLocaleString()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>偏好設定</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>只要免年費信用卡</Label>
                  <Switch
                    checked={noAnnualFeeOnly}
                    onCheckedChange={setNoAnnualFeeOnly}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <Label>偏好儲里數</Label>
                  <Switch
                    checked={preferMiles}
                    onCheckedChange={setPreferMiles}
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>最多持有卡數</Label>
                    <span className="font-bold">{maxCards} 張</span>
                  </div>
                  <Slider
                    value={[maxCards]}
                    onValueChange={(v) => setMaxCards(v[0])}
                    min={1}
                    max={5}
                    step={1}
                  />
                </div>
              </CardContent>
            </Card>

            <div className="flex gap-3">
              <Button 
                onClick={handleCalculate} 
                className="flex-1 bg-emerald-600 hover:bg-emerald-700"
                disabled={loading}
              >
                {loading ? '計算中...' : '計算最佳組合'}
                <Sparkles className="h-4 w-4 ml-2" />
              </Button>
              <Button 
                variant="outline" 
                onClick={handleSave}
                disabled={saving}
              >
                <Save className="h-4 w-4 mr-2" />
                儲存
              </Button>
            </div>
          </div>

          {/* Result Section */}
          <div className="space-y-6">
            {result ? (
              <>
                {/* Summary */}
                <Card className="bg-gradient-to-br from-emerald-500 to-teal-500 text-white">
                  <CardContent className="p-6">
                    <div className="text-center mb-4">
                      <div className="text-sm opacity-80">使用 {result.cards.length} 張卡的最佳組合</div>
                      <div className="text-4xl font-bold my-2">
                        ${result.totalMonthlyReward.toLocaleString()}
                        <span className="text-lg font-normal">/月</span>
                      </div>
                      <div className="text-emerald-100">
                        年度總回贈約 ${result.totalYearlyReward.toLocaleString()}
                      </div>
                    </div>
                    
                    {result.improvementPercentage > 0 && (
                      <div className="bg-white/20 rounded-lg p-3 text-center">
                        <TrendingUp className="h-5 w-5 inline mr-1" />
                        比單卡策略多賺 <strong>{result.improvementPercentage.toFixed(0)}%</strong>
                        <div className="text-xs mt-1 opacity-80">
                          單卡策略每月只能賺 ${result.singleCardReward.toLocaleString()}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Card Details */}
                <div className="space-y-4">
                  <h3 className="font-bold text-lg">推薦卡組合</h3>
                  {result.cards.map((card, index) => (
                    <Card key={card.cardId}>
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <div className="flex items-center gap-2">
                              <Badge className="bg-emerald-100 text-emerald-700">
                                #{index + 1}
                              </Badge>
                              <span className="font-bold">{card.cardName}</span>
                            </div>
                            <div className="text-sm text-gray-500">{card.bank}</div>
                          </div>
                          <div className="text-right">
                            <div className="font-bold text-emerald-600">
                              ${card.totalReward.toFixed(0)}/月
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex flex-wrap gap-2">
                          {card.categories.map((cat) => (
                            <div 
                              key={cat.id} 
                              className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-full"
                            >
                              {cat.name}: ${cat.amount.toLocaleString()} → ${cat.reward.toFixed(0)}
                            </div>
                          ))}
                        </div>
                        
                        <div className="mt-3 flex justify-end">
                          <Link href={`/cards/${card.cardId}`}>
                            <Button variant="ghost" size="sm">
                              查看詳情 <ArrowRight className="h-4 w-4 ml-1" />
                            </Button>
                          </Link>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Category Allocation */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">類別分配</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {Object.entries(result.categoryAllocation).map(([catId, cardId]) => {
                        const cat = CATEGORIES.find(c => c.id === catId);
                        const card = result.cards.find(c => c.cardId === cardId);
                        return (
                          <div key={catId} className="flex items-center justify-between py-1">
                            <span className="flex items-center gap-2">
                              {cat?.icon}
                              {cat?.name}
                            </span>
                            <span className="text-sm font-medium">{card?.cardName}</span>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              </>
            ) : (
              <Card className="h-full flex items-center justify-center">
                <CardContent className="text-center py-16">
                  <Calculator className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p className="text-gray-500">
                    輸入你的消費習慣後，點擊「計算最佳組合」
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

