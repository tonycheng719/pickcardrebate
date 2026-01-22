"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Loader2, Check, AlertCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export type AdminLocale = 'zh-HK' | 'zh-CN' | 'en';

interface LanguageTabsProps {
  value: AdminLocale;
  onChange: (locale: AdminLocale) => void;
  completedLanguages?: string[];
  onAutoTranslate?: (targetLocale: 'zh-CN' | 'en') => Promise<void>;
  isTranslating?: boolean;
  className?: string;
}

export function LanguageTabs({
  value,
  onChange,
  completedLanguages = ['zh-HK'],
  onAutoTranslate,
  isTranslating = false,
  className = '',
}: LanguageTabsProps) {
  const locales: { value: AdminLocale; label: string; flag: string }[] = [
    { value: 'zh-HK', label: '繁體中文', flag: '🇭🇰' },
    { value: 'zh-CN', label: '简体中文', flag: '🇨🇳' },
    { value: 'en', label: 'English', flag: '🇬🇧' },
  ];

  const isCompleted = (locale: AdminLocale) => completedLanguages.includes(locale);

  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <Tabs value={value} onValueChange={(v) => onChange(v as AdminLocale)}>
        <TabsList>
          {locales.map(({ value: localeValue, label, flag }) => (
            <TabsTrigger key={localeValue} value={localeValue} className="gap-2">
              <span>{flag}</span>
              <span>{label}</span>
              {isCompleted(localeValue) ? (
                <Check className="h-3 w-3 text-green-500" />
              ) : (
                <AlertCircle className="h-3 w-3 text-orange-500" />
              )}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      {onAutoTranslate && value !== 'zh-HK' && (
        <Button
          variant="outline"
          size="sm"
          onClick={() => onAutoTranslate(value as 'zh-CN' | 'en')}
          disabled={isTranslating}
          className="gap-2"
        >
          {isTranslating ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              翻譯中...
            </>
          ) : (
            <>
              <Sparkles className="h-4 w-4" />
              自動翻譯
            </>
          )}
        </Button>
      )}
    </div>
  );
}

/**
 * Hook to manage multi-language content editing
 */
export function useMultiLangEditor<T extends Record<string, any>>(
  initialData: T,
  langFields: string[]
) {
  const [currentLocale, setCurrentLocale] = useState<AdminLocale>('zh-HK');
  const [data, setData] = useState<T>(initialData);
  const [isTranslating, setIsTranslating] = useState(false);

  // Get field value for current locale
  const getFieldValue = (field: string): string | string[] => {
    if (currentLocale === 'zh-HK') {
      return data[field] || '';
    }
    const suffix = currentLocale === 'zh-CN' ? '_zh_cn' : '_en';
    return data[`${field}${suffix}`] || '';
  };

  // Set field value for current locale
  const setFieldValue = (field: string, value: string | string[]) => {
    if (currentLocale === 'zh-HK') {
      setData({ ...data, [field]: value });
    } else {
      const suffix = currentLocale === 'zh-CN' ? '_zh_cn' : '_en';
      setData({ ...data, [`${field}${suffix}`]: value });
    }
  };

  // Auto-translate all specified fields
  const autoTranslate = async (targetLocale: 'zh-CN' | 'en') => {
    setIsTranslating(true);
    try {
      const textsToTranslate: { field: string; value: string | string[] }[] = [];
      
      for (const field of langFields) {
        const sourceValue = data[field];
        if (sourceValue) {
          textsToTranslate.push({ field, value: sourceValue });
        }
      }

      if (textsToTranslate.length === 0) {
        toast.error('沒有內容可翻譯');
        return;
      }

      // Translate each field
      const suffix = targetLocale === 'zh-CN' ? '_zh_cn' : '_en';
      const updates: Partial<T> = {};

      for (const { field, value } of textsToTranslate) {
        const isArray = Array.isArray(value);
        const res = await fetch('/api/admin/translate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            text: value,
            targetLocale,
            context: 'credit card or financial product',
          }),
        });

        if (!res.ok) {
          throw new Error('Translation failed');
        }

        const { translated } = await res.json();
        (updates as any)[`${field}${suffix}`] = translated;
      }

      // Update languages_completed
      const completedLangs = data.languagesCompleted || ['zh-HK'];
      if (!completedLangs.includes(targetLocale)) {
        (updates as any).languagesCompleted = [...completedLangs, targetLocale];
      }

      setData({ ...data, ...updates });
      toast.success(`已翻譯為${targetLocale === 'zh-CN' ? '简体中文' : 'English'}`);
    } catch (error: any) {
      console.error('Translation error:', error);
      toast.error('翻譯失敗：' + error.message);
    } finally {
      setIsTranslating(false);
    }
  };

  return {
    currentLocale,
    setCurrentLocale,
    data,
    setData,
    getFieldValue,
    setFieldValue,
    autoTranslate,
    isTranslating,
    completedLanguages: data.languagesCompleted || ['zh-HK'],
  };
}

