import Scene from "./../libs/scene.js";
import { drawText } from "./../utils/fonts.js";
import { changeColor } from "./../utils/effect.js";


export default class Title extends Scene {
  items;

  constructor(game, _config={}) {
    super(game, {
      name: "title",
      layerNum: 1,
    });

    this.items = [
      {
        name: "Start",
        func: () => {
          game.event.emit("scene", "main");
        },
      },
      {
        name: "Debug",
        func: () => {
          game.event.emit("scene", "debug");
        },
      },
      {
        name: "Exit",
        func: () => {
          window.location.reload();
        },
      },
    ];

    this.event.add("onload", () => {
    });
  }

  onload() {
    this.game.key.event.add("down", e => {
      if (this.game.scene.current_name === this.name) {
        if (e.key === "Enter") {
          this.assets.play("se2");
          this.items[this.cursor].func();
        }
        if (e.key === "ArrowUp") {
          this.assets.play("se1");
          this.cursor--;
        }
        if (e.key === "ArrowDown") {
          this.assets.play("se1");
          this.cursor++;
        }
        if (this.cursor < 0) {
          this.cursor = this.items.length - 1;
        }
        if (this.cursor > this.items.length - 1) {
          this.cursor = 0;
        }
      }
    });
  }

  onenter() {
    this.assets.loop("bgm1");
  }

  onleave() {
    this.assets.loopStop("bgm1");
  }

  init() {
    super.init();
    this.cursor = 0;
  }

  load() {
    const promises = [
      this.assets.loadImg("background", "./game/assets/title_screen/background.png"),
      this.assets.loadImg("cursor", "./game/assets/title_screen/cursor.png"),
      this.assets.loadSound("se1", "./game/assets/title_screen/se1.mp3"),
      this.assets.loadSound("se2", "./game/assets/title_screen/se2.mp3"),
      this.assets.loadSound("bgm1", "./game/assets/title_screen/bgm1.mp3"),
    ];
    this.assets.setImg("fonts", changeColor(
      this.game.assets.getImg("fonts"),
      0x50, 0x20, 0x20
    ));
    this.assets.setImg("fonts_alt", changeColor(
      this.game.assets.getImg("fonts"),
      0x90, 0x50, 0x50
    ));

    return super.load(promises);
  }

  draw() {
    const ctx = this.layer[0].context;

    ctx.drawImage(this.assets.getImg("background"), 0, 0);

    const X = 5;
    const Y = 7;
    ctx.drawImage(this.assets.images.cursor, 16 * X, 16 * (this.cursor + Y));
    for (let i = 0; i < this.items.length; i++) {
      drawText( ctx, this.assets.getImg(this.cursor === i ? "fonts" : "fonts_alt"),
        this.items[i].name,
      16 * 6, 16 * (7 + i));
    }

    super.draw();
  }
}
