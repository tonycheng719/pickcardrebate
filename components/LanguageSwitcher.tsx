"use client";

import { useTranslation } from "@/lib/i18n/context";
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Locale, localeNames, localeFlags } from "@/lib/i18n/translations";

const LOCALES: Locale[] = ['zh-HK', 'zh-CN', 'en'];

export function LanguageSwitcher() {
  const { locale, setLocale } = useTranslation();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-2">
          <Globe className="h-4 w-4" />
          <span className="hidden sm:inline">
            {localeNames[locale]}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {LOCALES.map((loc) => (
          <DropdownMenuItem 
            key={loc}
            onClick={() => setLocale(loc)}
            className={locale === loc ? 'bg-accent' : ''}
          >
            {localeFlags[loc]} {localeNames[loc]}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

