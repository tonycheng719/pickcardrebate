import { Metadata } from 'next';
import { Locale, locales } from '@/lib/i18n/config';
import { getTranslation } from '@/lib/i18n/translations';
import CalculatorClient from './calculator-client';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = getTranslation(locale as Locale);
  
  return {
    title: t.seo.calculatorTitle,
    description: t.seo.calculatorDescription,
  };
}

export default async function CalculatorPage({ params }: PageProps) {
  const { locale } = await params;
  
  return <CalculatorClient locale={locale as Locale} />;
}


