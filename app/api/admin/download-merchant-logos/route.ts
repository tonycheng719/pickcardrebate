import { NextResponse } from 'next/server';
import { adminAuthClient } from '@/lib/supabase/admin-client';
import { POPULAR_MERCHANTS } from '@/lib/data/merchants';

export const dynamic = 'force-dynamic';

// Clearbit logo URLs that we want to download
const CLEARBIT_DOMAINS: Record<string, string> = {
  'wellcome': 'wellcome.com.hk',
  'parknshop': 'parknshop.com',
  'yata': 'yata.hk',
  '759store': '759store.com',
  'hktvmall': 'hktvmall.com',
  'dondondonki': 'dondondonki.com',
  'mannings': 'mannings.com.hk',
  'watsons': 'watsons.com.hk',
  'citysuper': 'citysuper.com.hk',
  'foodpanda': 'foodpanda.hk',
  'marksandspencer': 'marksandspencer.com',
  'aeon': 'aeon.com.hk',
  'ikea': 'ikea.com.hk',
  'maxims': 'maxims.com.hk',
  'fairwood': 'fairwood.com.hk',
  'mcdonalds': 'mcdonalds.com.hk',
  'starbucks': 'starbucks.com.hk',
  'kfc': 'kfc.com.hk',
  'pizzahut': 'pizzahut.com.hk',
  'cathay': 'cathaypacific.com',
  'klook': 'klook.com',
  'trip': 'trip.com',
  'agoda': 'agoda.com',
  'booking': 'booking.com',
  'hotels': 'hotels.com',
  'expedia': 'expedia.com',
  'netflix': 'netflix.com',
  'spotify': 'spotify.com',
  'apple': 'apple.com',
  'amazon': 'amazon.com',
  'taobao': 'taobao.com',
  'jd': 'jd.com',
  'uniqlo': 'uniqlo.com',
  'zara': 'zara.com',
  'hm': 'hm.com',
  'sephora': 'sephora.com',
  'fortress': 'fortress.com.hk',
  'broadway': 'broadway.com.hk',
  'shell': 'shell.com.hk',
  'caltex': 'caltex.com',
  'esso': 'esso.com.hk',
  'octopus': 'octopus.com.hk',
  'mtr': 'mtr.com.hk',
  'ird': 'ird.gov.hk',
  'wsd': 'wsd.gov.hk',
};

export async function GET(request: Request) {
  try {
    // Check for Service Role Key
    if (!process.env.SUPABASE_SERVICE_ROLE_KEY && !process.env.SERVICE_ROLE_KEY) {
      return NextResponse.json({ error: "Missing Service Role Key" }, { status: 500 });
    }

    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action') || 'list';
    const merchantId = searchParams.get('merchant');

    if (action === 'list') {
      // List all merchants that use Clearbit logos
      const merchantsWithClearbit = POPULAR_MERCHANTS
        .filter(m => m.logo && m.logo.includes('clearbit.com'))
        .map(m => ({
          id: m.id,
          name: m.name,
          currentLogo: m.logo,
          domain: CLEARBIT_DOMAINS[m.id] || null
        }));

      return NextResponse.json({
        message: `Found ${merchantsWithClearbit.length} merchants using Clearbit logos`,
        merchants: merchantsWithClearbit
      });
    }

    if (action === 'download' && merchantId) {
      // Download a single merchant's logo
      const merchant = POPULAR_MERCHANTS.find(m => m.id === merchantId);
      if (!merchant) {
        return NextResponse.json({ error: "Merchant not found" }, { status: 404 });
      }

      const domain = CLEARBIT_DOMAINS[merchantId];
      if (!domain) {
        return NextResponse.json({ error: "No Clearbit domain configured for this merchant" }, { status: 400 });
      }

      const clearbitUrl = `https://logo.clearbit.com/${domain}`;
      
      // Fetch the logo
      const logoResponse = await fetch(clearbitUrl);
      if (!logoResponse.ok) {
        return NextResponse.json({ error: `Failed to fetch logo: ${logoResponse.status}` }, { status: 500 });
      }

      const logoBuffer = await logoResponse.arrayBuffer();
      const contentType = logoResponse.headers.get('content-type') || 'image/png';
      const extension = contentType.includes('png') ? 'png' : contentType.includes('jpeg') ? 'jpg' : 'png';
      
      // Upload to Supabase Storage
      const fileName = `merchants/${Date.now()}-${merchantId}.${extension}`;
      
      const { data, error } = await adminAuthClient.storage
        .from('images')
        .upload(fileName, logoBuffer, {
          contentType,
          cacheControl: '3600',
          upsert: true
        });

      if (error) {
        return NextResponse.json({ error: `Upload failed: ${error.message}` }, { status: 500 });
      }

      // Get public URL
      const { data: { publicUrl } } = adminAuthClient.storage
        .from('images')
        .getPublicUrl(fileName);

      // Update merchant in DB
      const { error: updateError } = await adminAuthClient
        .from('merchants')
        .upsert({
          id: merchantId,
          name: merchant.name,
          logo: publicUrl,
          category_ids: merchant.categoryIds,
          is_general: merchant.isGeneral || false,
          updated_at: new Date().toISOString()
        });

      if (updateError) {
        console.error("Failed to update merchant:", updateError);
      }

      return NextResponse.json({
        success: true,
        merchantId,
        originalUrl: clearbitUrl,
        newUrl: publicUrl,
        dbUpdated: !updateError
      });
    }

    if (action === 'download-all') {
      // Download all Clearbit logos
      const results: Array<{
        merchantId: string;
        success: boolean;
        newUrl?: string;
        error?: string;
      }> = [];

      for (const [merchantId, domain] of Object.entries(CLEARBIT_DOMAINS)) {
        const merchant = POPULAR_MERCHANTS.find(m => m.id === merchantId);
        if (!merchant) continue;

        try {
          const clearbitUrl = `https://logo.clearbit.com/${domain}`;
          const logoResponse = await fetch(clearbitUrl);
          
          if (!logoResponse.ok) {
            results.push({ merchantId, success: false, error: `HTTP ${logoResponse.status}` });
            continue;
          }

          const logoBuffer = await logoResponse.arrayBuffer();
          const contentType = logoResponse.headers.get('content-type') || 'image/png';
          const extension = contentType.includes('png') ? 'png' : 'jpg';
          
          const fileName = `merchants/${Date.now()}-${merchantId}.${extension}`;
          
          const { error: uploadError } = await adminAuthClient.storage
            .from('images')
            .upload(fileName, logoBuffer, {
              contentType,
              cacheControl: '3600',
              upsert: true
            });

          if (uploadError) {
            results.push({ merchantId, success: false, error: uploadError.message });
            continue;
          }

          const { data: { publicUrl } } = adminAuthClient.storage
            .from('images')
            .getPublicUrl(fileName);

          // Update DB
          await adminAuthClient
            .from('merchants')
            .upsert({
              id: merchantId,
              name: merchant.name,
              logo: publicUrl,
              category_ids: merchant.categoryIds,
              is_general: merchant.isGeneral || false,
              updated_at: new Date().toISOString()
            });

          results.push({ merchantId, success: true, newUrl: publicUrl });
          
          // Small delay to avoid rate limiting
          await new Promise(resolve => setTimeout(resolve, 500));
        } catch (err: any) {
          results.push({ merchantId, success: false, error: err.message });
        }
      }

      const successCount = results.filter(r => r.success).length;
      return NextResponse.json({
        message: `Downloaded ${successCount}/${results.length} logos`,
        results
      });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });

  } catch (error: any) {
    console.error("Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

