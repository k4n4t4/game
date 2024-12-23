import Sprite from "./../libs/sprite.js";

export default class Player extends Sprite {
  x;
  y;

  constructor(scene, x, y) {
    super(scene);
    this.name = "player";

    this.x = x;
    this.y = y;
  }

  update() {
    const game = this.game;
    const key = game.key;

    if (key.down("ArrowRight")) {
      this.x++;
    }
    if (key.down("ArrowLeft")) {
      this.x--;
    }
    if (key.down("ArrowUp")) {
      this.y--;
    }
    if (key.down("ArrowDown")) {
      this.y++;
    }

    if (key.down("q")) {
      game.event.emit("scene", "title");
    }
  }

  draw() {
    const ctx = this.scene.layer[0].context;

    ctx.drawImage(
      this.scene.assets.images.player,
      0, 0, 16, 16,
      this.x, this.y, 16, 16
    );
  }
}
