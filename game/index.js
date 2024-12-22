// Utils
import createCanvas from "./utils/canvas.js";

// Libs
import Keyboard from "./libs/keyboard.js";
import Mouse from "./libs/mouse.js";
import Assets from "./libs/assets.js";
import Scenes from "./libs/scenes.js";
import Flags from "./libs/flags.js";
import Events from "./libs/events.js";

// Scenes
import Title from "./scenes/title.js";
import Main from "./scenes/main.js";
import Debug from "./scenes/debug.js";


export default class Game {
  assets = new Assets();
  scene = new Scenes();
  flag = new Flags([
    ["started", false],
    ["pause", false],
  ]);
  event = new Events();
  key;
  mouse;
  canvas;
  context;

  constructor(config={}) {
    this.canvas = createCanvas(config.canvas);
    this.context = this.canvas.getContext('2d');
    document.body.appendChild(this.canvas);
    this.key = new Keyboard(this);
    this.mouse = new Mouse(this);
  }

  get width() { return this.canvas.width }
  get height() { return this.canvas.height }

  load() {
    const promises = [
      this.assets.loadImg("fonts", "./game/assets/common/fonts.png"),
    ];
    return Promise.all(promises)
  }

  init() {
    this.scene.setAll([
      new Title(this),
      new Main(this),
      new Debug(this),
    ]);

    this.event.create("scene", [
      name => { this.scene.change(name).init() }
    ])

    this.event.emit("scene", "title");
    this.loop();
  }

  start() {
    if (this.flag.get("started")) return;
    this.flag.set("started", true);

    this.load().then(_ => {
      this.init();
    });
  }

  loop() {
    if (!this.flag.get("pause")) {
      this.scene.current.update();
      this.scene.current.draw();
    }
    setTimeout(() => {
      this.loop();
    }, 1000 / 30);
  }
}
