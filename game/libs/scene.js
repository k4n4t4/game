import Assets from "./assets.js";
import Events from "./events.js";
import Flags from "./flags.js";


export default class Scene {
  assets = new Assets();
  flag = new Flags([
    ["loaded", false],
  ]);
  event = new Events([
    {
      name: "onload",
      callbacks: [ () => { this.onload() } ],
    },
    {
      name: "onenter",
      callbacks: [ () => { this.onenter() } ],
    },
    {
      name: "onleave",
      callbacks: [ () => { this.onleave() } ],
    },
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

  onload() {}
  onenter() {}
  onleave() {}

  load(promises=[]) {
    const promise = Promise.all(promises);
    promise.then(_ => {
      this.flag.set("loaded", true);
      this.event.emit("onload");
    });
    return promise;
  }

  init() {
    let load = null;
    if (!this.flag.get("loaded")) {
      this.game.flag.set("pause", true);
      load = this.load();
      load.then(_ => {
        this.game.flag.set("pause", false);
        this.event.emit("onenter");
      });
    } else {
      this.event.emit("onenter");
    }
    return load;
  }

  update() {}

  draw() {
    for (const layer of this.layer) {
      this.game.context.drawImage(layer.canvas, 0, 0);
    }
  }
}
