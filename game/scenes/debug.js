import Scene from "./../libs/scene.js";
import { drawText } from "./../utils/fonts.js";
import { changeColor } from "./../utils/effect.js";


class DebugParticle {
  game;
  x;
  y;
  vx;
  vy;
  lifetime = 100;

  constructor(game, x, y, vx, vy) {
    this.game = game;

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

    if (this.y > this.game.height - 1) {
      this.y = this.game.height - 1;
      this.vy *= -0.5;
    }

    this.lifetime--;
  }

  draw(ctx) {
    ctx.fillStyle = "#ff0000";
    ctx.fillRect(Math.floor(this.x), Math.floor(this.y), 1, 1);
  }
}

class DebugParticles {
  game;
  x = 0;
  y = 0;
  particles = new Set();

  constructor(game) {
    this.game = game;
  }

  move(x, y) {
    this.x = x;
    this.y = y;
  }

  gen() {
    for (let i = 0; i < 32; i++) {
      const angle = Math.random() * Math.PI * 2;
      const v = Math.random() * 3 + 2;
      const vx = Math.cos(angle) * v + this.game.mouse.vx;
      const vy = - Math.sin(angle) * v + this.game.mouse.vy;
      this.particles.add(new DebugParticle(this.game, this.x, this.y, vx, vy));
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

  draw(ctx) {
    for (const particle of this.particles) {
      particle.draw(ctx);
    }
  }
}


export default class Debug extends Scene {
  sprites;

  constructor(game, _config={}) {
    super(game, {
      name: "debug",
      layerNum: 1,
    });

    this.particles = new DebugParticles(game);
  }

  init() {
    super.init();
    this.frame = 0;
  }

  load() {
    this.assets.setImg("fonts", changeColor(
      this.game.assets.getImg("fonts"),
      0x50, 0x20, 0x20
    ));
    this.assets.setImg("fonts_alt", changeColor(
      this.game.assets.getImg("fonts"),
      0x90, 0x50, 0x50
    ));

    return super.load();
  }

  update() {
    this.frame++;
    if (this.game.key.down("q")) {
      this.game.event.emit("scene", "title");
    }

    this.particles.move(this.game.mouse.x, this.game.mouse.y);
    if (this.game.mouse.flag.get("click") || this.game.mouse.flag.get("touch")) {
      this.particles.gen();
    }
    this.particles.update();
  }

  draw() {
    const ctx = this.layer[0].context;

    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, this.game.width, this.game.height);

    drawText(
      ctx, this.assets.getImg("fonts"),
      [
        `frame: ${this.frame}`,
        `input:`,
        `  mouse:`,
        `      left: ${this.game.mouse.flag.get("left")}`,
        `    middle: ${this.game.mouse.flag.get("middle")}`,
        `     right: ${this.game.mouse.flag.get("right")}`,
        `     click: ${this.game.mouse.flag.get("click")}`,
        `     touch: ${this.game.mouse.flag.get("touch")}`,
        `         x: ${Math.floor(this.game.mouse.x)}`,
        `         y: ${Math.floor(this.game.mouse.y)}`,
        `        vx: ${Math.floor(this.game.mouse.vx)}`,
        `        vy: ${Math.floor(this.game.mouse.vy)}`,
        `  key: ${(() => {
          let keys = [];
          for (const [name, value] of this.game.key.flag.flags.entries()) {
            if (value) {
              keys.push(`'${name}'`);
            }
          }
          return keys.join(",");
        })()}`,
      ].join("\n"),
      0, 0
    );

    this.particles.draw(ctx);

    super.draw();
  }
}
