import { ImageResponse } from 'next/og';
// App router includes @vercel/og.
// No need to install it.
 
export const runtime = 'edge';
 
export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 40,
          color: 'black',
          width: '1200px',
          height: '630px',
          textAlign: 'center',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundImage: 'url(http://localhost:3000/images/blob-bg.png)',
          backgroundSize: 'cover',
          display: 'flex',
        }}
      >
        <div
          style={{
            width: '200px',
            height: '200px',
            borderRadius: '50%',
            marginTop: '100px',
            backgroundColor: 'yellow',
          }}>Hello</div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}