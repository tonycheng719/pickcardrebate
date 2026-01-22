"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ImageUpload } from "@/components/ui/image-upload";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { HK_CARDS } from "@/lib/data/cards";
import { createClient } from "@/lib/supabase/client";
import { ArrowLeft, Save, Loader2, Info, Plus, X } from "lucide-react";
import { toast } from "sonner";
import { LanguageTabs, useMultiLangEditor, type AdminLocale } from "@/components/admin/LanguageTabs";

interface CardMultiLangData {
  id: string;
  name: string;
  bank: string;
  imageUrl?: string;
  welcomeOfferText?: string;
  sellingPoints?: string[];
  feeWaiverCondition?: string;
  rewardTimeline?: string;
  note?: string;
  tags?: string[];
  // Multi-lang fields
  name_en?: string;
  name_zh_cn?: string;
  bank_en?: string;
  bank_zh_cn?: string;
  welcomeOfferText_en?: string;
  welcomeOfferText_zh_cn?: string;
  sellingPoints_en?: string[];
  sellingPoints_zh_cn?: string[];
  feeWaiverCondition_en?: string;
  feeWaiverCondition_zh_cn?: string;
  rewardTimeline_en?: string;
  rewardTimeline_zh_cn?: string;
  note_en?: string;
  note_zh_cn?: string;
  tags_en?: string[];
  tags_zh_cn?: string[];
  languagesCompleted?: string[];
}

const LANG_FIELDS = [
  'name',
  'bank', 
  'welcomeOfferText',
  'sellingPoints',
  'feeWaiverCondition',
  'rewardTimeline',
  'note',
  'tags',
];

