import { Navbar } from "@/components/navbar";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col">
      <Navbar />
      
      <main className="container mx-auto px-4 py-12 max-w-3xl">
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border dark:border-gray-800 p-8 md:p-12 space-y-8">
          <div className="border-b dark:border-gray-800 pb-6">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">隱私權政策</h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm">最後更新日期：2024年11月27日</p>
          </div>

          <div className="prose dark:prose-invert max-w-none space-y-6 text-gray-700 dark:text-gray-300">
            <section>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">1. 前言</h2>
              <p>
                PickCardRebate（以下簡稱「我們」）非常重視您的隱私權。本隱私權政策旨在說明我們如何收集、使用、保護及分享您的個人資訊。使用本服務即代表您同意本政策所述之資料處理方式。
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">2. 我們收集的資訊</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>帳戶資訊：</strong>當您註冊時，我們會收集您的姓名、電子郵件地址、性別及居住地區等資訊。</li>
                <li><strong>使用數據：</strong>我們會自動收集您與服務互動的資訊，包括 IP 位址、瀏覽器類型、存取時間、點擊記錄及搜尋偏好（例如您關注的信用卡或商戶）。</li>
                <li><strong>Cookies 與追蹤技術：</strong>我們使用 Cookies 來改善使用者體驗、記住您的偏好設定及進行流量分析。</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">3. 資訊的使用方式</h2>
              <p>我們收集的資訊主要用於：</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>提供、維護及改善我們的服務功能。</li>
                <li>個人化您的使用體驗，推薦適合您的信用卡優惠。</li>
                <li>發送服務通知、更新及行銷訊息（您可以隨時選擇取消訂閱）。</li>
                <li>分析使用趨勢，以優化系統效能與內容品質。</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">4. 資訊的分享與揭露</h2>
              <p>除非獲得您的同意或法律要求，否則我們不會將您的個人資訊出售或出租給第三方。我們可能會在以下情況分享資訊：</p>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>服務供應商：</strong>協助我們營運網站、處理數據或執行相關業務的合作夥伴（均受保密協議約束）。</li>
                <li><strong>法律遵循：</strong>為遵守法律程序、法院命令或政府要求。</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">5. 資料安全</h2>
              <p>
                我們採取業界標準的安全措施來保護您的個人資訊，包括資料加密、存取控制等。然而，網際網路傳輸無法保證百分之百安全，請您妥善保管您的帳號密碼。
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">6. 用戶權利</h2>
              <p>
                您有權隨時查詢、更正或刪除您的個人資訊。您可以透過「帳戶設定」頁面管理您的資料，或透過 Email 聯繫我們請求協助。
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">7. 政策更新</h2>
              <p>
                我們可能會不時更新本隱私權政策。重大變更時，我們會在網站上發布公告或透過 Email 通知您。
              </p>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}



