"use client";

import { CardRecommendationBlock } from "@/components/card-recommendation-block";

export function HkdOnlineShoppingGuide() {
  return (
    <div className="prose prose-lg dark:prose-invert max-w-none">
      <h2>📊 港幣網購信用卡完全攻略</h2>
      
      <p>
        港幣網購（如 HKTVmall、百佳網店、友和 YOHO、淘寶集運等）<strong>唔使俾外幣手續費</strong>，
        所以回贈率直接就係淨回贈！相比外幣網購要扣 1.95% 手續費，港幣網購係真正「食盡」回贈。
      </p>

      <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg my-6">
        <p className="text-blue-800 dark:text-blue-200 font-medium mb-0">
          💡 <strong>港幣網購 = 回贈率即係淨回贈</strong>（無手續費損耗）
        </p>
      </div>

      <hr />

      <h2>🏆 2026 港幣網購回贈排行榜</h2>

      <h3>🥇 第一級：8% 回贈</h3>

      <div className="overflow-x-auto">
        <table>
          <thead>
            <tr>
              <th>排名</th>
              <th>信用卡</th>
              <th>回贈率</th>
              <th>每月上限</th>
              <th>入場門檻</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>🥇 1</td>
              <td><strong>富邦 iN VISA 白金卡</strong></td>
              <td className="text-green-600 dark:text-green-400 font-bold">8%</td>
              <td>$3,290</td>
              <td>月簽 $1,000</td>
            </tr>
            <tr>
              <td>🥈 2</td>
              <td><strong>sim Credit Card</strong></td>
              <td className="text-green-600 dark:text-green-400 font-bold">8%</td>
              <td>$2,500</td>
              <td>單筆 $500 + 月簽非網購 $1,000</td>
            </tr>
            <tr>
              <td>🥈 2</td>
              <td><strong>sim World Mastercard</strong></td>
              <td className="text-green-600 dark:text-green-400 font-bold">8%</td>
              <td>$2,500</td>
              <td>單筆 $500 + 月簽非網購 $1,000</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3>🥈 第二級：6% 回贈</h3>

      <div className="overflow-x-auto">
        <table>
          <thead>
            <tr>
              <th>排名</th>
              <th>信用卡</th>
              <th>回贈率</th>
              <th>每月上限</th>
              <th>入場門檻</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>🥉 4</td>
              <td><strong>AEON WAKUWAKU</strong></td>
              <td className="text-blue-600 dark:text-blue-400 font-bold">6%</td>
              <td>$3,333</td>
              <td>✅ 無門檻</td>
            </tr>
            <tr>
              <td>5</td>
              <td><strong>信銀國際 Motion</strong></td>
              <td className="text-blue-600 dark:text-blue-400 font-bold">6%</td>
              <td>$3,333</td>
              <td>月簽 $3,800</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3>🥉 第三級：4-5% 回贈</h3>

      <div className="overflow-x-auto">
        <table>
          <thead>
            <tr>
              <th>排名</th>
              <th>信用卡</th>
              <th>回贈率</th>
              <th>每月上限</th>
              <th>入場門檻</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>6</td>
              <td><strong>恒生 MMPOWER</strong></td>
              <td>5%</td>
              <td>$10,000</td>
              <td>月簽 $5,000</td>
            </tr>
            <tr>
              <td>7</td>
              <td><strong>中銀 Chill Card</strong></td>
              <td>5%</td>
              <td>$3,260</td>
              <td>✅ 無門檻</td>
            </tr>
            <tr>
              <td>8</td>
              <td><strong>滙豐 Red 信用卡</strong></td>
              <td>4%</td>
              <td>$10,000</td>
              <td>✅ 無門檻</td>
            </tr>
            <tr>
              <td>9</td>
              <td><strong>DBS Live Fresh</strong></td>
              <td>4%</td>
              <td>$4,167</td>
              <td>✅ 無門檻</td>
            </tr>
            <tr>
              <td>10</td>
              <td><strong>東亞 BEA GOAL</strong></td>
              <td>4%</td>
              <td>$5,000</td>
              <td>月簽 $2,000</td>
            </tr>
          </tbody>
        </table>
      </div>

      <hr />

      <h2>📱 各卡詳細分析</h2>

      <h3>🥇 富邦 iN VISA 白金卡 - 網購回贈率最高！</h3>

      <CardRecommendationBlock
        cards={[
          { cardId: "fubon-incard", reason: "🏆 網購回贈率最高 8%" }
        ]}
      />

      <div className="overflow-x-auto my-4">
        <table>
          <tbody>
            <tr><td><strong>網上簽賬回贈</strong></td><td className="text-green-600 font-bold">8%</td></tr>
            <tr><td>月簽下限</td><td>$1,000 (2026年新增！)</td></tr>
            <tr><td>月回贈上限</td><td>$263 (簽 $3,290)</td></tr>
            <tr><td>年費</td><td>永久免年費</td></tr>
          </tbody>
        </table>
      </div>

      <p><strong>優點：</strong></p>
      <ul>
        <li>✅ 網購回贈率最高 <strong>8%</strong></li>
        <li>✅ 永久免年費</li>
        <li>✅ 流動支付/八達通增值也計積分</li>
      </ul>

      <p><strong>缺點：</strong></p>
      <ul>
        <li>❌ 2026年新增月簽下限 $1,000（未夠只有 0.4%）</li>
        <li>❌ 上限只有 $3,290/月</li>
      </ul>

      <hr />

      <h3>🥈 sim Credit Card - 交通+網購雙高回贈</h3>

      <CardRecommendationBlock
        cards={[
          { cardId: "sim-credit-card", reason: "交通+網購雙 8% 回贈" }
        ]}
      />

      <div className="overflow-x-auto my-4">
        <table>
          <tbody>
            <tr><td><strong>網上簽賬回贈</strong></td><td className="text-green-600 font-bold">8%</td></tr>
            <tr><td>單筆最低</td><td>$500</td></tr>
            <tr><td>需額外簽非網購</td><td>$1,000/月</td></tr>
            <tr><td>月回贈上限</td><td>$200</td></tr>
          </tbody>
        </table>
      </div>

      <p><strong>優點：</strong></p>
      <ul>
        <li>✅ 回贈率高達 <strong>8%</strong></li>
        <li>✅ 交通（巴士/港鐵/電車）也有 <strong>8%</strong></li>
        <li>✅ 兩大類別可疊加使用</li>
      </ul>

      <p><strong>缺點：</strong></p>
      <ul>
        <li>❌ 單筆需滿 $500</li>
        <li>❌ 需每月簽非網購 $1,000 才享 8%</li>
      </ul>

      <hr />

      <h3>🥉 AEON WAKUWAKU - 無門檻之王</h3>

      <CardRecommendationBlock
        cards={[
          { cardId: "aeon-wakuwaku", reason: "🎯 無門檻 6% 回贈" }
        ]}
      />

      <div className="overflow-x-auto my-4">
        <table>
          <tbody>
            <tr><td><strong>網上簽賬回贈</strong></td><td className="text-blue-600 font-bold">6%</td></tr>
            <tr><td>月簽上限</td><td>$3,333</td></tr>
            <tr><td>入場門檻</td><td className="text-green-600">✅ 無</td></tr>
            <tr><td>年費</td><td>永久免年費</td></tr>
          </tbody>
        </table>
      </div>

      <p><strong>優點：</strong></p>
      <ul>
        <li>✅ <strong>無入場門檻</strong>，簽幾多都有 6%</li>
        <li>✅ 日本簽賬額外 3% 回贈</li>
        <li>✅ 永久免年費</li>
        <li>✅ 每月 20 日 AEON 95折</li>
      </ul>

      <p><strong>缺點：</strong></p>
      <ul>
        <li>❌ 回贈率比富邦/sim 低</li>
        <li>❌ 網上/日本/餐飲共用 $200 回贈上限</li>
      </ul>

      <hr />

      <h3>🔥 滙豐 Red 卡 - 上限最高推薦！</h3>

      <CardRecommendationBlock
        cards={[
          { cardId: "hsbc-red", reason: "📈 上限最高 $10,000/月" }
        ]}
      />

      <div className="overflow-x-auto my-4">
        <table>
          <tbody>
            <tr><td><strong>網上簽賬回贈</strong></td><td>4%</td></tr>
            <tr><td>月簽上限</td><td className="text-green-600 font-bold">$10,000</td></tr>
            <tr><td>入場門檻</td><td className="text-green-600">✅ 無</td></tr>
            <tr><td>年費</td><td>永久免年費</td></tr>
          </tbody>
        </table>
      </div>

      <p><strong>優點：</strong></p>
      <ul>
        <li>✅ <strong>無入場門檻</strong></li>
        <li>✅ 上限高達 <strong>$10,000/月</strong>（每月 $400 回贈）</li>
        <li>✅ 永久免年費</li>
        <li>✅ 指定商戶另有 8%（壽司郎/譚仔/GU 等）</li>
        <li>✅ 麥當勞 App 簽賬高達 16.5%</li>
      </ul>

      <p><strong>缺點：</strong></p>
      <ul>
        <li>❌ 回贈率只有 4%</li>
        <li>❌ 網上繳費/電子錢包/保費不計</li>
      </ul>

      <hr />

      <h3>💎 信銀國際 Motion - 食肆+網購雙高</h3>

      <CardRecommendationBlock
        cards={[
          { cardId: "cncbi-motion", reason: "食肆+網購 6% 回贈" }
        ]}
      />

      <div className="overflow-x-auto my-4">
        <table>
          <tbody>
            <tr><td><strong>網上簽賬回贈</strong></td><td className="text-blue-600 font-bold">6%</td></tr>
            <tr><td>月簽門檻</td><td>$3,800</td></tr>
            <tr><td>月回贈上限</td><td>$200</td></tr>
          </tbody>
        </table>
      </div>

      <p><strong>優點：</strong></p>
      <ul>
        <li>✅ 食肆 + 網購都有 <strong>6%</strong></li>
        <li>✅ 適合經常外出用膳的用家</li>
      </ul>

      <p><strong>缺點：</strong></p>
      <ul>
        <li>❌ 需月簽滿 $3,800 才有 6%</li>
        <li>❌ 未夠門檻只有 0.55%</li>
      </ul>

      <hr />

      <h2>💡 識玩攻略</h2>

      <h3>1️⃣ 按月簽金額選卡</h3>

      <div className="overflow-x-auto">
        <table>
          <thead>
            <tr>
              <th>月簽金額</th>
              <th>推薦信用卡</th>
              <th>原因</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>&lt; $1,000</td>
              <td><strong>AEON WAKUWAKU</strong></td>
              <td>無入場門檻，直接 6%</td>
            </tr>
            <tr>
              <td>$1,000-$3,000</td>
              <td><strong>富邦 iN VISA</strong></td>
              <td>8% 最高回贈</td>
            </tr>
            <tr>
              <td>$3,000-$5,000</td>
              <td><strong>滙豐 Red</strong></td>
              <td>上限高，無門檻 4%</td>
            </tr>
            <tr>
              <td>&gt; $5,000</td>
              <td><strong>恒生 MMPOWER</strong></td>
              <td>5% + 上限 $500</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3>2️⃣ 多卡配合策略（月網購 $10,000）</h3>

      <div className="overflow-x-auto">
        <table>
          <thead>
            <tr>
              <th>順序</th>
              <th>信用卡</th>
              <th>簽賬金額</th>
              <th>回贈</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1️⃣</td>
              <td>富邦 iN VISA</td>
              <td>$3,290</td>
              <td>$263 (8%)</td>
            </tr>
            <tr>
              <td>2️⃣</td>
              <td>AEON WAKUWAKU</td>
              <td>$3,333</td>
              <td>$200 (6%)</td>
            </tr>
            <tr>
              <td>3️⃣</td>
              <td>滙豐 Red</td>
              <td>$3,377</td>
              <td>$135 (4%)</td>
            </tr>
            <tr className="font-bold bg-green-50 dark:bg-green-900/30">
              <td>合計</td>
              <td>-</td>
              <td>$10,000</td>
              <td className="text-green-600">$598 (5.98%)</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3>3️⃣ 指定商戶額外優惠</h3>

      <div className="overflow-x-auto">
        <table>
          <thead>
            <tr>
              <th>商戶</th>
              <th>推薦信用卡</th>
              <th>回贈</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>HKTVmall</td>
              <td>AEON WAKUWAKU / 富邦 iN</td>
              <td>6-8%</td>
            </tr>
            <tr>
              <td>百佳網店</td>
              <td>渣打 Smart（特約商戶）</td>
              <td>5%</td>
            </tr>
            <tr>
              <td>Netflix / Spotify</td>
              <td>渣打 Smart（特約商戶）</td>
              <td>5%</td>
            </tr>
            <tr>
              <td>麥當勞 App</td>
              <td>滙豐 Red</td>
              <td className="text-green-600 font-bold">16.5%</td>
            </tr>
            <tr>
              <td>Amazon JP（港幣結算）</td>
              <td>AEON WAKUWAKU</td>
              <td>6%</td>
            </tr>
          </tbody>
        </table>
      </div>

      <hr />

      <h2>🆚 港幣網購 vs 外幣網購</h2>

      <div className="overflow-x-auto">
        <table>
          <thead>
            <tr>
              <th>項目</th>
              <th>港幣網購</th>
              <th>外幣網購</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>外幣手續費</td>
              <td className="text-green-600">❌ 無</td>
              <td className="text-red-600">⚠️ 1.95%</td>
            </tr>
            <tr>
              <td>淨回贈計算</td>
              <td>回贈率即淨回贈</td>
              <td>回贈率 - 1.95%</td>
            </tr>
            <tr>
              <td>例：8% 卡</td>
              <td className="text-green-600 font-bold">淨 8%</td>
              <td className="text-orange-600">淨 6.05%</td>
            </tr>
            <tr>
              <td>推薦卡</td>
              <td>富邦/AEON/滙豐 Red</td>
              <td>渣打 Smart（免手續費）</td>
            </tr>
          </tbody>
        </table>
      </div>

      <hr />

      <h2>🎯 總結推薦</h2>

      <CardRecommendationBlock
        cards={[
          { cardId: "fubon-incard", reason: "🏆 網購 8% 最高回贈" },
          { cardId: "aeon-wakuwaku", reason: "🎯 無門檻首選 6%" },
          { cardId: "hsbc-red", reason: "📈 上限最高 $10,000/月" },
          { cardId: "sim-credit-card", reason: "🚃 交通+網購雙 8%" },
          { cardId: "cncbi-motion", reason: "🍽️ 食肆+網購 6%" },
        ]}
      />

      <div className="bg-amber-50 dark:bg-amber-900/30 p-4 rounded-lg my-6">
        <p className="text-amber-800 dark:text-amber-200 font-medium mb-0">
          💡 <strong>溫馨提示</strong>：網購回贈通常不計電子錢包充值（PayMe/AlipayHK/WeChat Pay）、
          繳費、保險等。詳細條款請參閱各信用卡官網。
        </p>
      </div>
    </div>
  );
}

