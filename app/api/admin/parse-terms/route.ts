import { NextRequest, NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

// Helper to extract key information from T&C text
function parseTermsContent(content: string, metadata: {
  bankName?: string;
  promoName?: string;
  cardIds?: string[];
  sourceUrl?: string;
}) {
  const result: any = {
    cardId: "",
    cardName: metadata.promoName || "",
    bank: metadata.bankName || "",
    applicableCards: [] as { cardId: string; cardName: string }[],
    documentName: "",
    promoStartDate: "",
    promoEndDate: "",
    rewardCap: null,
    rewardRates: [] as any[],
    exclusions: [] as string[],
    keyTerms: [] as string[],
    officialSource: metadata.sourceUrl || "",
    lastUpdated: new Date().toISOString().split('T')[0],
  };

  // Extract dates (format: YYYY年M月D日 or YYYY/MM/DD or DD/MM/YYYY)
  const datePatterns = [
    /(\d{4})年(\d{1,2})月(\d{1,2})日/g,
    /(\d{4})[\/\-](\d{1,2})[\/\-](\d{1,2})/g,
  ];
  
  const dates: string[] = [];
  for (const pattern of datePatterns) {
    const matches = content.matchAll(pattern);
    for (const match of matches) {
      const year = match[1];
      const month = match[2].padStart(2, '0');
      const day = match[3].padStart(2, '0');
      dates.push(`${year}-${month}-${day}`);
    }
  }
  
  // Sort dates and assign start/end
  if (dates.length > 0) {
    dates.sort();
    result.promoStartDate = dates[0];
    result.promoEndDate = dates[dates.length - 1];
  }

  // Extract reward caps (format: HK$XXX or $XXX)
  const capMatch = content.match(/(?:最高|上限|最多).*?(?:HK)?\$\s*([\d,]+)/i);
  if (capMatch) {
    const amount = parseInt(capMatch[1].replace(/,/g, ''));
    if (!isNaN(amount)) {
      // Determine period
      let period: "monthly" | "quarterly" | "semi-annual" | "annual" | "promo" = "promo";
      if (content.includes("每月") || content.includes("月內")) period = "monthly";
      else if (content.includes("每季") || content.includes("季度")) period = "quarterly";
      else if (content.includes("半年") || content.includes("6個月")) period = "semi-annual";
      else if (content.includes("每年") || content.includes("年內")) period = "annual";
      
      result.rewardCap = {
        type: "total",
        amount,
        period,
      };
    }
  }

  // Extract exclusions (common patterns)
  const exclusionPatterns = [
    /不適用於[：:](.*?)(?:\n|$)/g,
    /不包括[：:](.*?)(?:\n|$)/g,
    /除外[：:](.*?)(?:\n|$)/g,
    /不適用.*?(?:包括但不限於|包括)[：:]?(.*?)(?:\n|$)/gi,
  ];
  
  for (const pattern of exclusionPatterns) {
    const matches = content.matchAll(pattern);
    for (const match of matches) {
      const exclusion = match[1].trim();
      if (exclusion && exclusion.length < 200) {
        // Split by common delimiters
        const items = exclusion.split(/[、,，;；]/);
        for (const item of items) {
          const cleaned = item.trim();
          if (cleaned && cleaned.length > 2 && !result.exclusions.includes(cleaned)) {
            result.exclusions.push(cleaned);
          }
        }
      }
    }
  }

  // Extract key terms (numbered items)
  const numberedItemPattern = /(?:^|\n)\s*(\d+)[\.、\)]\s*([^\n]+)/g;
  const numberedMatches = content.matchAll(numberedItemPattern);
  let termCount = 0;
  for (const match of numberedMatches) {
    const term = match[2].trim();
    if (term.length > 10 && term.length < 300 && termCount < 10) {
      result.keyTerms.push(term);
      termCount++;
    }
  }

  // Extract reward rates from common patterns
  const ratePatterns = [
    /(\d+(?:\.\d+)?)[%％].*?(?:回贈|現金回贈|積分)/g,
    /(?:回贈|簽賬).*?(\d+(?:\.\d+)?)[%％]/g,
  ];
  
  const seenRates = new Set<string>();
  for (const pattern of ratePatterns) {
    const matches = content.matchAll(pattern);
    for (const match of matches) {
      const rate = match[1];
      if (!seenRates.has(rate)) {
        seenRates.add(rate);
        result.rewardRates.push({
          category: "一般簽賬",
          rate: `${rate}%`,
          conditions: [],
        });
      }
    }
  }

  // Generate cardId from bank and promo name
  if (metadata.bankName && metadata.promoName) {
    const bankSlug = metadata.bankName.toLowerCase()
      .replace(/美國運通/g, 'amex')
      .replace(/滙豐/g, 'hsbc')
      .replace(/渣打/g, 'sc')
      .replace(/中銀/g, 'boc')
      .replace(/恒生/g, 'hangseng')
      .replace(/東亞/g, 'bea')
      .replace(/信銀國際/g, 'cncbi')
      .replace(/建行/g, 'ccb')
      .replace(/[\s\(\)（）]/g, '-')
      .replace(/--+/g, '-');
    
    const promoSlug = metadata.promoName.toLowerCase()
      .replace(/[^\w\u4e00-\u9fa5\s-]/g, '')
      .replace(/\s+/g, '-')
      .slice(0, 30);
    
    const year = new Date().getFullYear();
    result.cardId = `${bankSlug}-${promoSlug}-${year}`.toLowerCase().replace(/--+/g, '-');
  }

  // Add applicable cards from metadata
  if (metadata.cardIds && metadata.cardIds.length > 0) {
    result.applicableCards = metadata.cardIds.map(id => ({
      cardId: id,
      cardName: id, // Will need to be mapped to actual card names
    }));
  }

  return result;
}

