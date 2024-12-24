import Sprite from "./../libs/sprite.js";

export default class Player extends Sprite {
  x;
  y;
  velocity = {x: 0, y: 0};

  constructor(scene, x, y, setup) {
    super(scene);
    this.name = "player";

    this.x = x;
    this.y = y;

    if (setup) setup(this);
  }

  update() {
    const game = this.game;
    const key = game.key;

    const g = 1.0;
    this.x += this.velocity.x;
    this.y += this.velocity.y;
    this.velocity.y += g;


    if (key.down("ArrowRight")) {
      this.x++;
    }
    if (key.down("ArrowLeft")) {
      this.x--;
    }
    if (key.down(" ")) {
      this.velocity.y = -5;
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
