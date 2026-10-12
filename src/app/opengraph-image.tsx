import { ImageResponse } from 'next/og';

export const alt = 'GlobPayFlow — Crypto payments, built for business.';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          background: 'linear-gradient(135deg, #0F172A 0%, #1E1B4B 50%, #4C1D95 100%)',
          padding: '80px',
          fontFamily: 'sans-serif',
        }}
      >
        {/* Top: Brand Wordmark */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '56px',
              height: '56px',
              borderRadius: '16px',
              background: 'linear-gradient(135deg, #8B5CF6 0%, #4F46E5 100%)',
              color: '#FFFFFF',
              fontSize: '28px',
              fontWeight: 'bold',
            }}
          >
            G
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span style={{ fontSize: '40px', fontWeight: '800', color: '#FFFFFF', letterSpacing: '-0.03em' }}>
              GlobPayFlow
            </span>
          </div>
        </div>

        {/* Center: Hero Heading */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '960px' }}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              fontSize: '54px',
              fontWeight: '800',
              color: '#FFFFFF',
              lineHeight: 1.15,
              letterSpacing: '-0.03em',
            }}
          >
            Crypto payments, built for business.
          </div>
          <div
            style={{
              display: 'flex',
              fontSize: '24px',
              color: '#CBD5E1',
              lineHeight: 1.4,
            }}
          >
            Accept deposits, withdraw to approved addresses, and disburse local fiat in Argentina and Brazil.
          </div>
        </div>

        {/* Bottom Badges */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '10px 22px',
              borderRadius: '9999px',
              background: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              color: '#E2E8F0',
              fontSize: '18px',
              fontWeight: '600',
            }}
          >
            11 Blockchains
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '10px 22px',
              borderRadius: '9999px',
              background: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              color: '#E2E8F0',
              fontSize: '18px',
              fontWeight: '600',
            }}
          >
            13 Currencies
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '10px 22px',
              borderRadius: '9999px',
              background: 'rgba(139, 92, 246, 0.25)',
              border: '1px solid rgba(167, 139, 250, 0.4)',
              color: '#DDD6FE',
              fontSize: '18px',
              fontWeight: '600',
            }}
          >
            Argentina &amp; Brazil Payouts
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
