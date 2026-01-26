import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const merchant = searchParams.get('merchant') || '商戶';
  const amount = searchParams.get('amount') || '1000';
  const cardName = searchParams.get('card') || '信用卡';
  const bank = searchParams.get('bank') || '';
  const rate = searchParams.get('rate') || '0';
  const reward = searchParams.get('reward') || '0';

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
          backgroundImage: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
          padding: '40px',
        }}
      >
        {/* Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '24px',
          }}
        >
          <div
            style={{
              fontSize: '28px',
              fontWeight: 'bold',
              color: 'white',
            }}
          >
            🧮 PickCardRebate 計算結果
          </div>
        </div>

        {/* Main Card */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor: 'white',
            borderRadius: '24px',
            padding: '40px 60px',
            boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
          }}
        >
          {/* Merchant & Amount */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              marginBottom: '24px',
            }}
          >
            <div
              style={{
                fontSize: '24px',
                color: '#6b7280',
              }}
            >
              於 <span style={{ fontWeight: 'bold', color: '#1f2937' }}>{merchant}</span> 消費
            </div>
            <div
              style={{
                fontSize: '32px',
                fontWeight: 'bold',
                color: '#059669',
              }}
            >
              ${parseInt(amount).toLocaleString()}
            </div>
          </div>

          {/* Best Card */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: '24px',
              backgroundColor: '#f0fdf4',
              borderRadius: '16px',
              border: '2px solid #86efac',
              marginBottom: '16px',
            }}
          >
            <div
              style={{
                fontSize: '18px',
                color: '#16a34a',
                marginBottom: '8px',
              }}
            >
              🏆 最佳信用卡
            </div>
            <div
              style={{
                fontSize: '28px',
                fontWeight: 'bold',
                color: '#1f2937',
              }}
            >
              {cardName}
            </div>
            {bank && (
              <div
                style={{
                  fontSize: '16px',
                  color: '#6b7280',
                  marginTop: '4px',
                }}
              >
                {bank}
              </div>
            )}
          </div>

          {/* Reward Info */}
          <div
            style={{
              display: 'flex',
              gap: '40px',
              marginTop: '16px',
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <div style={{ fontSize: '16px', color: '#6b7280' }}>回贈率</div>
              <div style={{ fontSize: '36px', fontWeight: 'bold', color: '#059669' }}>
                {rate}%
              </div>
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <div style={{ fontSize: '16px', color: '#6b7280' }}>可賺回贈</div>
              <div style={{ fontSize: '36px', fontWeight: 'bold', color: '#f59e0b' }}>
                ${parseFloat(reward).toFixed(0)}
              </div>
            </div>
          </div>
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
            pickcardrebate.com - 即刻計算你的最佳信用卡
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

