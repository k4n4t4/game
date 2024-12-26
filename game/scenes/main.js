import Layer from "./../libs/layer.js";
import Scene from "./../libs/scene.js";

import Player from "./../sprites/player.js";


export default class Main extends Scene {
  constructor(root, _config={}) {
    super(root, "main");

    this.layer = new Layer({
      width: root.canvas.width,
      height: root.canvas.height,
      num: 1,
    });
  }

  onload() {
    this.player = new Player(this, 0, 0);
  }

  init() {
    super.init();
  }

  load() {
    const promises = [
      this.assets.loadImg("player", "./game/assets/main/player.png"),
      this.assets.loadImg("tile", "./game/assets/main/tile.png"),
    ];

    return super.load(promises);
  }

  update() {
    this.player.update();

    if (this.root.key.down("q")) {
      this.root.event.emit("scene", "title");
    }
  }

  draw() {
    const root = this.root;
    const ctx = this.layer.get(0).context;

    ctx.fillStyle = "#4060A0";
    ctx.fillRect(0, 0, root.width, root.height);

    this.player.draw();

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 16; j++) {
        ctx.drawImage(
          this.assets.images.tile,
          0, 0, 16, 16,
          16 * j, 16 * 11 - 16 * i, 16, 16
        );
      }
    }

    this.layer.drawAll(this.root.context);
  }
}