// Generate TypeScript code for card-terms.ts
function generateTermsCode(terms: any): string {
  const applicableCardsCode = terms.applicableCards.length > 0
    ? `    applicableCards: [\n${terms.applicableCards.map((c: any) => 
        `      { cardId: "${c.cardId}", cardName: "${c.cardName}" },`
      ).join('\n')}\n    ],`
    : '';

  const rewardCapCode = terms.rewardCap
    ? `    rewardCap: {
      type: "${terms.rewardCap.type}",
      amount: ${terms.rewardCap.amount},
      period: "${terms.rewardCap.period}",${terms.rewardCap.note ? `\n      note: "${terms.rewardCap.note}",` : ''}
    },`
    : '';

  const rewardRatesCode = terms.rewardRates.length > 0
    ? `    rewardRates: [
${terms.rewardRates.map((r: any) => `      { 
        category: "${r.category}", 
        rate: "${r.rate}",
        conditions: [${r.conditions.map((c: string) => `"${c}"`).join(', ')}],
      },`).join('\n')}
    ],`
    : '';

  const exclusionsCode = terms.exclusions.length > 0
    ? `    exclusions: [
${terms.exclusions.map((e: string) => `      "${e.replace(/"/g, '\\"')}",`).join('\n')}
    ],`
    : '';

  const keyTermsCode = terms.keyTerms.length > 0
    ? `    keyTerms: [
${terms.keyTerms.map((t: string) => `      "${t.replace(/"/g, '\\"')}",`).join('\n')}
    ],`
    : '';

  return `  // ========================================================================
  // ${terms.bank} - ${terms.cardName}
  // ========================================================================
  {
    cardId: "${terms.cardId}",
    cardName: "${terms.cardName}",
    bank: "${terms.bank}",
${applicableCardsCode}
    documentName: "${terms.documentName}",
${terms.promoStartDate ? `    promoStartDate: "${terms.promoStartDate}",` : ''}
${terms.promoEndDate ? `    promoEndDate: "${terms.promoEndDate}",` : ''}
${rewardCapCode}
${rewardRatesCode}
${exclusionsCode}
${keyTermsCode}
    officialSource: "${terms.officialSource}",
    lastUpdated: "${terms.lastUpdated}",
  },`;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { content, bankName, promoName, cardIds, sourceUrl } = body;

    if (!content) {
      return NextResponse.json({ error: "Missing content" }, { status: 400 });
    }

    // Parse the T&C content
    const parsedTerms = parseTermsContent(content, {
      bankName,
      promoName,
      cardIds,
      sourceUrl,
    });

    // Generate TypeScript code
    const tsCode = generateTermsCode(parsedTerms);

    return NextResponse.json({
      success: true,
      parsed: parsedTerms,
      code: tsCode,
    });
  } catch (error: any) {
    console.error("Error parsing terms:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

