import Scene from "./../libs/scene.js";
import Layer from "./../libs/layer.js";
import Assets from "./../libs/assets.js";
import { drawText } from "./../utils/fonts.js";
import { changeColor } from "./../utils/effect.js";


export default class Title extends Scene {
  assets = new Assets();
  items = [
    {
      name: "Start",
      func: () => {
        this.root.event.emit("scene", "main");
      },
    },
    {
      name: "Debug",
      func: () => {
        this.root.event.emit("scene", "debug");
      },
    },
    {
      name: "Exit",
      func: () => {
        window.location.reload();
      },
    },
  ];

  constructor(root, _config={}) {
    super(root, "title");

    this.layer = new Layer({
      width: root.canvas.width,
      height: root.canvas.height,
      num: 1,
    });
  }

  onload() {
    this.root.key.event.add("down", e => {
      if (this.flag.get("active")) {
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
    this.cursor = 0;
  }

  onleave() {
    this.assets.loopStop("bgm1");
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
      this.root.assets.getImg("fonts"),
      0x50, 0x20, 0x20
    ));
    this.assets.setImg("fonts_alt", changeColor(
      this.root.assets.getImg("fonts"),
      0x90, 0x50, 0x50
    ));

    return super.load(promises);
  }

  draw() {
    const ctx = this.layer.get(0).context;

    ctx.drawImage(this.assets.getImg("background"), 0, 0);

    const X = 5;
    const Y = 7;
    ctx.drawImage(this.assets.images.cursor, 16 * X, 16 * (this.cursor + Y));
    for (let i = 0; i < this.items.length; i++) {
      drawText( ctx, this.assets.getImg(this.cursor === i ? "fonts" : "fonts_alt"),
        this.items[i].name,
      16 * 6, 16 * (7 + i));
    }

    this.layer.drawAll(this.root.context);
  }
}
