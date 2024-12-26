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
        this.flag.set("on_ground", true);
      }
    ]},
    {name: "leave_ground", callbacks: [
      () => {
        console.log("leave");
        this.flag.set("on_ground", false);
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
    const root = this.root;
    const key = root.key;

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
      if (!this.flag.get("on_ground")) {
        this.event.emit("enter_ground");
      }
    } else {
      if (this.flag.get("on_ground")) {
        this.event.emit("leave_ground");
      }
    }

    if (this.flag.get("on_ground")) {
      this.y = 16 * 8;
      this.velocity.y = 0;
    }
  }

  draw() {
    const ctx = this.scene.layer.get(0).context;

    ctx.drawImage(
      this.scene.assets.images.player,
      0, 0, 16, 16,
      Math.floor(this.x), Math.floor(this.y), 16, 16
    );
  }
}
