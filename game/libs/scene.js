import Assets from "/game/libs/assets.js";
import Flags from "/game/libs/flags.js";
import Events from "/game/libs/events.js";


export default class Scene {
  assets = new Assets();
  flag = new Flags([
    ["loaded", false],
  ]);
  event = new Events([
    { name: "onload" },
  ]);
  name;
  game;
  layerNum;
  layer = [];

  constructor(game, config={}) {
    this.name = config.name || "scene";
    this.game = game;

    this.layerNum = config.layerNum || 0;

    for (let i = 0; i < this.layerNum; i++) {
      const layer = {};
      layer.canvas = document.createElement('canvas');
      layer.context = layer.canvas.getContext('2d');
      layer.canvas.width = game.canvas.width;
      layer.canvas.height = game.canvas.height;
      this.layer.push(layer);
    }
  }

  load(promises=[]) {
    const promise = Promise.all(promises);
    promise.then(_ => {
      this.flag.set("loaded", true);
      this.event.emit("onload");
    });
    return promise;
  }

  init() {
    if (!this.flag.get("loaded")) {
      this.game.flag.set("pause", true);
      this.load().then(_ => {
        this.game.flag.set("pause", false);
      });
    }
  }

  update() {}

  draw() {
    for (const layer of this.layer) {
      this.game.context.drawImage(layer.canvas, 0, 0);
    }
  }
}
