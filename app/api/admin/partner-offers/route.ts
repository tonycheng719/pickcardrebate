import { NextResponse } from 'next/server';
import { adminAuthClient } from '@/lib/supabase/admin-client';

export const dynamic = 'force-dynamic';

// GET: Fetch all partner offers and global setting
export async function GET() {
  try {
    // Fetch global setting
    const { data: settingData } = await adminAuthClient
      .from('system_settings')
      .select('value')
      .eq('key', 'partner_offers_enabled')
      .single();
    
    // Fetch partner offers from database
    const { data: offersData, error } = await adminAuthClient
      .from('cards')
      .select('id, partner_offer');
    
    if (error && error.code !== '42P01') {
      console.error('Error fetching partner offers:', error);
    }
    
    return NextResponse.json({
      globalEnabled: settingData?.value === 'true',
      offers: offersData || [],
    });
  } catch (error: any) {
    console.error('Error in partner-offers API:', error);
    return NextResponse.json({ 
      globalEnabled: false, 
      offers: [],
      error: error.message 
    });
  }
}

