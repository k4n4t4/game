import Sprite from "./../libs/sprite.js";
import Flag from "./../libs/flags.js";
import Events from "./../libs/events.js";

export default class Player extends Sprite {
  x = 0;
  y = 0;
  velocity = {x: 0, y: 0};
  flag = new Flag([
    ["on_ground", false],
  ]);
  event = new Events([
    {name: "enter_ground", callbacks: [
      () => {
        this.flag.set("on_ground", true);
      }
    ]},
    {name: "leave_ground", callbacks: [
      () => {
        this.flag.set("on_ground", false);
      }
    ]},
  ]);

  constructor(scene, setup) {
    super(scene);
    this.name = "player";

    if (setup) setup(this);

    this.event.add("enter_ground", () => {
      this.y = 16 * 8;
      this.velocity.y = 0;
    });
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

    if (!this.flag.get("on_ground")) {
      const g = 1.0;
      const f = 0.7;
      this.velocity.x *= f
      this.velocity.y += g;
    } else {
      const f = 0.6;
      this.velocity.x *= f
    }

    if (this.y >= 16 * 8) {
      if (!this.flag.get("on_ground")) {
        this.event.emit("enter_ground");
      }
    } else {
      if (this.flag.get("on_ground")) {
        this.event.emit("leave_ground");
      }
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
