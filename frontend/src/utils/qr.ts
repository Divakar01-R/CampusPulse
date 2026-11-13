export function generateQRCodeSVG(text: string, size = 160): string {
  let hash = 0;
  for (let i = 0; i < text.length; i++) {
    hash = (hash << 5) - hash + text.charCodeAt(i);
    hash |= 0;
  }

  const modules = 21;
  const cellSize = size / modules;
  let rects = '';

  function drawFinder(startX: number, startY: number) {
    for (let r = 0; r < 7; r++) {
      for (let c = 0; c < 7; c++) {
        const isOuter = r === 0 || r === 6 || c === 0 || c === 6;
        const isInner = r >= 2 && r <= 4 && c >= 2 && c <= 4;
        if (isOuter || isInner) {
          rects += `<rect x="${(startX + c) * cellSize}" y="${(startY + r) * cellSize}" width="${cellSize}" height="${cellSize}" fill="#191735" />`;
        }
      }
    }
  }

  drawFinder(0, 0);
  drawFinder(modules - 7, 0);
  drawFinder(0, modules - 7);

  let seed = Math.abs(hash);
  for (let r = 0; r < modules; r++) {
    for (let c = 0; c < modules; c++) {
      const inFinder = (r < 8 && c < 8) || (r < 8 && c >= modules - 8) || (r >= modules - 8 && c < 8);
      if (!inFinder) {
        seed = (seed * 9301 + 49297) % 233280;
        if (seed / 233280 > 0.5) {
          rects += `<rect x="${c * cellSize}" y="${r * cellSize}" width="${cellSize}" height="${cellSize}" fill="#191735" />`;
        }
      }
    }
  }

  return `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" style="border-radius: 8px;">
    <rect width="100%" height="100%" fill="#FFFFFF"/>
    ${rects}
  </svg>`;
}

