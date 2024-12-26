import Scene from "./../libs/scene.js";
import Assets from "./../libs/assets.js";
import { drawText } from "./../utils/fonts.js";
import { changeColor } from "./../utils/effect.js";
import Layer from "./../libs/layer.js";


class DebugParticle {
  scene;
  x;
  y;
  vx;
  vy;
  lifetime = 100;

  constructor(scene, x, y, vx, vy) {
    this.scene = scene;

    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
  }

  update() {
    const gx = 0;
    const gy = 1;
    this.x += this.vx;
    this.y += this.vy;
    this.vx += gx;
    this.vy += gy;

    if (this.y > this.scene.root.height - 1) {
      this.y = this.scene.root.height - 1;
      this.vy *= -0.5;
    }

    this.lifetime--;
  }

  draw() {
    const ctx = this.scene.layer.get(0).context;

    ctx.fillStyle = "#ff0000";
    ctx.fillRect(Math.floor(this.x), Math.floor(this.y), 1, 1);
  }
}

class DebugParticles {
  scene;
  x = 0;
  y = 0;
  particles = new Set();

  constructor(scene) {
    this.scene = scene;
  }

  move(x, y) {
    this.x = x;
    this.y = y;
  }

  gen() {
    for (let i = 0; i < 32; i++) {
      const angle = Math.random() * Math.PI * 2;
      const v = Math.random() * 3 + 2;
      const vx = Math.cos(angle) * v + this.scene.root.mouse.vx;
      const vy = - Math.sin(angle) * v + this.scene.root.mouse.vy;
      this.particles.add(new DebugParticle(this.scene, this.x, this.y, vx, vy));
    }
  }

  update() {
    for (const particle of this.particles) {
      if (particle.lifetime > 0) {
        particle.update();
      } else {
        this.particles.delete(particle);
      }
    }
  }

  draw() {
    for (const particle of this.particles) {
      particle.draw();
    }
  }
}


export default class Debug extends Scene {
  assets = new Assets();
  sprites;

  constructor(root, _config={}) {
    super(root, "debug");

    this.layer = new Layer({
      width: root.canvas.width,
      height: root.canvas.height,
      num: 1,
    });

    this.particles = new DebugParticles(this);
  }

  onenter() {
    this.frame = 0;
  }

  load() {
    this.assets.setImg("fonts", changeColor(
      this.root.assets.getImg("fonts"),
      0x50, 0x20, 0x20
    ));
    this.assets.setImg("fonts_alt", changeColor(
      this.root.assets.getImg("fonts"),
      0x90, 0x50, 0x50
    ));

    return super.load();
  }

  update() {
    this.frame++;
    if (this.root.key.down("q")) {
      this.root.event.emit("scene", "title");
    }

    this.particles.move(this.root.mouse.x, this.root.mouse.y);
    if (this.root.mouse.flag.get("click") || this.root.mouse.flag.get("touch")) {
      this.particles.gen();
    }
    this.particles.update();
  }

  draw() {
    const ctx = this.layer.get(0).context;

    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, this.root.width, this.root.height);

    drawText(
      ctx, this.assets.getImg("fonts"),
      [
        `frame: ${this.frame}`,
        `input:`,
        `  mouse:`,
        `      left: ${this.root.mouse.flag.get("left")}`,
        `    middle: ${this.root.mouse.flag.get("middle")}`,
        `     right: ${this.root.mouse.flag.get("right")}`,
        `     click: ${this.root.mouse.flag.get("click")}`,
        `     touch: ${this.root.mouse.flag.get("touch")}`,
        `         x: ${Math.floor(this.root.mouse.x)}`,
        `         y: ${Math.floor(this.root.mouse.y)}`,
        `        vx: ${Math.floor(this.root.mouse.vx)}`,
        `        vy: ${Math.floor(this.root.mouse.vy)}`,
        `  key: ${(() => {
          let keys = [];
          for (const [name, value] of this.root.key.flag.flags.entries()) {
            if (value) {
              keys.push(`'${name}'`);
            }
          }
          return keys.join(",");
        })()}`,
      ].join("\n"),
      0, 0
    );

    this.particles.draw();

    this.layer.drawAll(this.root.context);
  }
}
