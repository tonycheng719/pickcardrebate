"use client";

import { Navbar } from "@/components/navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ComboStrategy } from "@/lib/types";
import { ArrowRight, CreditCard, ArrowDown, Copy, CheckCircle2 } from "lucide-react";
import { useState } from "react";

const COMBOS: ComboStrategy[] = [
    {
        id: "citi-payme-insurance",
        title: "Citi Rewards x PayMe 繳費大法",
        description: "透過 PayMe 轉賬賺取 2% 回贈，再用 PayMe 餘額繳付保費或水電煤。",
        totalReward: 2.0,
        tags: ["繳費", "電子錢包", "保費"],
        steps: [
            { order: 1, action: "Citi Rewards 增值 PayMe", description: "使用 Citi Rewards 信用卡增值 PayMe 餘額 (每月上限 $3000)。" },
            { order: 2, action: "PayMe 轉賬", description: "將 PayMe 餘額轉賬至銀行戶口 (如需) 或直接使用。" },
            { order: 3, action: "繳付賬單", description: "使用 PayMe 掃描賬單 QR Code 或使用銀行戶口繳費。" }
        ]
    },
    {
        id: "earnmore-oepay",
        title: "EarnMORE x O!ePay 自動增值",
        description: "設定八達通自動增值，任何八達通消費都變 2% 回贈。",
        totalReward: 2.0,
        tags: ["八達通", "交通", "小額"],
        steps: [
            { order: 1, action: "申請自動增值", description: "為八達通申請自動增值，連結 EarnMORE 銀聯卡。" },
            { order: 2, action: "O!ePay 轉出 (可選)", description: "透過 O!ePay (八達通銀包) 轉出餘額至銀行 (每月首 $3000 免手續費)。" },
            { order: 3, action: "日常消費", description: "搭車、便利店、超市嘟八達通即賺 2%。" }
        ]
    },
    {
        id: "sc-alipay-bill",
        title: "SC Smart x AlipayHK 繳費",
        description: "雖然 SC Smart 卡本身繳費無分，但連結 AlipayHK 繳費可能有推廣優惠。",
        totalReward: 0.56,
        tags: ["繳費", "AlipayHK"],
        steps: [
            { order: 1, action: "連結信用卡", description: "將 SC Smart Card 加入 AlipayHK。" },
            { order: 2, action: "AlipayHK 繳費", description: "在 AlipayHK 內選擇「繳費」，選用信用卡支付。" }
        ]
    }
];

export default function CombosPage() {
    const [copiedId, setCopiedId] = useState<string | null>(null);

    const handleCopy = (id: string) => {
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2000);
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors">
            <Navbar />
            
            <main className="container mx-auto px-4 py-8 flex-1">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">組合技攻略 (Combo)</h1>
                    <p className="text-gray-600 dark:text-gray-400">
                        單張信用卡不夠用？試試這些「疊加技」，將回饋最大化。
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    {COMBOS.map(combo => (
                        <Card key={combo.id} className="dark:bg-gray-800 dark:border-gray-700 overflow-hidden flex flex-col">
                            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-b dark:border-gray-700 pb-4">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <CardTitle className="text-xl dark:text-white">{combo.title}</CardTitle>
                                        <div className="flex gap-2 mt-2">
                                            {combo.tags.map(tag => (
                                                <span key={tag} className="text-xs px-2 py-1 bg-white dark:bg-gray-700 rounded-full text-gray-600 dark:text-gray-300 border dark:border-gray-600">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-end">
                                        <span className="text-sm text-gray-500 dark:text-gray-400">總回饋</span>
                                        <span className="text-2xl font-bold text-green-600 dark:text-green-400">{combo.totalReward}%</span>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="pt-6 flex-1 flex flex-col">
                                <p className="text-gray-600 dark:text-gray-300 mb-6 text-sm">
                                    {combo.description}
                                </p>
                                
                                <div className="space-y-0 relative flex-1">
                                    {/* Vertical Line */}
                                    <div className="absolute left-4 top-2 bottom-6 w-0.5 bg-gray-200 dark:bg-gray-700 z-0"></div>
                                    
                                    {combo.steps.map((step, idx) => (
                                        <div key={idx} className="relative z-10 flex gap-4 pb-6 last:pb-0">
                                            <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 flex items-center justify-center font-bold text-sm shrink-0 border-2 border-white dark:border-gray-800">
                                                {step.order}
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-gray-900 dark:text-white text-sm mb-1">{step.action}</h4>
                                                <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                                                    {step.description}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-6 pt-4 border-t dark:border-gray-700 flex justify-end">
                                    <Button 
                                        variant="ghost" 
                                        size="sm" 
                                        className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                                        onClick={() => handleCopy(combo.id)}
                                    >
                                        {copiedId === combo.id ? (
                                            <>
                                                <CheckCircle2 className="h-4 w-4 mr-1 text-green-500" /> 已收藏
                                            </>
                                        ) : (
                                            <>
                                                <Copy className="h-4 w-4 mr-1" /> 收藏攻略
                                            </>
                                        )}
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </main>
        </div>
    );
}

