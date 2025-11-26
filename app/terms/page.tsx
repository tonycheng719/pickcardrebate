import { Navbar } from "@/components/navbar";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col">
      <Navbar />
      
      <main className="container mx-auto px-4 py-12 max-w-3xl">
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border dark:border-gray-800 p-8 md:p-12 space-y-8">
          <div className="border-b dark:border-gray-800 pb-6">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">服務條款</h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm">最後更新日期：2024年11月27日</p>
          </div>

          <div className="prose dark:prose-invert max-w-none space-y-6 text-gray-700 dark:text-gray-300">
            <section>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">1. 同意條款</h2>
              <p>
                歡迎使用 PickCardRebate（以下簡稱「本服務」）。當您存取或使用本網站時，即表示您已閱讀、瞭解並同意接受本服務條款之所有內容。如果您不同意本條款的任何部分，請立即停止使用本服務。
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">2. 服務內容</h2>
              <p>
                PickCardRebate 是一個信用卡回贈比較與資訊平台，提供信用卡優惠查詢、回贈計算、以及相關財務資訊整理。我們致力於提供準確的資訊，但所有資訊僅供參考，實際優惠內容以各發卡銀行或商戶之官方公告為準。
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">3. 會員註冊與帳號安全</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>您同意提供正確、最新及完整的個人資料。</li>
                <li>您有責任維護帳號及密碼的機密安全。任何使用該帳號及密碼所進行的行動，將被視為您的行為，並由您負完全責任。</li>
                <li>若發現帳號遭盜用或有安全漏洞，請立即通知我們。</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">4. 使用者行為</h2>
              <p>您承諾絕不為任何非法目的或以任何非法方式使用本服務，並承諾遵守香港特別行政區相關法規及一切使用網際網路之國際慣例。您同意並保證不得利用本服務從事侵害他人權益或違法之行為。</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">5. 免責聲明</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>本服務所提供的信用卡資訊、優惠活動、回贈比例等，均來自銀行或公開資訊。由於銀行政策可能隨時變更，我們不保證所有資訊的即時性與絕對正確性。</li>
                <li>本服務不提供任何金融產品的直接銷售或核批服務。所有信用卡申請與核准與否，均由發卡機構全權決定。</li>
                <li>對於因使用本服務或無法使用本服務而造成的任何直接、間接、附帶或衍生之損害，本服務不負任何賠償責任。</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">6. 服務變更與終止</h2>
              <p>
                我們保留隨時修改、暫停或終止本服務之權利，恕不另行通知。我們亦得依據判斷，於任何時間修改本服務條款。修改後的條款一經公佈即生效，您繼續使用本服務即代表同意相關變更。
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">7. 聯絡我們</h2>
              <p>
                如您對本服務條款有任何疑問，請透過 Email 聯繫我們：support@pickcardrebate.hk
              </p>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}

