import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const score = searchParams.get('s') || '0';
    const total = searchParams.get('t') || '0';
    const category = searchParams.get('c') || 'ДОПОГ';
    
    const percentage = (Number(score) / Number(total)) * 100;
    const isPassed = percentage >= 80;

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
            backgroundColor: '#09090b',
            backgroundImage: 'radial-gradient(circle at 50% 50%, #18181b 0%, #09090b 100%)',
          }}
        >
          {/* Logo Header */}
          <div
            style={{
              position: 'absolute',
              top: 60,
              left: 60,
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
            }}
          >
            <div style={{ width: 40, height: 40, backgroundColor: '#eab308', borderRadius: 8 }} />
            <div style={{ fontSize: 32, fontWeight: 900, color: 'white', letterSpacing: '-0.05em' }}>
              ADR <span style={{ color: '#eab308' }}>PLATFORM</span>
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: '80px',
              backgroundColor: 'rgba(24, 24, 27, 0.8)',
              borderRadius: '48px',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              boxShadow: '0 40px 100px -20px rgba(0,0,0,0.8)',
            }}
          >
            <div style={{ fontSize: 28, color: '#eab308', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: 20 }}>
              {category}
            </div>
            
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 20 }}>
              <div style={{ fontSize: 160, fontWeight: 900, color: 'white', lineHeight: 1 }}>{score}</div>
              <div style={{ fontSize: 64, fontWeight: 700, color: '#52525b' }}>/ {total}</div>
            </div>

            <div
              style={{
                fontSize: 48,
                fontWeight: 900,
                color: isPassed ? '#22c55e' : '#ef4444',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
              }}
            >
              {isPassed ? 'ЭКЗАМЕН СДАН' : 'НЕ СДАНО'}
            </div>
          </div>

          <div
            style={{
              position: 'absolute',
              bottom: 60,
              fontSize: 24,
              color: '#52525b',
              fontWeight: 600,
            }}
          >
            Присоединяйся к обучению на adr-platform.ru
          </div>

          {/* Decorative accents */}
          <div style={{ position: 'absolute', top: 0, right: 0, width: 400, height: 400, background: 'radial-gradient(circle at 100% 0%, rgba(234, 179, 8, 0.1) 0%, transparent 70%)' }} />
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e: any) {
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
