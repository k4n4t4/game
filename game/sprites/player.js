import Sprite from "./../libs/sprite.js";
import Flag from "./../libs/flags.js";
import Events from "./../libs/events.js";

export default class Player extends Sprite {
  x;
  y;
  velocity = {x: 0, y: 0};
  flag = new Flag([
    ["on_ground", false],
  ]);
  event = new Events([
    {name: "enter_ground", callbacks: [
      () => {
        console.log("enter");
      }
    ]},
    {name: "leave_ground", callbacks: [
      () => {
        console.log("leave");
      }
    ]},
  ]);

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

    this.x += this.velocity.x;
    this.y += this.velocity.y;

    if (key.down("ArrowRight")) {
      this.velocity.x += 1;
    }
    if (key.down("ArrowLeft")) {
      this.velocity.x -= 1;
    }
    if (key.down(" ")) {
      this.velocity.y = -5;
    }

    const g = 1.0;
    this.velocity.y += g;

    if (this.y >= 16 * 8) {
      this.y = 16 * 8;
      this.flag.set("on_ground", true);
    } else {
      this.flag.set("on_ground", false);
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