export const hkdOnlineShoppingFaqData = [
  {
    question: "港幣網購邊張卡最抵？",
    answer: "富邦 iN VISA 白金卡 8% 回贈率最高，但需月簽滿 $1,000。如果簽唔夠門檻，AEON WAKUWAKU 無門檻 6% 係最佳選擇。"
  },
  {
    question: "點解港幣網購比外幣網購抵？",
    answer: "港幣網購無外幣手續費（1.95%），回贈率即係淨回贈。例如 8% 卡港幣網購淨袋 8%，但外幣網購只淨袋 6.05%。"
  },
  {
    question: "HKTVmall 用邊張卡最抵？",
    answer: "HKTVmall 係港幣網購，推薦富邦 iN VISA（8%）或 AEON WAKUWAKU（6% 無門檻）。"
  },
  {
    question: "麥當勞 App 用邊張卡？",
    answer: "滙豐 Red 卡！麥當勞印花獎賞 + 網上 4% 回贈，最高可達 16.5% 回贈。"
  },
  {
    question: "Netflix/Spotify 計唔計網購？",
    answer: "計！Netflix/Spotify 屬於網上簽賬。推薦渣打 Smart 卡（特約商戶 5%）或 AEON WAKUWAKU（6%）。"
  },
  {
    question: "多張卡點配合用？",
    answer: "建議順序：1. 富邦 iN（$3,290 @ 8%）→ 2. AEON WAKUWAKU（$3,333 @ 6%）→ 3. 滙豐 Red（餘額 @ 4%）。月簽 $10,000 可賺約 $600 回贈。"
  }
];

