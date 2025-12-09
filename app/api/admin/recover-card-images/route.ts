import { NextResponse } from 'next/server';
import { adminAuthClient } from '@/lib/supabase/admin-client';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        // Check for Service Role Key
        if (!process.env.SUPABASE_SERVICE_ROLE_KEY && !process.env.SERVICE_ROLE_KEY) {
            return NextResponse.json({ error: "Missing Service Role Key" }, { status: 500 });
        }

        // 1. List all files in the cards folder of images bucket
        const { data: files, error: listError } = await adminAuthClient.storage
            .from('images')
            .list('cards', {
                limit: 100,
                sortBy: { column: 'created_at', order: 'desc' }
            });

        if (listError) {
            console.error("Error listing files:", listError);
            return NextResponse.json({ error: listError.message }, { status: 500 });
        }

        if (!files || files.length === 0) {
            return NextResponse.json({ 
                message: "No images found in storage",
                files: []
            });
        }

        // 2. Get public URLs for all files
        const filesWithUrls = files
            .filter(f => !f.name.startsWith('.')) // Exclude hidden files
            .map(file => {
                const { data: { publicUrl } } = adminAuthClient.storage
                    .from('images')
                    .getPublicUrl(`cards/${file.name}`);
                
                return {
                    name: file.name,
                    url: publicUrl,
                    createdAt: file.created_at,
                    size: file.metadata?.size
                };
            });

        // 3. Get current card data from DB
        const { data: cards, error: cardsError } = await adminAuthClient
            .from('cards')
            .select('id, name, image_url');

        if (cardsError) {
            console.error("Error fetching cards:", cardsError);
        }

        // 4. Try to match files to cards by filename
        const suggestions: Array<{
            cardId: string;
            cardName: string;
            currentImageUrl: string | null;
            suggestedImageUrl: string;
            fileName: string;
        }> = [];

        filesWithUrls.forEach(file => {
            // Try to extract card ID from filename (format: timestamp-cardid.ext or cardid.ext)
            const nameParts = file.name.toLowerCase();
            
            cards?.forEach((card: any) => {
                const cardIdLower = card.id.toLowerCase().replace(/-/g, '');
                // Check if filename contains card ID
                if (nameParts.includes(cardIdLower) || nameParts.includes(card.id.toLowerCase())) {
                    suggestions.push({
                        cardId: card.id,
                        cardName: card.name,
                        currentImageUrl: card.image_url,
                        suggestedImageUrl: file.url,
                        fileName: file.name
                    });
                }
            });
        });

        return NextResponse.json({
            message: `Found ${filesWithUrls.length} images in storage`,
            files: filesWithUrls,
            suggestions,
            cards: cards?.map((c: any) => ({ 
                id: c.id, 
                name: c.name, 
                hasImage: !!c.image_url,
                imageUrl: c.image_url 
            }))
        });

    } catch (error: any) {
        console.error("Error recovering images:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// POST: Apply recovery - update card image URLs
export async function POST(request: Request) {
    try {
        if (!process.env.SUPABASE_SERVICE_ROLE_KEY && !process.env.SERVICE_ROLE_KEY) {
            return NextResponse.json({ error: "Missing Service Role Key" }, { status: 500 });
        }

        const { updates } = await request.json();
        
        if (!updates || !Array.isArray(updates)) {
            return NextResponse.json({ error: "Invalid updates format" }, { status: 400 });
        }

        const results: Array<{ cardId: string; success: boolean; error?: string }> = [];

        for (const update of updates) {
            const { cardId, imageUrl } = update;
            
            if (!cardId || !imageUrl) {
                results.push({ cardId: cardId || 'unknown', success: false, error: 'Missing cardId or imageUrl' });
                continue;
            }

            const { error } = await adminAuthClient
                .from('cards')
                .update({ 
                    image_url: imageUrl,
                    updated_at: new Date().toISOString()
                })
                .eq('id', cardId);

            if (error) {
                results.push({ cardId, success: false, error: error.message });
            } else {
                results.push({ cardId, success: true });
            }
        }

        const successCount = results.filter(r => r.success).length;
        return NextResponse.json({
            message: `Updated ${successCount}/${updates.length} cards`,
            results
        });

    } catch (error: any) {
        console.error("Error applying recovery:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

