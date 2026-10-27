// Renders public/og.png (1200×630), the social preview image. Run: npm run og
import sharp from 'sharp';

const W = 1200;
const H = 630;
const PHOTO = 360;

const text = `
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <defs>
    <pattern id="dots" width="18" height="18" patternUnits="userSpaceOnUse">
      <circle cx="1" cy="1" r="1" fill="#eeebe3" fill-opacity="0.07"/>
    </pattern>
  </defs>
  <rect width="${W}" height="${H}" fill="#0d0e0c"/>
  <rect width="${W}" height="${H}" fill="url(#dots)"/>
  <rect x="72" y="72" width="44" height="44" rx="10" fill="#eeebe3"/>
  <text x="94" y="101" text-anchor="middle" font-family="Consolas, monospace" font-size="17" font-weight="700" fill="#0d0e0c">OF</text>
  <text x="132" y="101" font-family="Segoe UI, Arial, sans-serif" font-size="22" font-weight="600" fill="#eeebe3">Olamide Fadahunsi</text>
  <text x="72" y="220" font-family="Segoe UI, Arial, sans-serif" font-size="62" font-weight="700" letter-spacing="-2" fill="#eeebe3">I build AI systems</text>
  <text x="72" y="292" font-family="Segoe UI, Arial, sans-serif" font-size="62" font-weight="700" letter-spacing="-2" fill="#eeebe3">that can <tspan font-family="Georgia, serif" font-style="italic" font-weight="400" fill="#ff7a45">show</tspan></text>
  <text x="72" y="364" font-family="Georgia, serif" font-size="62" font-style="italic" fill="#ff7a45">their work.</text>
  <text x="72" y="440" font-family="Consolas, monospace" font-size="20" fill="#94918a">AI/ML &amp; BACKEND ENGINEER · NIGERIA</text>
  <text x="72" y="540" font-family="Consolas, monospace" font-size="20" fill="#86d297">146 passed · 18 passed · 5 passed · 3 passed</text>
  <text x="72" y="572" font-family="Consolas, monospace" font-size="16" fill="#94918a">recorded test runs across KODA, Ajo, IHcPro and BUILD</text>
</svg>`;

const photo = await sharp('src/assets/portrait.jpg')
  .resize(PHOTO, Math.round(PHOTO * 1.25), { fit: 'cover', position: 'top' })
  .composite([
    {
      input: Buffer.from(
        `<svg width="${PHOTO}" height="${Math.round(PHOTO * 1.25)}"><rect width="100%" height="100%" rx="24" fill="#fff"/></svg>`,
      ),
      blend: 'dest-in',
    },
  ])
  .png()
  .toBuffer();

await sharp(Buffer.from(text))
  .composite([{ input: photo, left: W - PHOTO - 72, top: Math.round((H - PHOTO * 1.25) / 2) }])
  .png({ compressionLevel: 9 })
  .toFile('public/og.png');

console.log('Wrote public/og.png');
