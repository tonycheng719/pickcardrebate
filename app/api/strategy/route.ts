import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { HK_CARDS } from "@/lib/data/cards";
import { findBestCards } from "@/lib/logic/calculator";

export const dynamic = 'force-dynamic';

// 類別對應
const CATEGORIES = [
  { id: 'supermarket', name: '超市', field: 'supermarket_monthly' },
  { id: 'dining', name: '餐飲', field: 'dining_monthly' },
  { id: 'online', name: '網購', field: 'online_monthly' },
  { id: 'transport', name: '交通', field: 'transport_monthly' },
  { id: 'overseas', name: '海外/旅遊', field: 'overseas_monthly' },
  { id: 'entertainment', name: '娛樂', field: 'entertainment_monthly' },
  { id: 'utilities', name: '水電煤', field: 'utilities_monthly' },
  { id: 'other', name: '其他', field: 'other_monthly' },
];

// 獲取用戶消費習慣檔案
export async function GET(request: NextRequest) {
  const supabase = await createClient();
  
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  
  const { data: profile } = await supabase
    .from('user_spending_profiles')
    .select('*')
    .eq('user_id', user.id)
    .single();
  
  const { data: strategies } = await supabase
    .from('card_strategies')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })
    .limit(10);
  
  return NextResponse.json({
    profile: profile || null,
    strategies: strategies || [],
    categories: CATEGORIES,
  });
}

// 計算最佳卡組合
export async function POST(request: NextRequest) {
  const supabase = await createClient();
  
  const { data: { user } } = await supabase.auth.getUser();
  
  const body = await request.json();
  const {
    supermarket_monthly = 0,
    dining_monthly = 0,
    online_monthly = 0,
    transport_monthly = 0,
    overseas_monthly = 0,
    entertainment_monthly = 0,
    utilities_monthly = 0,
    other_monthly = 0,
    prefer_miles = false,
    no_annual_fee_only = false,
    max_cards = 3,
    save_profile = false,
  } = body;
  
  // 過濾卡片
  let availableCards = HK_CARDS.filter(card => {
    if (no_annual_fee_only && card.annualFee && card.annualFee > 0) {
      // 檢查是否有免年費條件
      if (!card.feeWaiverCondition?.includes('免年費') && 
          !card.feeWaiverCondition?.includes('首年免')) {
        return false;
      }
    }
    return true;
  });
  
  // 為每個類別找最佳卡
  const categoryBestCards: Record<string, any[]> = {};
  const categoryAmounts: Record<string, number> = {
    supermarket: supermarket_monthly,
    dining: dining_monthly,
    online: online_monthly,
    transport: transport_monthly,
    overseas: overseas_monthly,
    entertainment: entertainment_monthly,
    utilities: utilities_monthly,
    other: other_monthly,
  };
  
  // 類別查詢對應
  const categoryQueries: Record<string, string> = {
    supermarket: '超市',
    dining: '餐飲',
    online: '網購',
    transport: '交通',
    overseas: '海外',
    entertainment: '娛樂',
    utilities: '繳費',
    other: '其他',
  };
  
  for (const [category, amount] of Object.entries(categoryAmounts)) {
    if (amount > 0) {
      const results = findBestCards(categoryQueries[category], {
        amount,
        isForeignCurrency: category === 'overseas',
      });
      categoryBestCards[category] = results.slice(0, 5);
    }
  }
  
  // 貪心演算法選擇最佳組合
  const selectedCards: Map<string, { card: any; categories: string[]; totalReward: number }> = new Map();
  const categoryAllocation: Record<string, string> = {};
  
  // 按金額排序類別（優先處理大額消費）
  const sortedCategories = Object.entries(categoryAmounts)
    .filter(([_, amount]) => amount > 0)
    .sort((a, b) => b[1] - a[1]);
  
  for (const [category, amount] of sortedCategories) {
    const bestCards = categoryBestCards[category] || [];
    
    // 找最佳卡（考慮已選卡片和上限）
    let bestOption: { cardId: string; reward: number } | null = null;
    
    for (const result of bestCards) {
      const cardId = result.card.id;
      const reward = (result.percentage / 100) * amount;
      
      // 如果這張卡已選，累加回贈
      if (selectedCards.has(cardId)) {
        if (!bestOption || reward > bestOption.reward) {
          bestOption = { cardId, reward };
        }
        continue;
      }
      
      // 如果還有名額，考慮新卡
      if (selectedCards.size < max_cards) {
        if (!bestOption || reward > bestOption.reward) {
          bestOption = { cardId, reward };
        }
      }
    }
    
    if (bestOption) {
      categoryAllocation[category] = bestOption.cardId;
      
      if (selectedCards.has(bestOption.cardId)) {
        const existing = selectedCards.get(bestOption.cardId)!;
        existing.categories.push(category);
        existing.totalReward += bestOption.reward;
      } else {
        const cardData = HK_CARDS.find(c => c.id === bestOption.cardId);
        selectedCards.set(bestOption.cardId, {
          card: cardData,
          categories: [category],
          totalReward: bestOption.reward,
        });
      }
    }
  }
  
  // 計算總回贈
  let totalMonthlyReward = 0;
  const cardDetails: any[] = [];
  
  selectedCards.forEach((data, cardId) => {
    totalMonthlyReward += data.totalReward;
    cardDetails.push({
      cardId,
      cardName: data.card?.name || cardId,
      bank: data.card?.bank || '',
      categories: data.categories.map(c => ({
        id: c,
        name: CATEGORIES.find(cat => cat.id === c)?.name || c,
        amount: categoryAmounts[c],
        reward: (categoryBestCards[c]?.find(r => r.card.id === cardId)?.percentage || 0) / 100 * categoryAmounts[c],
      })),
      totalReward: data.totalReward,
    });
  });
  
  // 計算單卡策略回贈（用最佳單卡）
  const totalSpending = Object.values(categoryAmounts).reduce((a, b) => a + b, 0);
  const singleCardResults = findBestCards('其他', { amount: totalSpending });
  const singleCardReward = singleCardResults[0] 
    ? (singleCardResults[0].percentage / 100) * totalSpending 
    : 0;
  
  const improvementPercentage = singleCardReward > 0 
    ? ((totalMonthlyReward - singleCardReward) / singleCardReward * 100)
    : 0;
  
  // 儲存檔案（如果用戶已登入且要求儲存）
  if (user && save_profile) {
    await supabase.from('user_spending_profiles').upsert({
      user_id: user.id,
      supermarket_monthly,
      dining_monthly,
      online_monthly,
      transport_monthly,
      overseas_monthly,
      entertainment_monthly,
      utilities_monthly,
      other_monthly,
      prefer_miles,
      no_annual_fee_only,
      max_cards,
      updated_at: new Date().toISOString(),
    }, {
      onConflict: 'user_id',
    });
  }
  
  return NextResponse.json({
    success: true,
    strategy: {
      cards: cardDetails,
      categoryAllocation,
      totalMonthlyReward: Math.round(totalMonthlyReward * 100) / 100,
      totalYearlyReward: Math.round(totalMonthlyReward * 12 * 100) / 100,
      singleCardReward: Math.round(singleCardReward * 100) / 100,
      improvementPercentage: Math.round(improvementPercentage * 100) / 100,
      totalSpending,
    },
    categories: CATEGORIES,
  });
}

