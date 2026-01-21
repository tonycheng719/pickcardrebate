import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { CATEGORIES } from '@/lib/data/categories';
import { ALL_MERCHANTS } from '@/lib/data/merchants';

function getServiceClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false }
  });
}

export const dynamic = 'force-dynamic';

// GET: 獲取個人化推薦
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json({ error: 'userId required' }, { status: 400 });
    }

    const supabase = getServiceClient();
    if (!supabase) {
      return NextResponse.json({ error: 'Server config error' }, { status: 500 });
    }

    // 1. 獲取用戶的卡包
    const { data: walletData } = await supabase
      .from('user_cards')
      .select('card_ids')
      .eq('user_id', userId)
      .single();

    const userCardIds: string[] = walletData?.card_ids || [];

    if (userCardIds.length === 0) {
      return NextResponse.json({
        recommendations: [],
        message: '請先在卡包添加信用卡以獲取個人化推薦'
      });
    }

    // 2. 獲取用戶的消費記錄（分析消費習慣）
    const { data: transactions } = await supabase
      .from('user_transactions')
      .select('category_id, merchant_name, amount')
      .eq('user_id', userId)
      .order('transaction_date', { ascending: false })
      .limit(100);

    // 3. 分析用戶最常消費的類別
    const categorySpending: Record<string, number> = {};
    const merchantVisits: Record<string, number> = {};

    transactions?.forEach(tx => {
      if (tx.category_id) {
        categorySpending[tx.category_id] = (categorySpending[tx.category_id] || 0) + tx.amount;
      }
      if (tx.merchant_name) {
        merchantVisits[tx.merchant_name] = (merchantVisits[tx.merchant_name] || 0) + 1;
      }
    });

    // 4. 獲取用戶卡片詳情
    const { data: allCards } = await supabase
      .from('cards')
      .select('*');

    const userCards = allCards?.filter(c => userCardIds.includes(c.id)) || [];

    // 5. 根據卡片回贈計算每個商戶/類別的最佳推薦
    const recommendations: any[] = [];

    // 熱門商戶推薦
    const popularMerchants = ALL_MERCHANTS.slice(0, 20);

    for (const merchant of popularMerchants) {
      // 找出這個商戶最適合的卡
      let bestCard = null;
      let bestRebate = 0;
      let bestRebateType = '';

      for (const card of userCards) {
        // 簡化的回贈計算邏輯
        const rebates = card.rebates || [];
        for (const rebate of rebates) {
          // 檢查商戶是否匹配
          const matchesMerchant = rebate.merchants?.some((m: string) => 
            merchant.name.includes(m) || m.includes(merchant.name)
          );
          const matchesCategory = rebate.category === merchant.category || rebate.category === 'all';

          if (matchesMerchant || matchesCategory) {
            const rate = rebate.rate || 0;
            if (rate > bestRebate) {
              bestRebate = rate;
              bestCard = card;
              bestRebateType = rebate.type || 'cashback';
            }
          }
        }

        // 檢查基本回贈
        if (card.baseRebate && card.baseRebate > bestRebate) {
          bestRebate = card.baseRebate;
          bestCard = card;
          bestRebateType = 'cashback';
        }
      }

      if (bestCard && bestRebate > 0) {
        recommendations.push({
          type: 'merchant',
          merchant: {
            id: merchant.id,
            name: merchant.name,
            icon: merchant.icon,
            category: merchant.category,
          },
          bestCard: {
            id: bestCard.id,
            name: bestCard.name,
            bank: bestCard.bank,
            imageUrl: bestCard.imageUrl,
          },
          rebate: bestRebate,
          rebateType: bestRebateType,
          reason: `使用 ${bestCard.name} 可獲 ${bestRebate}% 回贈`,
        });
      }
    }

    // 按回贈率排序
    recommendations.sort((a, b) => b.rebate - a.rebate);

    // 6. 類別推薦（用戶常消費的類別）
    const categoryRecommendations: any[] = [];
    const topCategories = Object.entries(categorySpending)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
      .map(([catId]) => catId);

    for (const catId of topCategories) {
      const category = CATEGORIES.find(c => c.id === catId);
      if (!category) continue;

      let bestCard = null;
      let bestRebate = 0;

      for (const card of userCards) {
        const rebates = card.rebates || [];
        for (const rebate of rebates) {
          if (rebate.category === catId || rebate.category === 'all') {
            const rate = rebate.rate || 0;
            if (rate > bestRebate) {
              bestRebate = rate;
              bestCard = card;
            }
          }
        }
      }

      if (bestCard) {
        categoryRecommendations.push({
          type: 'category',
          category: {
            id: category.id,
            name: category.name,
            icon: category.icon,
          },
          bestCard: {
            id: bestCard.id,
            name: bestCard.name,
            bank: bestCard.bank,
          },
          rebate: bestRebate,
          spending: categorySpending[catId],
          reason: `您在${category.name}類別消費較多`,
        });
      }
    }

    return NextResponse.json({
      recommendations: recommendations.slice(0, 10),
      categoryRecommendations,
      userCardCount: userCardIds.length,
      totalTransactions: transactions?.length || 0,
    });
  } catch (e: any) {
    console.error('Recommendations error:', e);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

