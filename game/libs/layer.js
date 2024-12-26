export default class Layer {
  layers = [];

  constructor(property={}) {
    for (let i = 0; i < property.num; i++) {
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');

      canvas.width = property.width;
      canvas.height = property.height;

      this.layers.push({canvas, context});
    }
  }

  get length() {
    return this.layers.length;
  }

  get(n) {
    return this.layers[n];
  }

  forEach(callback) {
    for (let i = 0; i < this.length; i++) {
      callback(this.layers[i], i);
    }
  }

  draw(ctx, n) {
    ctx.drawImage(this.layers[n].canvas, 0, 0);
  }

  drawAll(ctx) {
    for (const layer of this.layers) {
      ctx.drawImage(layer.canvas, 0, 0);
    }
  }
}
