import { ImageResponse } from 'next/og';

export const alt = 'Creative All Stars Academy — Endeavour to Succeed';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(<div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '70px 80px', background: '#faf9f6', color: '#19323c', borderLeft: '12px solid #a58654' }}>
    <div style={{ display: 'flex', fontSize: 25, letterSpacing: 2 }}>CREATIVE ALL STARS ACADEMY</div>
    <div style={{ display: 'flex', flexDirection: 'column', fontSize: 76, letterSpacing: -3, lineHeight: 1.1 }}><span>Room to discover.</span><span style={{ color: '#6c7868' }}>Confidence to grow.</span></div>
    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 23, color: '#626d70' }}><span>Ngata, Nakuru · Playgroup to Junior School</span><span>Since 2017</span></div>
  </div>, size);
}
