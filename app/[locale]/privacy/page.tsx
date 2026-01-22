import { Metadata } from 'next';
import { Locale, urlPaths, getLocaleFromUrlParam } from '@/lib/i18n/config';
import { getTranslation } from '@/lib/i18n/translations';
import { Navbar } from '@/components/navbar';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export function generateStaticParams() {
  return urlPaths.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: localeParam } = await params;
  const locale = getLocaleFromUrlParam(localeParam);
  
  const titles: Record<Locale, string> = {
    'zh-HK': '私隱政策 | PickCardRebate',
    'zh-CN': '隐私政策 | PickCardRebate',
    'en': 'Privacy Policy | PickCardRebate',
  };
  
  return {
    title: titles[locale] || titles['zh-HK'],
  };
}

export default async function PrivacyPage({ params }: PageProps) {
  const { locale: localeParam } = await params;
  const locale = getLocaleFromUrlParam(localeParam);
  const t = getTranslation(locale);

  const content = locale === 'en' ? {
    title: 'Privacy Policy',
    intro: 'PickCardRebate ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you use our website and mobile application.',
    sections: [
      { title: '1. Information We Collect', content: 'We collect information you provide directly, such as your email address when you create an account, and information about your usage of our services.' },
      { title: '2. How We Use Your Information', content: 'We use the information to provide and improve our services, send you relevant notifications, and analyze usage patterns to enhance user experience.' },
      { title: '3. Data Security', content: 'We implement industry-standard security measures to protect your data. However, no method of transmission over the Internet is 100% secure.' },
      { title: '4. Third-Party Services', content: 'We may use third-party services like Google Analytics to analyze usage. These services have their own privacy policies.' },
      { title: '5. Your Rights', content: 'You have the right to access, correct, or delete your personal data. Contact us at info@pickcardrebate.com for any requests.' },
      { title: '6. Changes to This Policy', content: 'We may update this policy from time to time. We will notify you of any significant changes.' },
    ],
    lastUpdated: 'Last updated: January 2025',
  } : locale === 'zh-CN' ? {
    title: '隐私政策',
    intro: 'PickCardRebate（"我们"）致力于保护您的隐私。本隐私政策说明了当您使用我们的网站和移动应用程序时，我们如何收集、使用和保护您的信息。',
    sections: [
      { title: '1. 我们收集的信息', content: '我们收集您直接提供的信息，例如您创建账户时的电子邮件地址，以及有关您使用我们服务的信息。' },
      { title: '2. 我们如何使用您的信息', content: '我们使用这些信息来提供和改进我们的服务，向您发送相关通知，并分析使用模式以增强用户体验。' },
      { title: '3. 数据安全', content: '我们实施行业标准的安全措施来保护您的数据。但是，没有任何通过互联网传输的方法是100%安全的。' },
      { title: '4. 第三方服务', content: '我们可能使用 Google Analytics 等第三方服务来分析使用情况。这些服务有自己的隐私政策。' },
      { title: '5. 您的权利', content: '您有权访问、更正或删除您的个人数据。如有任何请求，请通过 info@pickcardrebate.com 联系我们。' },
      { title: '6. 政策变更', content: '我们可能会不时更新此政策。我们会通知您任何重大变更。' },
    ],
    lastUpdated: '最后更新：2025年1月',
  } : {
    title: '私隱政策',
    intro: 'PickCardRebate（「我們」）致力於保護您的私隱。本私隱政策說明當您使用我們的網站和流動應用程式時，我們如何收集、使用和保護您的資訊。',
    sections: [
      { title: '1. 我們收集的資訊', content: '我們收集您直接提供的資訊，例如您建立帳戶時的電郵地址，以及有關您使用我們服務的資訊。' },
      { title: '2. 我們如何使用您的資訊', content: '我們使用這些資訊來提供和改善我們的服務，向您發送相關通知，並分析使用模式以提升用戶體驗。' },
      { title: '3. 資料安全', content: '我們實施行業標準的安全措施來保護您的資料。然而，沒有任何透過互聯網傳輸的方法是100%安全的。' },
      { title: '4. 第三方服務', content: '我們可能使用 Google Analytics 等第三方服務來分析使用情況。這些服務有其自身的私隱政策。' },
      { title: '5. 您的權利', content: '您有權存取、更正或刪除您的個人資料。如有任何要求，請透過 info@pickcardrebate.com 聯絡我們。' },
      { title: '6. 政策變更', content: '我們可能會不時更新此政策。我們會通知您任何重大變更。' },
    ],
    lastUpdated: '最後更新：2025年1月',
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Navbar />
      
      <main className="max-w-3xl mx-auto px-4 py-12 pb-24">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">{content.title}</h1>
        
        <p className="text-gray-600 dark:text-gray-400 mb-8">{content.intro}</p>
        
        <div className="space-y-6">
          {content.sections.map((section, index) => (
            <div key={index}>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{section.title}</h2>
              <p className="text-gray-600 dark:text-gray-400">{section.content}</p>
            </div>
          ))}
        </div>
        
        <p className="text-sm text-gray-500 mt-8">{content.lastUpdated}</p>
      </main>
    </div>
  );
}


