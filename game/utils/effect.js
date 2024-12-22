export function changeColor(img, R=255, G=255, B=255, A=255) {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = img.naturalWidth;
  canvas.height = img.naturalHeight;

  ctx.drawImage(img, 0, 0);
  const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);

  const data = imgData.data;
  for (let i = 0; i < data.length; i += 4) {
    const [r, g, b, a] = [data[i], data[i+1], data[i+2], data[i+3]];
    if (r === 255 && g === 255 && b === 255 && a === 255) {
      data[i] = R;
      data[i+1] = G;
      data[i+2] = B;
      data[i+2] = A;
    }
  }

  ctx.putImageData(imgData, 0, 0);

  return canvas;
}
