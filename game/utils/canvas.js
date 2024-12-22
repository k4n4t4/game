export default function createCanvas(config={}) {
  const SIZE = config.size || 16 * 16;
  const ASPECT = config.aspect || 4 / 3;

  const canvas = document.createElement('canvas');
  canvas.width = SIZE;
  canvas.height = SIZE / ASPECT;

  Object.assign(canvas.style, {
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
    aspectRatio: ASPECT,
    background: "#000000",
    imageRendering: "pixelated",
  });

  function canvasResize() {
    if (window.innerWidth >= window.innerHeight * ASPECT) {
      canvas.style.width = "";
      canvas.style.height = "90vh";
    } else {
      canvas.style.width = "90vw";
      canvas.style.height = "";
    }
  }

  window.addEventListener('load', canvasResize);
  window.addEventListener('resize', canvasResize);

  return canvas;
}