export default function AdminEditCardPage({ params }: { params: Promise<{ id: string }> }) {
  const { id: cardId } = use(params);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  
  // Get static card data
  const staticCard = HK_CARDS.find((c) => c.id === cardId);
  
  // Initialize with static data
  const initialData: CardMultiLangData = {
    id: cardId,
    name: staticCard?.name || '',
    bank: staticCard?.bank || '',
    imageUrl: staticCard?.imageUrl,
    welcomeOfferText: staticCard?.welcomeOfferText,
    sellingPoints: staticCard?.sellingPoints,
    feeWaiverCondition: staticCard?.feeWaiverCondition,
    rewardTimeline: staticCard?.rewardTimeline,
    note: staticCard?.note,
    tags: staticCard?.tags,
    languagesCompleted: ['zh-HK'],
  };

  const {
    currentLocale,
    setCurrentLocale,
    data,
    setData,
    getFieldValue,
    setFieldValue,
    autoTranslate,
    isTranslating,
    completedLanguages,
  } = useMultiLangEditor(initialData, LANG_FIELDS);

  // Load data from database
  useEffect(() => {
    async function fetchData() {
      if (!cardId) return;
      setIsLoading(true);
      
      try {
        const supabase = createClient();
        const { data: dbData, error } = await supabase
          .from("cards")
          .select("*")
          .eq("id", cardId)
          .single();
        
        if (dbData) {
          setData({
            ...initialData,
            imageUrl: dbData.image_url || initialData.imageUrl,
            // Multi-lang from DB
            name_en: dbData.name_en,
            name_zh_cn: dbData.name_zh_cn,
            bank_en: dbData.bank_en,
            bank_zh_cn: dbData.bank_zh_cn,
            welcomeOfferText_en: dbData.welcome_offer_text_en,
            welcomeOfferText_zh_cn: dbData.welcome_offer_text_zh_cn,
            sellingPoints_en: dbData.selling_points_en,
            sellingPoints_zh_cn: dbData.selling_points_zh_cn,
            feeWaiverCondition_en: dbData.fee_waiver_condition_en,
            feeWaiverCondition_zh_cn: dbData.fee_waiver_condition_zh_cn,
            rewardTimeline_en: dbData.reward_timeline_en,
            rewardTimeline_zh_cn: dbData.reward_timeline_zh_cn,
            note_en: dbData.note_en,
            note_zh_cn: dbData.note_zh_cn,
            tags_en: dbData.tags_en,
            tags_zh_cn: dbData.tags_zh_cn,
            languagesCompleted: dbData.languages_completed || ['zh-HK'],
          });
        }
      } catch (error) {
        console.error('Error loading card:', error);
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchData();
  }, [cardId]);

  const handleSave = async () => {
    setIsSaving(true);
    
    try {
      const res = await fetch('/api/admin/cards/update-multilang', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cardId,
          data: {
            image_url: data.imageUrl,
            // Multi-lang fields
            name_en: data.name_en,
            name_zh_cn: data.name_zh_cn,
            bank_en: data.bank_en,
            bank_zh_cn: data.bank_zh_cn,
            welcome_offer_text_en: data.welcomeOfferText_en,
            welcome_offer_text_zh_cn: data.welcomeOfferText_zh_cn,
            selling_points_en: data.sellingPoints_en,
            selling_points_zh_cn: data.sellingPoints_zh_cn,
            fee_waiver_condition_en: data.feeWaiverCondition_en,
            fee_waiver_condition_zh_cn: data.feeWaiverCondition_zh_cn,
            reward_timeline_en: data.rewardTimeline_en,
            reward_timeline_zh_cn: data.rewardTimeline_zh_cn,
            note_en: data.note_en,
            note_zh_cn: data.note_zh_cn,
            tags_en: data.tags_en,
            tags_zh_cn: data.tags_zh_cn,
            languages_completed: completedLanguages,
          },
        }),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || 'Save failed');
      }

      toast.success('已儲存！');
    } catch (error: any) {
      console.error('Save error:', error);
      toast.error('儲存失敗：' + error.message);
    } finally {
      setIsSaving(false);
    }
  };

  if (!staticCard) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <p className="text-gray-500 dark:text-gray-400">找不到此信用卡</p>
          <Button className="mt-4" onClick={() => router.push("/admin/cards")}>
            返回列表
          </Button>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
      </div>
    );
  }

  // Get current locale values
  const currentName = currentLocale === 'zh-HK' ? data.name : getFieldValue('name') as string;
  const currentBank = currentLocale === 'zh-HK' ? data.bank : getFieldValue('bank') as string;
  const currentWelcomeOffer = getFieldValue('welcomeOfferText') as string;
  const currentSellingPoints = (getFieldValue('sellingPoints') || []) as string[];
  const currentFeeWaiver = getFieldValue('feeWaiverCondition') as string;
  const currentRewardTimeline = getFieldValue('rewardTimeline') as string;
  const currentNote = getFieldValue('note') as string;
  const currentTags = (getFieldValue('tags') || []) as string[];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <button 
            className="text-sm text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 flex items-center gap-1" 
            onClick={() => router.push('/admin/cards')}
          >
            <ArrowLeft className="h-4 w-4" />
            返回信用卡列表
          </button>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
            編輯 {staticCard.name}
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            編輯多語言內容
          </p>
        </div>
        
        <Button onClick={handleSave} disabled={isSaving} className="gap-2">
          {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
          儲存
        </Button>
      </div>

      {/* Language Tabs */}
      <LanguageTabs
        value={currentLocale}
        onChange={setCurrentLocale}
        completedLanguages={completedLanguages}
        onAutoTranslate={autoTranslate}
        isTranslating={isTranslating}
      />

      {/* Info Banner */}
      {currentLocale === 'zh-HK' && (
        <div className="flex items-start gap-3 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
          <Info className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5" />
          <div className="text-sm text-blue-800 dark:text-blue-200">
            <p className="font-medium">繁體中文內容由 cards.ts 管理</p>
            <p className="mt-1 text-blue-700 dark:text-blue-300">
              繁體中文版本的內容來自靜態檔案。如需修改，請編輯 <code className="bg-blue-100 dark:bg-blue-800 px-1 rounded">lib/data/cards.ts</code>。
              此頁面主要用於編輯簡體中文和英文翻譯。
            </p>
          </div>
        </div>
      )}

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Form */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>基本資料</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">卡片名稱</label>
                  <Input
                    value={currentName}
                    onChange={(e) => setFieldValue('name', e.target.value)}
                    disabled={currentLocale === 'zh-HK'}
                    className="mt-1"
                    placeholder={currentLocale === 'zh-HK' ? '(由 cards.ts 管理)' : `輸入${currentLocale === 'zh-CN' ? '简体中文' : 'English'}名稱`}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">發卡銀行</label>
                  <Input
                    value={currentBank}
                    onChange={(e) => setFieldValue('bank', e.target.value)}
                    disabled={currentLocale === 'zh-HK'}
                    className="mt-1"
                    placeholder={currentLocale === 'zh-HK' ? '(由 cards.ts 管理)' : `輸入${currentLocale === 'zh-CN' ? '简体中文' : 'English'}名稱`}
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium">迎新優惠</label>
                <Textarea
                  value={currentWelcomeOffer || ''}
                  onChange={(e) => setFieldValue('welcomeOfferText', e.target.value)}
                  disabled={currentLocale === 'zh-HK'}
                  className="mt-1"
                  rows={2}
                  placeholder={currentLocale === 'zh-HK' ? '(由 cards.ts 管理)' : '輸入迎新優惠內容'}
                />
              </div>

              <div>
                <label className="text-sm font-medium">年費豁免條件</label>
                <Input
                  value={currentFeeWaiver || ''}
                  onChange={(e) => setFieldValue('feeWaiverCondition', e.target.value)}
                  disabled={currentLocale === 'zh-HK'}
                  className="mt-1"
                  placeholder={currentLocale === 'zh-HK' ? '(由 cards.ts 管理)' : '輸入年費豁免條件'}
                />
              </div>

              <div>
                <label className="text-sm font-medium">回贈時間</label>
                <Input
                  value={currentRewardTimeline || ''}
                  onChange={(e) => setFieldValue('rewardTimeline', e.target.value)}
                  disabled={currentLocale === 'zh-HK'}
                  className="mt-1"
                  placeholder={currentLocale === 'zh-HK' ? '(由 cards.ts 管理)' : '輸入回贈時間說明'}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>賣點 (Selling Points)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {currentSellingPoints.map((point, idx) => (
                <div key={idx} className="flex gap-2">
                  <Input
                    value={point}
                    onChange={(e) => {
                      const newPoints = [...currentSellingPoints];
                      newPoints[idx] = e.target.value;
                      setFieldValue('sellingPoints', newPoints);
                    }}
                    disabled={currentLocale === 'zh-HK'}
                    placeholder={`賣點 ${idx + 1}`}
                  />
                  {currentLocale !== 'zh-HK' && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        const newPoints = currentSellingPoints.filter((_, i) => i !== idx);
                        setFieldValue('sellingPoints', newPoints);
                      }}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
              {currentLocale !== 'zh-HK' && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setFieldValue('sellingPoints', [...currentSellingPoints, ''])}
                  className="gap-1"
                >
                  <Plus className="h-4 w-4" />
                  新增賣點
                </Button>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>詳細說明 (Note)</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                value={currentNote || ''}
                onChange={(e) => setFieldValue('note', e.target.value)}
                disabled={currentLocale === 'zh-HK'}
                className="font-mono text-sm"
                rows={10}
                placeholder={currentLocale === 'zh-HK' ? '(由 cards.ts 管理)' : '輸入詳細說明 (支援 Markdown)'}
              />
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>卡片圖片</CardTitle>
            </CardHeader>
            <CardContent>
              <ImageUpload
                value={data.imageUrl || ''}
                onChange={(url) => setData({ ...data, imageUrl: url })}
                onRemove={() => setData({ ...data, imageUrl: '' })}
                folder="cards"
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>翻譯狀態</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {(['zh-HK', 'zh-CN', 'en'] as const).map((locale) => (
                <div key={locale} className="flex items-center justify-between">
                  <span className="text-sm">
                    {locale === 'zh-HK' ? '🇭🇰 繁體中文' : locale === 'zh-CN' ? '🇨🇳 简体中文' : '🇬🇧 English'}
                  </span>
                  <Badge variant={completedLanguages.includes(locale) ? 'default' : 'secondary'}>
                    {completedLanguages.includes(locale) ? '已完成' : '未完成'}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>標籤 (Tags)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {currentTags.map((tag, idx) => (
                  <Badge key={idx} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>
              {currentLocale === 'zh-HK' && (
                <p className="text-xs text-gray-500 mt-2">標籤由 cards.ts 管理</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

