import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';
import { HK_CARDS } from '@/lib/data/cards';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const cardIds = searchParams.get('cards')?.split(',') || [];
  
  // Get card data
  const cards = cardIds
    .map(id => HK_CARDS.find(c => c.id === id))
    .filter(Boolean)
    .slice(0, 4);
  
  if (cards.length === 0) {
    return new Response('No valid cards provided', { status: 400 });
  }

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#f8fafc',
          backgroundImage: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          padding: '40px',
        }}
      >
        {/* Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '30px',
          }}
        >
          <div
            style={{
              fontSize: '32px',
              fontWeight: 'bold',
              color: 'white',
            }}
          >
            💳 PickCardRebate 信用卡比較
          </div>
        </div>

        {/* Cards Grid */}
        <div
          style={{
            display: 'flex',
            gap: '20px',
            justifyContent: 'center',
            flexWrap: 'wrap',
          }}
        >
          {cards.map((card, index) => (
            <div
              key={card!.id}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                backgroundColor: 'white',
                borderRadius: '16px',
                padding: '24px',
                width: '220px',
                boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
              }}
            >
              {/* Rank Badge */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  backgroundColor: index === 0 ? '#f59e0b' : index === 1 ? '#9ca3af' : index === 2 ? '#cd7f32' : '#e5e7eb',
                  color: index < 3 ? 'white' : '#6b7280',
                  fontSize: '20px',
                  fontWeight: 'bold',
                  marginBottom: '16px',
                }}
              >
                {index + 1}
              </div>
              
              {/* Card Name */}
              <div
                style={{
                  fontSize: '18px',
                  fontWeight: 'bold',
                  color: '#1f2937',
                  textAlign: 'center',
                  marginBottom: '8px',
                }}
              >
                {card!.name}
              </div>
              
              {/* Bank */}
              <div
                style={{
                  fontSize: '14px',
                  color: '#6b7280',
                  marginBottom: '12px',
                }}
              >
                {card!.bank}
              </div>
              
              {/* Tags */}
              <div
                style={{
                  display: 'flex',
                  gap: '6px',
                  flexWrap: 'wrap',
                  justifyContent: 'center',
                }}
              >
                {card!.tags?.slice(0, 2).map((tag) => (
                  <div
                    key={tag}
                    style={{
                      fontSize: '12px',
                      backgroundColor: '#dbeafe',
                      color: '#1d4ed8',
                      padding: '4px 8px',
                      borderRadius: '999px',
                    }}
                  >
                    {tag}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            marginTop: '30px',
            color: 'white',
            opacity: 0.9,
          }}
        >
          <div style={{ fontSize: '16px' }}>
            pickcardrebate.com - 香港信用卡回贈比較
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}

