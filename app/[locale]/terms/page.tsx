import { Metadata } from 'next';
import { Locale, locales } from '@/lib/i18n/config';
import { getTranslation } from '@/lib/i18n/translations';
import { Navbar } from '@/components/navbar';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  
  const titles: Record<Locale, string> = {
    'zh-HK': '服務條款 | PickCardRebate',
    'zh-CN': '服务条款 | PickCardRebate',
    'en': 'Terms of Service | PickCardRebate',
  };
  
  return {
    title: titles[locale as Locale] || titles['zh-HK'],
  };
}

export default async function TermsPage({ params }: PageProps) {
  const { locale: localeParam } = await params;
  const locale = localeParam as Locale;

  const content = locale === 'en' ? {
    title: 'Terms of Service',
    intro: 'Welcome to PickCardRebate. By using our website and services, you agree to these Terms of Service.',
    sections: [
      { title: '1. Acceptance of Terms', content: 'By accessing and using PickCardRebate, you accept and agree to be bound by these Terms of Service and our Privacy Policy.' },
      { title: '2. Description of Service', content: 'PickCardRebate provides credit card rebate comparison and calculation tools. The information provided is for reference only and may not reflect the most current bank terms.' },
      { title: '3. User Accounts', content: 'You are responsible for maintaining the confidentiality of your account and password. You agree to accept responsibility for all activities that occur under your account.' },
      { title: '4. Disclaimer', content: 'The information on this website is provided "as is" without warranty of any kind. We do not guarantee the accuracy or completeness of any information.' },
      { title: '5. Limitation of Liability', content: 'PickCardRebate shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of the service.' },
      { title: '6. Changes to Terms', content: 'We reserve the right to modify these terms at any time. Continued use of the service after changes constitutes acceptance of the new terms.' },
    ],
    lastUpdated: 'Last updated: January 2025',
  } : locale === 'zh-CN' ? {
    title: '服务条款',
    intro: '欢迎使用 PickCardRebate。使用我们的网站和服务即表示您同意这些服务条款。',
    sections: [
      { title: '1. 接受条款', content: '通过访问和使用 PickCardRebate，您接受并同意受这些服务条款和我们的隐私政策的约束。' },
      { title: '2. 服务描述', content: 'PickCardRebate 提供信用卡回赠比较和计算工具。提供的信息仅供参考，可能不反映最新的银行条款。' },
      { title: '3. 用户账户', content: '您有责任维护您的账户和密码的保密性。您同意对您账户下发生的所有活动承担责任。' },
      { title: '4. 免责声明', content: '本网站上的信息"按原样"提供，不提供任何形式的保证。我们不保证任何信息的准确性或完整性。' },
      { title: '5. 责任限制', content: 'PickCardRebate 不对因您使用服务而产生的任何间接、偶然、特殊或后果性损害承担责任。' },
      { title: '6. 条款变更', content: '我们保留随时修改这些条款的权利。在变更后继续使用服务即表示接受新条款。' },
    ],
    lastUpdated: '最后更新：2025年1月',
  } : {
    title: '服務條款',
    intro: '歡迎使用 PickCardRebate。使用我們的網站和服務即表示您同意這些服務條款。',
    sections: [
      { title: '1. 接受條款', content: '透過存取和使用 PickCardRebate，您接受並同意受這些服務條款和我們的私隱政策的約束。' },
      { title: '2. 服務描述', content: 'PickCardRebate 提供信用卡回贈比較和計算工具。提供的資訊僅供參考，可能不反映最新的銀行條款。' },
      { title: '3. 用戶帳戶', content: '您有責任維護您的帳戶和密碼的保密性。您同意對您帳戶下發生的所有活動承擔責任。' },
      { title: '4. 免責聲明', content: '本網站上的資訊「按原樣」提供，不提供任何形式的保證。我們不保證任何資訊的準確性或完整性。' },
      { title: '5. 責任限制', content: 'PickCardRebate 不對因您使用服務而產生的任何間接、偶然、特殊或後果性損害承擔責任。' },
      { title: '6. 條款變更', content: '我們保留隨時修改這些條款的權利。在變更後繼續使用服務即表示接受新條款。' },
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


